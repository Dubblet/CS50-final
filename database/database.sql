CREATE TABLE pokemon (
	id INTEGER PRIMARY KEY,
	dex_num INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE
);
CREATE TABLE types (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);
CREATE TABLE moves (
	id INTEGER PRIMARY KEY,
	type_id INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	category INTEGER NOT NULL CHECK (category in (0, 1, 2)),
	damage INTEGER NOT NULL,
	accuracy INTEGER NOT NULL,
	description TEXT NOT NULL,
	FOREIGN KEY(type_id) REFERENCES types(id)
);
CREATE TABLE species (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);
CREATE TABLE abilities (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL
);
CREATE TABLE egg_groups (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);
CREATE TABLE evolutions (
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	evo_poke_id INTEGER NOT NULL, 
	evo_type TEXT,
	lvl INTEGER,
	cond TEXT,
	extra_cond TEXT,
	FOREIGN KEY(poke_id) REFERENCES pokemon(id),
	FOREIGN KEY(evo_poke_id) REFERENCES pokemon(id)
);
CREATE TABLE pokemon_moves (
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	move_id INTEGER NOT NULL,
	learn_lvl INTEGER,
	tm INTEGER, 
	tr INTEGER,
	tutor INTEGER,
	FOREIGN KEY(poke_id) REFERENCES pokemon(id),
	FOREIGN KEY(move_id) REFERENCES moves(id)
);
CREATE TABLE pokemon_abilities (
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	ability_id INTEGER NOT NULL,
	FOREIGN KEY(ability_id) REFERENCES abilities(id)
);
CREATE TABLE pokemon_stats (
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	hp INTEGER NOT NULL,
	attack INTEGER NOT NULL,
	defense INTEGER NOT NULL,
	sp_attack INTEGER NOT NULL,
	sp_defense INTEGER NOT NULL,
	speed INTEGER NOT NULL,
	FOREIGN KEY(poke_id) REFERENCES pokemon(id)
);
CREATE TABLE pokemon_info (
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	species_id INTEGER NOT NULL,
	egg1_id INTEGER NOT NULL,
	egg2_id INTEGER,
	type1_id INTEGER NOT NULL,
  	type2_id INTEGER,
	height INTEGER NOT NULL,
	weight INTEGER NOT NULL,
	gender_ratio NUMBER NOT NULL,
	FOREIGN KEY(poke_id) REFERENCES pokemon(id),
	FOREIGN KEY(species_id) REFERENCES species(id),
	FOREIGN KEY(egg1_id) REFERENCES egg_groups(id),
	FOREIGN KEY(egg2_id) REFERENCES egg_groups(id),
	FOREIGN KEY(type1_id) REFERENCES types(id),
  	FOREIGN KEY(type2_id) REFERENCES types(id)
);
CREATE TABLE pokedex_entries(
	id INTEGER PRIMARY KEY,
	poke_id INTEGER NOT NULL,
	game TEXT NOT NULL,
	entry TEXT NOT NULL,
	FOREIGN KEY(poke_id) REFERENCES pokemon(id)
);
CREATE VIEW evolution_tree AS 
  WITH RECURSIVE cte_evolutions_forward(poke_id, evo_poke_id, evo_type, lvl, cond, extra_cond) AS (
  SELECT poke_id, evo_poke_id, evo_type, lvl, cond, extra_cond
  FROM evolutions 
  UNION ALL
  SELECT ce.poke_id, e.evo_poke_id, e.evo_type, e.lvl, e.cond, e.extra_cond 
  FROM evolutions e
  INNER JOIN cte_evolutions_forward ce ON ce.evo_poke_id = e.poke_id
  )
  SELECT * FROM cte_evolutions_forward
  WHERE poke_id NOT IN (SELECT evo_poke_id FROM cte_evolutions_forward)
  ORDER BY poke_id ASC
/* evolution_tree(poke_id,evo_poke_id,evo_type,lvl,cond,extra_cond) */;
CREATE VIEW poke_model AS
SELECT
  p.dex_num,
  p.name,
  (
    SELECT
      GROUP_CONCAT(name)
    FROM
      types
    WHERE
      id IN (pi.type1_id, pi.type2_id)
  ) AS types,
  s.name AS classification,
  (
    SELECT
      GROUP_CONCAT(name)
    FROM
      egg_groups
    WHERE
      id IN (pi.egg1_id, pi.egg2_id)
  ) AS egg_groups,
  pi.height,
  pi.weight,
  pi.gender_ratio,
  (
    SELECT
      GROUP_CONCAT(game || ':' || entry, ';')
    FROM
      pokedex_entries
    WHERE
      poke_id = p.id
  ) AS dex_entries,
  (
    SELECT
      'base_form:' || p2.name || '|' || 'dex_num:' || p2.dex_num || ';' || GROUP_CONCAT(
        'evo_form:' || p1.name || '|' || 'dex_num:' || p1.dex_num || '|' || TRIM(
          CASE
            WHEN evo_type IS NOT NULL THEN 'evo_type:' || evo_type || ','
            ELSE ''
          END || CASE
            WHEN lvl IS NOT NULL THEN 'lvl:' || lvl || ','
            ELSE ''
          END || CASE
            WHEN cond IS NOT NULL THEN 'cond:' || cond || ','
            ELSE ''
          END || CASE
            WHEN extra_cond IS NOT NULL
            AND extra_cond <> '' THEN 'extra_cond:' || extra_cond || ','
            ELSE ''
          END,
          ','
        ),
        ';'
      ) AS evo_data
    FROM
      evolution_tree
      JOIN pokemon p1 ON p1.id = evolution_tree.evo_poke_id
      JOIN pokemon p2 ON p2.id = evolution_tree.poke_id
    WHERE
      poke_id IN (
        SELECT
          poke_id
        FROM
          evolution_tree
        WHERE
          poke_id = p.id
          OR evo_poke_id = p.id
      )
  ) AS evo_data
FROM
  pokemon p
  JOIN pokemon_info pi ON p.id = pi.poke_id
  JOIN species s ON pi.species_id = s.id
/* poke_model(dex_num,name,types,classification,egg_groups,height,weight,gender_ratio,dex_entries,evo_data) */;
CREATE VIEW abili_stats AS
SELECT
  p.dex_num,
  p.name,
  GROUP_CONCAT(a.name || ':' || a.description, ';')
	AS ability,
  ps.hp,
  ps.attack,
  ps.defense,
  ps.sp_attack,
  ps.sp_defense,
  ps.speed
FROM
  pokemon p
  JOIN pokemon_abilities pa ON p.id = pa.poke_id
  JOIN abilities a ON pa.ability_id = a.id
  JOIN pokemon_stats ps ON p.id = ps.poke_id
GROUP BY p.dex_num
/* abili_stats(dex_num,name,ability,hp,attack,defense,sp_attack,sp_defense,speed) */;
CREATE VIEW move_model AS
SELECT
  p.dex_num,
  m.name AS move,
  t.name AS type,
  m.category,
  m.damage,
  m.accuracy,
  m.description,
  pm.learn_lvl,
  pm.tm,
  pm.tr,
  pm.tutor
FROM moves m
  JOIN pokemon_moves pm ON m.id = pm.move_id
  JOIN pokemon p ON pm.poke_id = p.id
  JOIN types t ON m.type_id = t.id
/* move_model(dex_num,move,type,category,damage,accuracy,description,learn_lvl,tm,tr,tutor) */;

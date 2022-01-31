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

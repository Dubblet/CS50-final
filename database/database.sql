CREATE TABLE game_group (
	id INTEGER PRIMARY KEY,
	gen_id INTEGER NOT NULL,
	name TEXT NOT NULL,
	FOREIGN KEY(gen_id) REFERENCES generation(id)
);

CREATE TABLE game (
	id INTEGER PRIMARY KEY,
	gg_id INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE,
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);

CREATE TABLE pokemon (
	id INTEGER PRIMARY KEY,
	dex_num INTEGER NOT NULL,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE "type" (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE gg_type (
	id INTEGER PRIMARY KEY,
	type_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	FOREIGN KEY(type_id) REFERENCES "type"(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);


CREATE TABLE move (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE gg_move (
	id INTEGER PRIMARY KEY,
	gg_type_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	category INTEGER NOT NULL CHECK (category in (0, 1)),
	damage INTEGER NOT NULL,
	accuracy INTEGER NOT NULL,
	target INTEGER NOT NULL CHECK (category in (1, 2, 3)),
	power_points INTEGER NOT NULL,
	chance INTEGER NOT NULL,
	description TEXT NOT NULL,
	tm INTEGER,
	tr INTEGER,
	tutor TEXT,
	FOREIGN KEY(gg_type_id) REFERENCES gg_type(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);

CREATE TABLE pokemon_move (
	id INTEGER PRIMARY KEY,
	pokemon_id INTEGER NOT NULL,
	gg_move_id INTEGER NOT NULL,
	learn_lvl INTEGER,
	tm INTEGER NOT NULL CHECK (tm in (0, 1)),
	tr INTEGER NOT NULL CHECK (tr in (0, 1)),
	tutor INTEGER NOT NULL CHECK (tutor in (0, 1)),
	FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
	FOREIGN KEY(gg_move_id) REFERENCES gg_move(id)
);

CREATE TABLE pokemon_stats (
	id INTEGER PRIMARY KEY,
	pokemon_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	hp INTEGER NOT NULL,
	attack INTEGER NOT NULL,
	defense INTEGER NOT NULL,
	sp_attack INTEGER NOT NULL,
	sp_defense INTEGER NOT NULL,
	speed INTEGER NOT NULL,
	FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);

CREATE TABLE category (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE gg_category (
	id INTEGER PRIMARY KEY,
	cat_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	FOREIGN KEY(cat_id) REFERENCES category(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);


CREATE TABLE egg_group (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE gg_egg_group (
	id INTEGER PRIMARY KEY,
	eg_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	FOREIGN KEY(eg_id) REFERENCES egg_group(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);


CREATE TABLE pokemon_info (
	id INTEGER PRIMARY KEY,
	pokemon_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	gg_cat_id INTEGER NOT NULL,
	gg_eg_1_id INTEGER NOT NULL,
	gg_eg_2_id INTEGER NOT NULL,
	gg_type_id INTEGER NOT NULL,
	height INTEGER NOT NULL,
	weight INTEGER NOT NULL,
	capture_rate INTEGER NOT NULL,
	gender_ratio NUMBER NOT NULL,
	egg_steps INTEGER NOT NULL,
	exp_growth INTEGER NOT NULL,
	base_happiness INTEGER NOT NULL,
	FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
	FOREIGN KEY(gg_cat_id) REFERENCES gg_category(id),
	FOREIGN KEY(gg_eg_1_id) REFERENCES gg_egg_group(id),
	FOREIGN KEY(gg_eg_2_id) REFERENCES gg_egg_group(id),
	FOREIGN KEY(gg_type_id) REFERENCES gg_type(id)
);

CREATE TABLE ability (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
);

CREATE TABLE gg_ability (
	id INTEGER PRIMARY KEY,
	ability_id INTEGER NOT NULL,
	gg_id INTEGER NOT NULL,
	description TEXT NOT NULL,
	FOREIGN KEY(ability_id) REFERENCES ability(id)
	FOREIGN KEY(gg_id) REFERENCES game_group(id)
);

CREATE TABLE pokemon_ability (
	id INTEGER PRIMARY KEY,
	pokemon_id INTEGER NOT NULL,
	gg_ability_id INTEGER NOT NULL,
	FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
	FOREIGN KEY(gg_ability_id) REFERENCES gg_ability(id)
);

CREATE TABLE item (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	description TEXT NOT NULL
);

CREATE TABLE evolution (
	id INTEGER PRIMARY KEY,
	at_level INTEGER,
	trade INTEGER,
	use_item_id INTEGER,
	hold_item_id INTEGER,
	move INTEGER,
	friendship INTEGER,
	location TEXT,
	trade_with_poke_id INTEGER,
	party_with_poke_id INTEGER,
	gyro INTEGER,
	time_start INTEGER,
	time_end INTEGER,
	gender TEXT,
	form INTEGER,
	ability_id INTEGER,
	FOREIGN KEY(use_item_id) REFERENCES item(id),
	FOREIGN KEY(hold_item_id) REFERENCES item(id),
	FOREIGN KEY(trade_with_poke_id) REFERENCES pokemon(id),
	FOREIGN KEY(party_with_poke_id) REFERENCES pokemon(id),
	FOREIGN KEY(ability_id) REFERENCES ability(id)
);

CREATE TABLE pokemon_evolution (
	id INTEGER PRIMARY KEY,
	pokemon_id INTEGER NOT NULL,
	poke_evo_id INTEGER NOT NULL,
	evolution_id INTEGER NOT NULL,
	FOREIGN KEY(pokemon_id) REFERENCES pokemon(id),
	FOREIGN KEY(poke_evo_id) REFERENCES pokemon(id),
	FOREIGN KEY(evolution_id) REFERENCES evolution(id)
);

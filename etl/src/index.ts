import * as Showdown from 'pokemon-showdown';
import Database from 'better-sqlite3';
import Axios from 'axios';
import Cheerio from 'cheerio';
import fs from 'fs';


const categories: any = {'Status': 0, 'Physical': 1, 'Special': 2};

let pokeMap = new Map<string, Map<string, any>>();

let allPokemon = Showdown.Dex.species.all();
                                    // .slice(0, 50);
                                    // .filter(pokemon => pokemon.name.includes('Flab'));

                                    // console.log(allPokemon[0].name.replace(/[é]+/g, "e"));
let eggGroups = new Set(Showdown.Dex.species.all()
                                    .map((pokemon) => pokemon.eggGroups)
                                    .reduce((poke1, poke2) => poke1.concat(poke2)));
let types = new Set(Showdown.Dex.species.all()
                                    .map((pokemon) => pokemon.types)
                                    .reduce((poke1, poke2) => poke1.concat(poke2)));
var allSpecies = new Set();
var abilities = Showdown.Dex.abilities.all()
                                    .filter(x => x.isNonstandard == null)
                                    .map(x => [x.name, x.desc]);
var moves = Showdown.Dex.moves.all().filter(x => x.isNonstandard == null || x.isNonstandard == 'Past')
                                    .map(x => [x.name, x.type, x.category, x.basePower, x.accuracy, x.shortDesc]);

// console.log(Showdown.Dex.moves.all().filter(x => x.isNonstandard == 'Past').map(x => x.name));
let scrapers: Array<any> = []
function parseTbody($:cheerio.Root ,tbody: cheerio.Cheerio) {
    var result = new Array();
    tbody.children().map((j, move) => {
        var row = new Array();
        $(move).children().map((k, col) => {
                row.push($(col).text()); 
        });
        result.push(row);
    });
    return result;
}
async function main() {
    for (var pokemon of allPokemon) {
        if ((pokemon.isNonstandard == null || pokemon.isNonstandard == 'Past') && pokemon.forme == "") {
            if (pokemon.name == 'Celestela') {
                Object.assign(pokemon, { name: 'Celesteela'});
            }
            pokeMap.set(pokemon.name, new Map<string, any>());
            pokeMap.get(pokemon.name)
                ?.set("dex_num",    pokemon.num)
                ?.set("type",      pokemon.types)
                ?.set("gender",    pokemon.genderRatio)
                ?.set("stats",     pokemon.baseStats)
                ?.set("abilities", pokemon.abilities)
                ?.set("height",    pokemon.heightm)
                ?.set("weight",    pokemon.weightkg)
                ?.set("evolution", pokemon.evos)
                ?.set("egg",       pokemon.eggGroups)
                // ?.set("gen",       pokemon.gen)
                //?.set("bst",       pokemon.bst)
                ?.set("forms",     pokemon.otherFormes)
                ?.set('prevo',    pokemon.prevo)
                ?.set('evo',      [pokemon.evoType, pokemon.evoLevel, pokemon.evoCondition, pokemon.evoMove, pokemon.evoItem, pokemon.gender])

                                                                                           // console.log(allPokemon[0].name.replace(/[é]+/g, "e"));
            const url = encodeURI(`https://pokemondb.net/pokedex/${pokemon.name.replace(/[:. ]+/, "-").replace(/[.'’]/g, "").replace(/[é]+/g, "e")}`);
            const AxiosInstance = Axios.create();

            scrapers.push(AxiosInstance.get(url)
                .then(
                    response => {
                        const html = response.data;
                        const $ = Cheerio.load(html);
                        const species = $('.vitals-table')
                                            .first()
                                            .find('tbody tr:nth-child(3) td')
                                            .text();
                        pokeMap.get(pokemon.name)?.set('species', species);
                        allSpecies.add(species);
                        const pokeMoveTables = $('.tabset-moves-game .sv-tabs-panel-list .active table')
                        pokeMoveTables.map((i, table) => {
                            var tableName = "";
                            var moveTabs = $(table).closest('.tabset-moves-game-form');
                            if (moveTabs.length != 0) {
                                tableName = $(moveTabs).prev().prev().text(); 
                            } else {
                                tableName = $(table).parent().prev().prev().text();
                            }
                            if (pokeMap.get(pokemon.name)?.has(tableName)) {
                                return;
                            }
                            var parsedMovesList = parseTbody($, $(table).find("tbody")); 
                            pokeMap.get(pokemon.name)?.set(tableName, parsedMovesList);
                        });

                        const pokeDexStart = $('#dex-flavor').next().next();
                        if (pokeDexStart.is("div")) {
                            var parsedDexEntries = parseTbody($, pokeDexStart.find("tbody"));
                            pokeMap.get(pokemon.name)?.set("dex-entries", parsedDexEntries);
                        } else {
                            var current = pokeDexStart;
                            var parsedDexEntries = new Array();
                            var standard = true;
                            // console.log(current);
                            // console.log(current.attr("id"));
                            while(current.attr("id") != "dex-moves") {
                                var title = current.text();
                                // console.log(`Title: ${current.text()}`);
                                var entries = parseTbody($, current.next().find("tbody"));
                                // console.log(entries);
                                if (standard) {
                                    standard = false;
                                } else {
                                    entries = entries.map(val => [`${val[0]} - ${title}`, val[1]]);
                                }
                                parsedDexEntries = parsedDexEntries.concat(entries);
                                current = current.next().next();
                            }
                            pokeMap.get(pokemon.name)?.set("dex-entries", parsedDexEntries);
                        }
                        
                    }
                )
                .catch(console.error));
        }
    }
    await Promise.all(scrapers);
    // console.log(pokeMap);
    // console.log(pokeMap.get("Bulbasaur")?.get("evo").filter((x: any) => x).length == 0);
    // console.log(pokeMap.get("Bulbasaur")?.get("Moves learnt by level up"));
    // console.log(pokeMap.get("Bulbasaur")?.get("Moves learnt by TM"));
    // console.log(pokeMap);
    // console.log(pokeMap.get("Ivysaur"));

    // var evo = pokeMap.get("Ivysaur")?.get("evo");
    // console.log(evo);

    // console.log(Array.from(evo?.get("evoMove"),
    //                        evo?.get("evoItem"),
    //                        evo?.get("gender")).filter(x => x != undefined))
    // console.log(pokeMap.get("Pidgey")?.get("abilities")['0']);
   // console.log();
    // ['0', '1', 'H', 'S'].map(k => {
    //     console.log(pokeMap.get('Pidgey')?.get("abilities")[k]);
    // });
    // pokeMap.get('Pidgey')?.get("abilities").forEach((k: any) => {
    //     console.log(k);
    // })
    // var blah = pokeMap.get("Pikachu");
    // console.log(pokeMap.get('Unown')?.get('gender')['F']);
    // console.log(blah?.get("Move Tutor moves"));
    // var stats = blah?.get("stats");
    // console.log(stats["hp"]);
    if(true) {
        var databaseFile = '../database/cs50.db';
        var tempFile = fs.openSync(databaseFile, 'w');
        // try commenting out the following line to see the different behavior
        fs.closeSync(tempFile);
        fs.unlinkSync(databaseFile);

        var dbDDLFile = '../database/database.sql';
        var dbDDL = fs.readFileSync(dbDDLFile).toString();
        console.log(dbDDL);
        var db = new Database(databaseFile, { verbose: console.log });
        // var db = new Database(databaseFile);
        db.exec(dbDDL);

        var eggGroupsInsert = db.prepare("INSERT INTO egg_groups (name) VALUES (:name)");
        var typesInsert = db.prepare("INSERT INTO types (name) VALUES (:name)");
        var speciesInsert = db.prepare("INSERT INTO species (name) VALUES (:name)");
        var abilitiesInsert = db.prepare("INSERT INTO abilities (name, description) VALUES (:name, :description)");
        var movesInsert = db.prepare(`
            INSERT INTO moves (type_id, name, category, damage, accuracy, description) 
            VALUES (
                (SELECT id FROM types WHERE name = :type_name),
                :name,
                :category,
                :damage, 
                :accuracy, 
                :description
            )
        `);
        var pokemonInsert = db.prepare("INSERT INTO pokemon (name, dex_num) VALUES (:name, :dex_num)")
        var pokemonAbilitiesInsert = db.prepare(`
            INSERT INTO pokemon_abilities 
            (poke_id, ability_id)
            VALUES (
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                (SELECT id FROM abilities WHERE name = :name)
            )
        `)
        var pokemonStatsInsert = db.prepare(`
            INSERT INTO pokemon_stats 
            (poke_id, hp, attack, defense, sp_attack, sp_defense, speed) 
            VALUES(
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                :hp,
                :attack,
                :defense,
                :sp_attack,
                :sp_defense,
                :speed
            )
        `);
        var pokemonMovesInsert = db.prepare(`
            INSERT INTO pokemon_moves
            (poke_id, move_id, learn_lvl, tm, tr, tutor)
            VALUES(
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                (SELECT id FROM moves WHERE lower(name) = lower(:name)),
                :learn_lvl,
                :tm,
                :tr,
                :tutor
            )
        `);
        var pokemonInfoInsert = db.prepare(`
            INSERT INTO pokemon_info
            (poke_id, species_id, egg1_id, egg2_id, type1_id, type2_id, height, weight, gender_ratio)
            VALUES(
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                (SELECT id FROM species WHERE name = :species_name),
                (SELECT id FROM egg_groups WHERE name = :egg_name1),
                (SELECT id FROM egg_groups WHERE name = :egg_name2),
                (SELECT id FROM types WHERE name = :type_name1),
                (SELECT id FROM types WHERE name = :type_name2),
                :height,
                :weight,
                :gender_ratio
            )
        `);
        var evolutionsInsert = db.prepare(`
            INSERT INTO evolutions
            (poke_id, evo_poke_id, evo_type, lvl, cond, extra_cond)
            VALUES(
                (SELECT id FROM pokemon WHERE name = :prevo_name),
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                :evo_type,
                :lvl,
                :cond,
                :extra_cond
            )
        `);
        var pokedexEntriesInsert = db.prepare(`
            INSERT INTO pokedex_entries
            (poke_id, game, entry)
            VALUES (
                (SELECT id FROM pokemon WHERE dex_num = :dex_num),
                :game,
                :entry
            )
        `)
        eggGroups.forEach(eggGroup => {
            eggGroupsInsert.run({
                name: eggGroup
            });
        });
        types.forEach(type => {
            typesInsert.run({
                name: type
            })
        });
        allSpecies.forEach(species => {
            speciesInsert.run({
                name: species
            })
        });
        abilities.forEach(ability => {
            abilitiesInsert.run({
                name: ability[0],
                description: ability[1] 
            })
        });
        moves.forEach(move => {
            movesInsert.run({
                name: move[0],
                type_name: move[1],
                category: categories[String(move[2])],
                damage: move[3],
                accuracy: typeof move[4] == 'number' ? move[4]: 0,
                description: move[5].toString()
            })
        })
        pokeMap.forEach((v, k) => {
            // console.log(v);
            // console.log(k);
            var pokemon = pokeMap.get(k);
            pokemonInsert.run({
                name: k,
                dex_num: pokemon?.get("dex_num") 
            });

            ['0', '1', 'H', 'S'].forEach(k => {
                var name = pokemon?.get("abilities")?.[k];
                if (name == undefined) { return; }
                pokemonAbilitiesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: name
                })
            });

            var stats = pokemon?.get("stats");
            pokemonStatsInsert.run({
                dex_num: pokemon?.get("dex_num"),
                hp: stats["hp"],
                attack: stats["atk"],
                defense: stats["def"],
                sp_attack: stats["spa"],
                sp_defense: stats["spd"],
                speed: stats["spe"]
            });

            pokemon?.get("Moves learnt by level up")?.forEach((move: Array<any>) => {
                pokemonMovesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: move[1],
                    learn_lvl: move[0],
                    tm: null,
                    tr: null,
                    tutor: null
                });
            });
            pokemon?.get("Egg moves")?.forEach((move: Array<any>) => {
                pokemonMovesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: move[0],
                    learn_lvl: 0,
                    tm: null,
                    tr: null,
                    tutor: null
                });
            });
            pokemon?.get("Moves learnt by TM")?.forEach((move: Array<any>) => {
                pokemonMovesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: move[1],
                    learn_lvl: null,
                    tm: move[0],
                    tr: null,
                    tutor: null
                });
            });
            pokemon?.get("Moves learnt by TR")?.forEach((move: Array<any>) => {
                pokemonMovesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: move[1],
                    learn_lvl: null,
                    tm: null,
                    tr: move[0],
                    tutor: null
                });
            });
            pokemon?.get("Move Tutor moves")?.forEach((move: Array<any>) => {
                pokemonMovesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    name: move[0],
                    learn_lvl: null,
                    tm: null,
                    tr: null,
                    tutor: 1
                });
            });
            
            pokemonInfoInsert.run({
                dex_num: pokemon?.get("dex_num"),
                species_name: pokemon?.get("species"),
                egg_name1: pokemon?.get("egg")[0],
                egg_name2: pokemon?.get("egg")?.[1],
                type_name1: pokemon?.get("type")[0],
                type_name2: pokemon?.get("type")?.[1],
                height: pokemon?.get("height"),
                weight: pokemon?.get("weight"),
                gender_ratio: pokemon?.get("gender")['M'] + (pokemon?.get("gender")['F'] * 0.1)
            });

            pokemon?.get("dex-entries").forEach((entry: Array<any>) => {
                pokedexEntriesInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    game: entry[0],
                    entry: entry[1]
                })
            }); 
        });
        pokeMap.forEach((v, k) => {
            console.log(v);
            console.log(k);
            var pokemon = pokeMap.get(k);
            var evo = pokemon?.get("evo");
            if (evo.filter((x: any) => x).length != 0) {
                evolutionsInsert.run({
                    dex_num: pokemon?.get("dex_num"),
                    prevo_name: pokemon?.get("prevo"),
                    evo_type: evo?.[0],
                    lvl: evo?.[1],
                    cond: evo?.[2],
                    extra_cond: [evo[3], evo[4], evo[5]].filter(x => x !== undefined && x !== '').join(",")
                });
            }
        });
    }
}
main();


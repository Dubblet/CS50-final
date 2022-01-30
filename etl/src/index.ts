import * as Showdown from 'pokemon-showdown';
import Database from 'better-sqlite3';
import Axios from 'axios';
import Cheerio from 'cheerio';

let pokeMap = new Map<string, Map<string, any>>();

let allPokemon = Showdown.Dex.species.all()
                                    .filter(pokemon => pokemon.name == 'Malamar');
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
var moves = Showdown.Dex.moves.all().filter(x => x.isNonstandard == null)
                                    .map(x => [x.name, x.type, x.category, x.basePower, x.accuracy, x.shortDesc]);
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
        if (pokemon.isNonstandard == null && pokemon.forme == "") {
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
                ?.set("bst",       pokemon.bst)
                ?.set("forms",     pokemon.otherFormes)
                ?.set('preevo',    pokemon.prevo)
                ?.set('evo',      [pokemon.evoType, pokemon.evoLevel, pokemon.evoMove, pokemon.evoItem, pokemon.evoCondition, pokemon.gender])

        

            const url = encodeURI(`https://pokemondb.net/pokedex/${pokemon.name.replace(/[:. ]+/, "-").replace(/[.'’]/g, "")}`);
            const AxiosInstance = Axios.create();

            await AxiosInstance.get(url)
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
                .catch(console.error);
        }
    }
    // console.log(pokeMap);
    var db = new Database("../database/cs50.db");
    var eggGroupsInsert = db.prepare("INSERT INTO egg_groups (name) VALUES (:name)");
    var typesInsert = db.prepare("INSERT INTO types (name) VALUES (:name)");
    var speciesInsert = db.prepare("INSERT INTO species (name) VALUES (:name)");
    var abilitiesInsert = db.prepare("INSERT INTO abilities (name, description) VALUES (:name, :description)");
    var movesInsert = db.prepare("INSERT INTO moves (name, category, damage, accuracy, description) VALUES (:name, :category, :damage, :accuracy, :description)");
    var pokemonInsert = db.prepare("INSERT INTO pokemon (name, dex_num) VALUES (:name, :dex_num)")
    //var pokemonStatsInsert
    //var pokemonMovesInsert
    //var pokemonInfoInsert
    //var evolutionsInsert
    //var pokedexEntriesInsert
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
    pokeMap.forEach((v, k) => {
        pokemonInsert.run({
            name: k,
            dex_num: pokeMap.get(k)?.get("dex_num") 
        });
    });
}
main();


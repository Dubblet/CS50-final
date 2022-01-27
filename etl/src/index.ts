import * as Showdown from 'pokemon-showdown';
// import Database from 'better-sqlite3';
import Axios from 'axios';
import Cheerio from 'cheerio';
import { Species } from 'pokemon-showdown/.sim-dist/dex-species';


enum MoveCols {
    Lvl,
    Move,
    Type,
    Cat,
    Power, 
    Acc
}

let pokeMap = new Map<string, Map<string, any>>();

let allPokemon = Showdown.Dex.species.all();
                                    // .filter(pokemon => pokemon.name == 'Bulbasaur');
let eggGroups = new Set(Showdown.Dex.species.all()
                                    .map((pokemon) => pokemon.eggGroups)
                                    .reduce((poke1, poke2) => poke1.concat(poke2)));

let allMoves = Showdown.Dex.moves.all();
// console.log(allMoves);
// console.log(eggGroups);                

// let axiosRequests: Array<Promise<any>> = [];
// let pokemanDBMap = new Map<String, any>();
async function main() {
    for (var pokemon of allPokemon) {
        if (pokemon.isNonstandard == null && pokemon.forme == "") {
            pokeMap.set(pokemon.name, new Map<string, any>());
            pokeMap.get(pokemon.name)
                ?.set("dexnum",    pokemon.num)
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

        

            const url = encodeURI(`https://pokemondb.net/pokedex/${pokemon.name.replace(/[:. ]+/, "-").replace(/[.'’]/g, "")}`);
            const AxiosInstance = Axios.create();

            await AxiosInstance.get(url)
                .then(
                    response => {
                        const html = response.data;
                        const $ = Cheerio.load(html);
                        const vitalsTable = $('.vitals-table')
                                            .first()
                                            .find('tbody tr:nth-child(3) td')
                                            .text();
                        const pokemonMoveTables = $('.tabset-moves-game .sv-tabs-panel-list .active table')
                        pokemonMoveTables.map((i, table) => {
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
                            var movesList = $(table).find("tbody");
                            var rowList = new Array();
                            movesList.children().map((j, move) => {
                                var row = new Array();
                                $(move).children().map((k, col) => {
                                        row.push($(col).text()); 
                                });
                                rowList.push(row);
                            });
                            pokeMap.get(pokemon.name)?.set(tableName, rowList);
                        });
                    }
                )
                .catch(console.error);
        }
    }
    // console.log(pokeMap.get("Bulbasaur")?.get("Moves learnt by TM")[0][1]);
    console.log(pokeMap);
}

main();

// var db = new Database("../database/cs50.db");
// db.exec("SELECT * FROM pokemon");
// db.exec("INSERT INTO pokemon ")

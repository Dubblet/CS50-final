import * as Showdown from 'pokemon-showdown';
// import Database from 'better-sqlite3';
import Axios from 'axios';
import Cheerio from 'cheerio';


let pokeMap = new Map<string, Map<string, any>>();

let allPokemon = Showdown.Dex.species.all();
// let eggGroups = new Set(Showdown.Dex.species.all()
                                    // .map((pokemon) => pokemon.eggGroups)
                                    // .reduce((poke1, poke2) => poke1.concat(poke2)));

                                
// console.log(eggGroups);                

allPokemon.forEach(pokemon =>  {
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

    

        const url = `https://pokemondb.net/pokedex/${pokemon.name.replace(/[:. ]+/, "-").replace(".", "")}`;
        const AxiosInstance = Axios.create();

        AxiosInstance.get(url)
            .then(
                response => {
                    const html = response.data;
                    const $ = Cheerio.load(html);
                    const vitalsTable = $('.vitals-table')
                                        .first()
                                        .find('tbody tr:nth-child(3) td')
                                        .text();
                    const moveTables = $('.tabset-moves-game .sv-tabs-panel-list .active table')

                    console.log(vitalsTable);
                    console.log(pokemon.name);
                    console.log(moveTables);
                }
            )
            .catch(console.error);
    }
});
// console.log(Showdown.Dex.species.get("Bulbasaur"));
// console.log(Showdown.Dex.moves.get("Tackle"));

// let bulba = Showdown.Dex.mod.;
// console.log(bulba);

// console.log(pokeMap);

// var db = new Database("../database/cs50.db");
// db.exec("SELECT * FROM pokemon");
// db.exec("INSERT INTO pokemon ")
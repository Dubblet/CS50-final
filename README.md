# CS50 Final Project: Pokedex
### by Steven Bruce
#### Video Demo <URL HERE>

<br>

## Description
This application is a database of ***Pokemon***! It has all created Pokemon up through the **Pokemon Sword and Shield** games.
- The first tab displays basic info, the evolution chain, and the Pokedex entries from each game that the Pokemon has appeared in.
- The second tab details the Pokemon's abilities and base stats, including graphs to show how each stat compares to the highest possible value for each particular stat.
- The third tab shows details of every move the Pokemon learns by leveling up or breeding; If the *Learn Level* is listed as 0 for a move, it is an Egg Move.
- On the fourth and final tab, is a list and details of all the moves a Pokemon can learn through other means. It will display a 1 in the *Move Tutor* column if the move is learned through a move tutor, otherwise it will display the number of the TM or TR that teaches the move.
- You can navigate it one Pokemon at a time with the left and right arrows, or changing the number at the end of the URL to the Pokedex number of the Pokemon you would like to view.

> - Dex entries, move-sets, etc from **Pokemon Briliant Diamond and Shining Pearl** are included. However, new Pokemon, forms, battle moves, and dex entries from the **Pokemon Legends: Arceus** game are excluded, as I began work on this project prior to the game's release.==
> - Learnable Moves on the 3rd and 4th tab only include the latest game the Pokemon has appeared in. So for most Pokemon, that was either **Sword/Shield**, or **Briliant Diamond/Shining Pearl**. Any Pokemon that did not appear in Gen 8 at all, shows their moves available from Gen 7 (**Ultra Sun/Ultra Moon**) instead.

<br>

### Prerequisites
- Datasette (REST API)
- Node.js (Tooling and development)
### Tools used
- Typescript (Frontend Language)
- Angular.js (Frontend UI framework)
- SQLite (Database)
- Cheerio (Web scrapper)
### Data from
- Pokemon Showdown API
- PokemonDB website

## How to Run
1. In your terminal, navigate to the folder you have the project in -> cs50-final -> database. Once in the database folder run `datasette serve --cors cs50.db`
2. Once datasette is running, in another terminal window, navigate to the folder you have the project in -> cs50-final -> frontend. Once in the frontend folder, run `ng serve --open` This will build the app, and open a new window in your defaul browser to display it.

<br>

## Design Decisions

### Database
  - Created tables using SQLite.
  - Created Views in SQLite using Beekeeper.
  - Used ETL to populate Database.
  - Use Datasette to read the database and send data to the frontend to display.

### ETL
  - Used Smogon's Pokemon Showdown API https://github.com/smogon/pokemon-showdown
  - Used Pokemon DB website for info that was not in the Pokemon Showdown API or difficult to access. https://pokemondb.net/
  - Using a webscrapper (Cheerio) collected data from website.
  - Collected all the data from the API and website and populated the database at once. Should not need to be done again.

### Frontend
  - Built the overall framework of the webpage - Searchbar, Picture, and Info tabs.
  - Hardcoded a prototype with Bulbasaur's info to see how it should look and to be used as the default if the database somehow didn't load.
  - Pokemon's picture, type, and navigation buttons on center area, Pokemon's name on upper bar.
  - Info section by far the largest, broken into multiple tabs.
  - Basic info and Pokedex entries in the first tab, Abilities and Stats in the second, and Learnable moves in the third and fourth.
  - Set up to get data from the database, and update to the correct Pokemon as the URL changes.
  - Scrapped Search feature as Project evolved well over the original intended scope (And already got the job)

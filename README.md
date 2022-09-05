# CS50 Final Project: Pokedex
### by Steven Bruce
#### Video Demo <https://youtu.be/F7ESd7hnH2c>

<br>

## Description
This application is a database of ***Pokemon***! It has all created Pokemon up through the **Pokemon Sword and Shield** games.
- The first tab displays basic info, the evolution chain, and the Pokedex entries from each game that the Pokemon has appeared in.
- The second tab details the Pokemon's abilities and base stats, including graphs to show how each stat compares to the highest possible value for each particular stat.
- The third tab shows details of every move the Pokemon learns by leveling up or breeding; If the *Learn Level* is listed as 0 for a move, it is an Egg Move.
- On the fourth and final tab, is a list and details of all the moves a Pokemon can learn through other means. It will display a 1 in the *Move Tutor* column if the move is learned through a move tutor, otherwise it will display the number of the TM or TR that teaches the move.
- You can navigate it one Pokemon at a time with the left and right arrows, or changing the number at the end of the URL to the Pokedex number of the Pokemon you would like to view.

> - Dex entries, move-sets, etc from **Pokemon Briliant Diamond and Shining Pearl** are included. However, new Pokemon, forms, battle moves, and dex entries from the **Pokemon Legends: Arceus** game are excluded, as I began work on this project prior to the game's release.
> - Learnable Moves on the 3rd and 4th tab only include the latest game the Pokemon has appeared in. So for most Pokemon, that was either **Sword/Shield**, or **Briliant Diamond/Shining Pearl**. Any Pokemon that did not appear in Gen 8 at all, shows their moves available from Gen 7 (**Ultra Sun/Ultra Moon**) instead.

<br>

## How to Run
1. In your terminal, navigate to the folder you have the project in -> cs50-final -> database. Once in the database folder run `datasette serve --cors cs50.db`
2. Once datasette is running, in another terminal window, navigate to the folder you have the project in -> cs50-final -> frontend. Once in the frontend folder, run `ng serve --open` This will build the app, and open a new window in your defaul browser to display it.


<br>

### Additional Tools used
- Typescript (Frontend Language)
- Angular.js (Frontend UI framework)
- SQLite (Database)
- Cheerio (Web scrapper)
### Data from
- Pokemon Showdown API - https://github.com/smogon/pokemon-showdown
- PokemonDB website - https://pokemondb.net/

<br>

## Design Decisions

### Basic Timeline
1. Begun project, decided on Pokedex. Whiteboarded how we wanted the app to look.
2. Whiteboarded our basic table structure. Found an API that we could get the data we needed from.
3. Designed a mockup of the front-end, hard-coded a default.
4. Had to focus our decisions and cut some data, to keep project from getting too huge. Designed reduced table structure.
5. Begun ETL code to get data from the Smogon API.
6. Realized that the API didn't have all the data we wanted or it wasn't all easily accessible. Used a webscraper to pull the additional data we needed from a fan-made Pokemon website.
7. Had to fix a lot of specific/one-off Pokemon (thanks to some having punctuation in their name for example). The ETL code only needed to be run once, in order to populate the database with all the data from the API and webscraper.
8. Created some table Views so it would be easier to gather the data in usable formats for the front-end.
9. Built out the front-end with different tabs for all the information.
10. Set up Front-end to use Datasette to get the data from the tables/views and created Models to hold the data.
11. Added Navigation buttons, and changing the URL to display different Pokemon.
12. Bug fixes, write ReadMe, ultimately scrapped search feature as project had gone way over scope and schedule, submit project.

<br>

### Beginning the Project
When starting this project, I had 2 goals. First, to turn it in for CS50's final project. And second, to create something I could show off to a potential employer. CS50's requirements for the final were very open-ended, so I needed to create something that interested me, and showed off some of the things I had learned over the course. I turned to a company that had an internship program I was interested in, and spoke with one of their directors about what they may like to see. He advised me to try to build something using Angular.js, and some form of Database. So I set about trying to think of a good idea, and after a brainstorming session came up with a Pokedex.

A Pokedex, is data and information about Pokemon from the hit videogame series. There are almost 900 of them, each with a ton of info, so I thought that could make up a great database. My brother has almost 10 years of software development experience, and offered to help me with the project. I took some time off work, and we set to it. After planning out a table structure and what we wanted the app to look like, we quickly realized how large of an undertaking it would be. We decided we would focus mainly on the most recent Pokemon games (which at the time was Gen 8, **Pokemon Sword & Pokemon Shield** and **Pokemon Brilliant Diamond & Pokemon Shining Pearl**). We also decided to strip away information about catching the Pokemon in the games, instead focusing on battle mechanics, such as their stats and move sets.

<br>

### ETL
  - Used Smogon's Pokemon Showdown API https://github.com/smogon/pokemon-showdown
  - Used Pokemon DB website for info that was not in the Pokemon Showdown API or difficult to access. https://pokemondb.net/
  - Using a webscrapper (Cheerio) collected data from website.
  - Data collected from both sources is used to populate the database at once. Should not ever need to be run again.
  
The ETL section is all contained within one file, the index.ts, one of the largest individual files of the project. When run, it collects all the data needed for the Pokedex from the Smogon-API and the PokemonDB website. The data from both sources are put into a Map, which is then used to populate the database.

Lines 12-28 get information from the API. Lines 32-145 filter through the PokemonDB website, scraping the data we were missing from the API one pokemon at a time. We had to add in doing it in batches, because doing too many at once we would get cut off from the website. Once the Map is built, it is used to populate the SQLite database, lines 174-417. All this code should only need to be run once, as once the database is built, it will persist. In fact, even downloading this project from github, the database is included, so you would not need to run this again. The code is included to log the work done and should the database ever somehow be lost and need to be repopulated.

<br>

### Database
  - Created tables using SQLite.
  - Created Views in SQLite using Beekeeper.
  - Used ETL to populate Database.
  - Use Datasette to read the database and send data to the frontend to display.

The Database section holds the the table schema SQL file, as well as the database itself. In addition to creating the tables, we also created Views (database.sql lines 97-219). The app needs all the information for the specific Pokemon it is displaying at the time. The views use JOIN's to connect the different tables together so that it is easier to use for each Pokemon. For this project, Datasette must be running on the cs50.db database, to get information to the front end to be displayed. You can also use Datasette to look through the tables and views and all the data stored within.

<br>

### Frontend
  - Built the overall framework of the webpage - Searchbar, Picture, and Info tabs.
  - Hardcoded a prototype with Bulbasaur's info to see how it should look and to be used as the default if the database somehow didn't load.
  - Pokemon's picture, type, and navigation buttons on center area, Pokemon's name on upper bar.
  - Info section by far the largest, broken into multiple tabs.
  - Basic info and Pokedex entries in the first tab, Abilities and Stats in the second, and Learnable moves in the third and fourth.
  - Set up to get data from the database, and update to the correct Pokemon as the URL changes.
  - Scrapped Search feature as Project evolved well over the original intended scope (And already got the job)

The Front end section is what is actually displayed to the user, and the largest section of the project. It was built using Angular typescript and styled with Angular Material framework. Each section has an html file that acts as a template. There is then an accompanying typescript file that fills the html file with info from the database, as well as a css file to style it.

The 'Pokemon' section points to the url generated by datasette for whichever pokemon is selected, and gets all the information needed for upper section of the app (name, picture, etc), as well as for the first tab that is displayed, the info tab. The information from the database/datasette is fed into three models, which are then called by different tabs in the info section to display it.

The 'Search' section just displays the currently selected Pokemon's name and Pokedex number. Originally the plan was to add a search bar to this section, hense the name. However the scope of this project was much larger than originally planned, and this feature was cut for time.

The 'General' section displays the Pokemon's image and types. It takes in the name from the database, and gets an image from PokemonDB putting the selected Pokemon's name into a url of their artwork. The section also has colored pills for each available type.

The 'Info' section is the largest, and is broken into sub-sections for different parts of the tabs. The first tab just called info, displays data from the Pokemodel. The 'Bio', 'Dex', and 'Evolutions' sub-sections all divide the data up from the Pokemodel and display it on tables on this tab. The 'Abilities' and 'Stats' sub-sections use the data from the Abilistats model to build tables for the section tab. The 'Moves' section uses the Movemodel model to build the tables displayed on the third tab Level & Egg Moves. The 'TMs'section also uses the Movemodel, for the final tab TM/TR & Tutor Moves.

<br>

### Final Thoughts

This project was super fun to work with my brother on. He was a huge help for a lot of the backend stuff I did not know. Planning it out, getting the data, building the database, and building the front end was all fantastic experience. The project and my CS50 course helped land me an internship in the software development field! For the sake of time we had to cut some things like I stated above. If I were to improve this app in the future, the biggest thing I would add is better navigation, such as a search bar. Further improvements could look like support for the next new Pokemon games that come out, movesets from previous generation games, and locations where the Pokemon can be caught in each game.

Special Thanks:
- My Parents, I know it was a long road watching me grow up to get here!
- My lovely wife, Jennifer. For all your endless love, support, and encouragement.
- Tim, for taking the time and giving me the chance to get this career going.
- My friend John, for helping teach me so much on this project.
- Jackie, my brother's wife, for letting me take so much of his time for this project.
- And most of all, my brother David, for the tremendous amount of help and work you put in on this project. You've taught me a lot, and I literally could not have done this project without you.

- One last thanks to The Pokemon Company for creating Pokemon and all the details filling this Pokedex. As well as to the fans at Smogon and PokemonDB for the access to the data I needed for this project.

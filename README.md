
# Zork as a Service ZaaS

## 🦄 Features
ZaaS is a RESTful API that allows users to do the following:

- Get all users at the endpoint /users
- Create a new user at the endpoint /users
- Change usernames at the endpoint /users
- Get saved games at the endpoint /game_state
- Create new games at the endpoint /new_game
- Delete Games at the endpoint /delete_game
- Play Zork! at the endpoint /new_game

## 🌆 Background 
This project was inspired by github user: DLzer, who made an html/Javascript based version of Zork. Zork is a text based adventure game that was originally developed in 1977. The purpose of the game is to navigate through various locations, collecting treasures along the way by solving puzzles and completing mazes.

##  🎮 How to Play
The game is played by typing action verbs and follow-on descriptors. For example, you can start the game by entering "go north". If you say a command that isn't allowed, you will receive a message that says it isn't accepted. 

## 🛠 ZaaS Software and Development
The following instructions are for those who want to develop ZaaS on a local server.

## 🖥️ Server Architecture 

- The user facing enpoints is powered by Express.
- User access and game object persitance is held through an SQL DB.
- The game engine is held in the src directory.
    - the entry point into the game is index.js
    - the Game Engine begins in CLI.js

## 💿 How to install repo
Fork this repo, then clone it onto your machine.

### 🤲 Cloning and Installing Packages
The following dependencies need to be installed with ``` npm install ``` 
- body-parser 
- dotenv
- express
- jest
- knex
- morgan
- nodemon
- pg
- supertest

### 🔥 Environment Variables
Make a .env file and set the CONNECTION_STRING to equal the location of your database. 

### 🤓 Database Requirements
ZaaS uses a PostgreSQL docker container. Tables are created programaticly, but you will have to create the database throught the psql CLI.
1. Pull the PostgreSQL docker container.

    ``` docker pull postgres ```

2. Create volume, turn on container, log into container
    1.  ```mkdir -p $HOME/docker/volumes/postgres```
    
    2.  ```docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres```

    3. ```docker ps -a```
    
    4. Copy the container ID from the output

    5. ``` docker exec -it <PSQL-Container-ID> bash ```
3. Create a DB called " zork_db "

    ```dbcreate -U postgres zork_db```

##  🚀 Database Schema
Zork as a Service uses PostgreSQL DB to persist player data, maintain users, and provide relations between users and games.

This schema is created through the Knex Migrations and is built with command: ``` npx knex migrate:latest ```

NOTE! All database related nouns are written in snake_case

**users**

| user_id | username | last_modified | date_created |
|:----:|:----:|:----:|:----:|
| 1 | HowelsMoving | timestamp | timestamp |
| 2 | KikisDelivering | timestamp |timestamp |

**user_to_game**
 
| user_to_game_id | game_id | user_id | last_modified | date_created |
|:----:|:----:|:----:| :----:|:----:|
| 1 | 1 | 2 | timestamp |timestamp |
| 2 | 2 | 1 | timestamp |timestamp |
| 3 | 3 | 1 | timestamp |timestamp |

**game_state**

| game_state_id | player_object | last_modified | date_created |
|:----:|:----:|:----:|:----:|
| 1 | { player object } | timestamp | timestamp |
| 2 | { player object } | timestamp | timestamp |
| 3 | { player object } | timestamp | timestamp |

## ⁉️ FAQ
- Why is Justin so Cool? Answer: born that way.

## ✨ Contributing
Don't do it


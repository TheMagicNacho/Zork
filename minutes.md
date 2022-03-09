

# Designs and Meeting Minutes
Create an API that allows users to access Zork engine.

## Kick off
https://github.com/TheMagicNacho/Zork/projects/1
https://raeinblack.com/projects/zork/

## MVP Requirements
    - Need to include CRUDL
    - Multiple users tracking
    - Persistiant data via SQL DB
    - User logs in 

## USER STORIES
- As a player I want to log in so I can play zork
- As a player I want to enter text and receive classic zork text
- As a player I want my data to persist after I step away
- As a player I want instructions on how to play
- As a player I want to start new games
- As an Admin I want a list of all users
- As an Admin I want the persist DB to show state based on user id


## Tables
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



Breakdown
JP- Make server. Make login features.
JJ- Build game engine. Make Database

# Standup 20220308
- What have you done?
    - Finished user stories and MVP.
- What are you doing next?
    - Creating server and database
- what do you need help with?
    - 


COA
- Refactor everything from scratch
- Replace HTML functions

- Make our own, but smaller


# Standup 20220309
- What have we done
    - Basic server setup
    - SQL DB created and connected
    - Game Engine moderately working
    - First draft of schema
- What's next
    - Refactor game_table schema
    - Seed DB
    - Create & Attach endpoints
    - User Login Features
    - Debug the game engine
- Where do you need help
    - JP: DB
    - JJ: API Endpoints

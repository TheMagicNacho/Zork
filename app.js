/*
 * This file manages the routing for the API
 * Basic functionality 
 * 1) Simple get routing
 * 2) Using params and cookies
 * 3) Integrating SQL with knex
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import knex from 'knex';
import zork from './src/index.js';
import morgan from 'morgan';

// this reffrences the kenex file we created.
// TODO: make this based on environment variables in the future.
import { development } from './knexfile.js';

///////// ENVIRONMENT PREP //////////
// this creates the express object as an app. We can call it something else if we use it later.
// NOTE: enusre attache the body parser and cookieParser to the object.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));

// instanciate a new knex object with the connection requirements attached.
const localKnex = knex(development);


///////// ACTUAL ROUTING //////////
app.get('/', (req, res) => {
    res.send('ZORK AS A SERVICE. Please log in.');
});

// get all users function
function getAllUsers() {
    return localKnex.select("*").from("users");
};

// Get Users, GET, SELECT * FROM user_table;
// G2G
app.get("/users", (req, res) => {
    getAllUsers()
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(404).json({ message: "No user found matching this search!", error: err})
      );
});

// Edit User, PUT, User provides current user ID and new username - we change the username
// G2G
// UPDATE users SET username=newUser WHERE id=paramId; 

app.put('/users/:id', (req, res) => {
    const { username } = req.body;
    const paramId = parseInt(req.params.id);

    localKnex
        .from('users') 
        .where('user_id', paramId)
        .update({
            username: username
        })
        .then(data => res.status(200).json(data))
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});

        })
});


// New User, POST, Create a username in the table INSERT INTO users (username) VALUES (username)
// G2G
app.post('/users/:newUserName', (req, res) => {
    const paramName = req.params.newUserName;
    console.log("paramName: " + paramName);

    
    localKnex
        .insert({username: paramName})
        .from('users')
        .then(data => res.status(200).json(data))
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});

        })
    });

// Login, GET, User gives username, we give id number: SELECT user_id FROM users WHERE user_id LIKE input;

// G2G
// Saved Games, GET, Show tables associated to user ID SELECT * FROM user_to_game WHERE user_id LIKE input
app.get('/game_state/:id', (req, res) => {

    const userId = req.params.id;

    localKnex
        .select('*')
        .from('user_to_game')
        .where('user_id', userId)
        .then(data => res.status(200).json(data))
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});

        });

})

// New Game, POST, create game_state entry, attach game_state ID in join to user_id
// TODO: relook at this later. This is dependent on the Game Engine.
// USER PROVIDES USER ID

// HELPP HERE PLEASE
app.post('/new_game/:id', (req, res) => {
    const playerObject = {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":0,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}
    const userId = req.params.id;
    let thinggy;
    
    // insert array of column values, name of value as 2nd argument
    // let newGameId;
    // Insert to game_state
    localKnex
        .from('game_state')
        .insert({player_object: playerObject}, ['game_state_id'])
        .then( data => {
            let gameId = data[0]['game_state_id'];
            localKnex
                .from('user_to_game')
                .insert({
                    user_id: userId,
                    game_id: gameId
                })
                .then( data => {
                    res.status(200).json({success: true, message: gameId})
                })
                .catch((err) => {
                    console.error(err);
                        return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});
                })
            
        })
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});
    })

});


// Delete Game, DELETE, user gives join ID - we delete row with join ID and DB with associated game ID
app.delete('/delete_game/:id', (req, res) => {
    const gameId =  req.params.id;
    localKnex
        .from('game_state')
        .where('game_state_id', gameId)
        .delete()
        .then(data => res.status(200).json(data))
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred, please try again later.'});
    });
});

// Load Game, GET, Update user's cookie to include game id and username


// PLAY, PUT, User gives command- we pull user object from database - we pass cmd and obj to game engine - then return the latest game object
//TODO: Game engine needs to save playerObject to DB
// play/:user_id/:game_id {pass in command}
app.put('/play/:gameId', (req, res) => {
    const gameId =  req.params.gameId;
    // const userId =  req.params.userId;

    const cmd = req.body.cmd ? req.body.cmd : '';
    console.log(cmd);


    localKnex
        .from('game_state')
        .where('game_state_id', gameId)
        .select('player_object')
        .then(data => { 
            // console.log(JSON.stringify(data[0]));
            const newPlayObject = zork(cmd, data[0]);
            localKnex
                .from('game_state') 
                .where('game_state_id', gameId)
                .update({
                    player_object: newPlayObject
                })
                .then(data => {
                    // Query
                    localKnex
                        .from('game_state')
                        .where('game_state_id', gameId)
                        .select('player_object')
                        .then(data =>{
                            res.status(200).json(data);
                        })
                        .catch((err) => {
                            console.error(err);
                                return res.status(400).json({success: false, message: 'An error occurred in final query, please try again later.'});
                            })
                })
                .catch((err) => {
                console.error(err);
                    return res.status(400).json({success: false, message: 'An error occurred in saving your game, please try again later.'});
                })
        })
        .catch((err) => {
        console.error(err);
            return res.status(400).json({success: false, message: 'An error occurred in pulling the previous object, please try again later.'});
    });

});



export default app;
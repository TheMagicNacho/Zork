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

// this reffrences the kenex file we created.
// TODO: make this based on environment variables in the future.
import { development } from './knexfile.js';

///////// ENVIRONMENT PREP //////////
// this creates the express object as an app. We can call it something else if we use it later.
// NOTE: enusre attache the body parser and cookieParser to the object.
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// instanciate a new knex object with the connection requirements attached.
const localKnex = knex(development);


///////// ACTUAL ROUTING //////////
app.get('/', (req, res) => {
    res.send('Welcome to Zork. Please Login.');
});



export default app;
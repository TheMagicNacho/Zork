/*
 * This file is the entry point for the server.
 */
import app from './app.js';

const port = 8080;

// Instruct app to listen.
app.listen(port, () => {
    console.log(`API is listening to port ${port}`)
});
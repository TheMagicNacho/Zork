import CLI from "./CLI.js";


// O: String from game.
// I: Command, Save Object
// C: Array is fed from SQL
// E: Null inputs 
function zork (cmd, playerObject){

    // Enter command

    // Open save object

    const GameObject = new CLI();
    
    // Run player through object
    GameObject.submitCommand(cmd, playerObject);

    // create new updated player
    const updatedPlayerState = GameObject.dumpPlayerObject();

    // return the updated player state
    // console.table(updatedPlayerState);
    console.log(JSON.stringify(updatedPlayerState));
    

}

// UNIT TESTING
// const testArray = ["go north", "go north", "climb tree"," take egg", "inventory"]
const testArray = ['', "go north"];
const playerObject = {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":[],"score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}
const cmd = 'go north';
console.log(zork(cmd, playerObject));







// function zork(cmdArray){
//     // console.log(items.mat);
//     // [go north, go north, climb tree, take egg, inventory]
    
//     // Store game states as variables for Engine

//     /// ARRANGE 
//     // Create a game object
//     let GameObject = new CLI(); 
//     /// ACT
//     // loop through cmd inputs
    
//     for (let index of cmdArray){
//         console.log(index)
//         GameObject.submitCommand(index);
//     }
//     // ACCERT
//     // return output of last command
//     return GameObject.outputElement ;
// }
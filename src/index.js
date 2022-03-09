import CLI from "./CLI.js";

const debugLevel = 0;

// O: String from game.
// I: User Command, Player Game Object
// C: Array is fed from SQL
// E: Null inputs 
export default function zork (cmd, playerObject){

    // Create new Game Object
    const GameObject = new CLI();
    
    // Run player through object
    GameObject.submitCommand(cmd, playerObject);
    // create new updated player
    const updatedPlayerState = GameObject.dumpPlayerObject();


    // return the updated player state
    switch (debugLevel){
        case "0":
            console.log('Game Piece Created')
        case "1":
            console.table("Game Piece" + updatedPlayerState);
        case "2":
            console.log("String" + JSON.stringify(updatedPlayerState));
    }

    return updatedPlayerState;
    
    

}

// // UNIT TESTING
// // const testArray = ["go north", "go north", "climb tree"," take egg", "inventory"]
// // const testArray = ['', "go north"];
// const playerObject = {"output":"You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.","inventory":"","score":0,"moves":2,"currentRoom":"northOfHouse","previousRoom":"westOfHouse","gameIsSaved":false,"verbose":false}
// // const playerObject = {"output":"This is a path winding through a dimly lit forest. The path heads north-south here.<br /> One particulary large tree with some low branches stands at the edge of the path.","inventory":[],"score":0,"moves":3,"currentRoom":"forestPath","previousRoom":"northOfHouse","gameIsSaved":false,"verbose":false}
// const cmd = 'go north';
// console.log(zork(cmd, playerObject));

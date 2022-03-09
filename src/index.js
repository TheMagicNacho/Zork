import CLI from "./CLI.js";
import Item from "./Item.js";
import Room from "./Room.js";

// import GameEngine from "./GameEngine.js";
// import Item from "./Item.js";
// import Player from "./Player.js";
// import Room from "./Room.js";

var items = {
    'sack': new Item("sack","sack","", "elongated brown sack, smelling of hot peppers","hot peppers",false, ['open','eat'], "Opening the sack reveals a lunch, and a clove of garlice.","What the heck! You wont make friends this way, but nobody around here is too friendly anyhow. Gulp!<br />",false),
    'bottle': new Item("bottle","bottle","A glass bottle is sitting on the table containing a quantity of water.", "A glass bottle is sitting on the table containing<br />a quantity of water.","a quantity of water", false, ['open','drink'], "opened", "Thank you very much. I was rather thirsty (from all this talking, probably).<br />",false),
    'leaflet': new Item("leaflet","leaflet","", "small leaflet","WELCOME TO ZORK!<br /><br />ZORK is a game of adventure, danger and low cunning.<br />In it you will explore some of the most amazing territory ever seen by mortals.<br />No computer should be without one!",false,["read"], "", "",false),
    'mat': new Item("mat","mat", "A rubber mat saying 'Welcome to Zork!' lies by the door.", "A rubber mat", "", false, [], "","",false),
    'egg': new Item("egg","egg", "In the birds nest is a large egg encrusted with precious jewels, apparently scavenged by a childless songbird.<br /> The egg is covered with fine gold inlay, and ornamented in lapis lazuli and mother-of-pearl.<br /> Unlike most eggs, this one is hinged and closed with a delicate looking clasp.<br /> The egg appears extremely fragile.<br />", "", false, ['use'],"You've opened the egg.<br />", "The egg glimmers, blinds you, and you fall to the ground.<br />",false),
    'leaves': new Item("leaves","grating","On the ground is a pile of leaves.", "","",false, ['use'], "", "You place the grating on the ground. Great..",false),
    'sword': new Item("sword","elven sword","Above the trophy case hangs an elvish sword of great antiquity.", "","",false, ['use','attack'], "You pull the elven sword from you bag and hold it high in the air. It glows with a mystical aura.<br />", "You fiercly swing the sword.<br />",false),
    'lantern': new Item("lantern","brass lantern","A battery-powered brass lantern is on the trophy case.", "","",false, ['use','on', 'off'], "", "The brass lantern is now on.<br />",false)
};

var rooms = {
    "northOfHouse": new Room("northOfHouse","North of House", "You are facing the north side of a white house. There is no door here,<br /> and all the windows are boarded up. To the north a narrow path winds through the trees.", [], false),
    "forestPath":  new Room("forestPath","Forest Path", "This is a path winding through a dimly lit forest. The path heads north-south here.<br /> One particulary large tree with some low branches stands at the edge of the path.", [], false),
    "forest_one": new Room("forest_one", "Forest", "This is a dimly lit forest, with large trees all around", [], false),
    "forest_two": new Room("forest_two","Forest", "This is a forest, with trees in all directions.<br />To the east, there appears to be light.", [], false),
    "forest_three": new Room("forest_three","Forest", "This is a dimly lit forest, with large trees all around.", [], false),
    "forest_four": new Room("forest_four","Forest", "The forest thins out, revealing impassable mountains.", [], false),
    "stormTossed": new Room("stormTossed","Forest", "Storm-tossed trees block your way.", [], false),
    "southOfHouse": new Room("southOfHouse","South of House", "You are facing the south side of a white house.<br /> There is no door here, and all the windows are boarded", [], false),
    "westOfHouse": new Room("westOfHouse","West of House", "This is an open field west of a white house, with a boarded front door.<br />There is a small mailbox here.", items.mat, false),
    "behindHouse": new Room("behindHouse","Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is slightly ajar.",[], false),
    "windowBehindHouse": new Room("windowBehindHouse","Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is open.",[], false),
    "kitchen": new Room("kitchen","Kitchen", "You are in the kitchen of a the white house. A table seems to have been used recently for the<br />preparation of food. A passage leads to the west and a dark staircase can be seen leading upward.<br /> A dark chimney leads down and to the east is a small window which is open.<br />",[items.sack, items.bottle], false),
    "mailbox": new Room("mailbox", "Mailbox", "Opening the mailbox reveals a leaflet.",items.leaflet),// itemObjects[leaflet]
    "tree": new Room("tree", "Up A Tree", "You are about 10 feet above the ground nestled among some large branches.<br />The nearest branch above you is out of reach. Besides you on the branch is a small birds nest.", items.egg, false),
    "northClearing": new Room("northClearing", "Clearing", "You are in a clearing, with a forest surrounding you on all sides. A path leads south.", items.leaves, false),
    "eastClearing": new Room("eastClearing", "Clearing", "You are in a small clearing in a well marked forest path that extends to the east and west.", [], false),
    "canyonView": new Room("canyonView", "Canyon View", "You are at the top of the Great Canyon on its west wall.<br />From here there is a marvelous view of the canyon and parts of the Frigid River upstream. Across the canyon, the walls of the White Cliffs join the mighty ramparts of the Flathead Mountains to the east.<br /> Following the Canyon upstream to the north, Aragain Falls may be seen, complete with rainbow.<br /> The mighty Frigid River flows out from a great dark cavern. To the west and south can be seen an immense forest, stretching for miles around. A path leads northwest.<br > It is possible to climb down into the canyon from here.", [], false),
    "rockyLedge": new Room("rockyLedge", "Rocky Ledge", "You are on a ledge about halfway up the wall of the river canyon.<br />You can see from here that the main flow from Aragain Falls twists along a passage which it is impossible for you to enter.<br />Below you is the canyon bottom. Above you is more cliff, which appears climbable.", [], false),
    "canyonBottom": new Room("canyonBottom", "Canyon Bottom", "You are beneath the walls of the river canyon which may be climbable here.<br />The lesser part of the runoff of Aragain Falls flows by below. To the north is a narrow path.", [], false),
    "endOfRainbow": new Room("endOfRainbow", "End of Rainbow", "You are on a small, rocky beach on the continuation of the Frigid River past the Falls.<br /> The beach is narrow due to the presence of the White Cliffs. The river canyon opens here and sunlight shines in from above.<br />A rainbow crosses over the falls to the east and a narrow path continues to the southwest.", [], false),
    "chimney": new Room("chimney", "Chimney", "You are in a small cold chimney, on the wall reads 'Santa was here'.",[], true),
    "livingRoom": new Room("livingRoom", "Living Room", "You are in the living room. There is a doorway to the east, a wooden door with strange gothic lettering to the west, which appears to be nailed shut, a trophy case, and a large oriental rug in the center of the room.", [items.sword, items.lantern], false),
    "livingRoomRugMoved": new Room("livingRoomRugMoved", "Living Room", "With a great effort, the rug is moved to one side of the room, revealing the dusty cover of a closed trap door.", [items.sword, items.lantern], false),
    "livingRoomTrapDoor": new Room("livingRoomTrapDoor", "Trap Door", "The door reluctantly opens to reveal a rickety staircase descending into darkness.",[], false),
    "cellar": new Room("cellar", "Cellar", "You are in a dark and damp cellar with a narrow passageway leading north, and a crawlway to the south. On the west is the bottom of a steep metal ramp which is unclimbable.",[], true),
};

// O: String from game.
// I: Array of commands.
// C: Array is fed from SQL
// E: Null inputs 
function zork(cmdArray){
    // console.log(items.mat);
    // [go north, go north, climb tree, take egg, inventory]
    
    // Store game states as variables for Engine

    /// ARRANGE 
    // Create a game object
    let GameObject = new CLI(rooms, items); 


    /// ACT
    // loop through cmd inputs
    
    for (let index of cmdArray){
        console.log(index)
        GameObject.submitCommand(index);
    }
    // ACCERT
    // return output of last command
    return GameObject.outputElement ;
}


// UNIT TESTING
// const testArray = ["go north", "go north", "climb tree"," take egg", "inventory"]
const testArray = ["go north"];

console.log(zork(testArray));

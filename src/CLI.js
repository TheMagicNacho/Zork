/**
 * CLI Service Class
 */ 
// function that takes in user param, pass to game engine, returns correct response
// need end points
import Item from "./Item.js";
import Room from "./Room.js";
import Player from "./Player.js";


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
    "westOfHouse": new Room("westOfHouse","West of House", "This is an open field west of a white house, with a boarded front door.<br />There is a small mailbox here.", [items.mat], false),
    "behindHouse": new Room("behindHouse","Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is slightly ajar.",[], false),
    "windowBehindHouse": new Room("windowBehindHouse","Behind House", "You are behind the white house. A path leads into the forest to the east. <br />In one corner of the house there is a small window which is open.",[], false),
    "kitchen": new Room("kitchen","Kitchen", "You are in the kitchen of a the white house. A table seems to have been used recently for the<br />preparation of food. A passage leads to the west and a dark staircase can be seen leading upward.<br /> A dark chimney leads down and to the east is a small window which is open.<br />",[items.sack, items.bottle], false),
    "mailbox": new Room("mailbox", "Mailbox", "Opening the mailbox reveals a leaflet.",[items.leaflet]),// itemObjects[leaflet]
    "tree": new Room("tree", "Up A Tree", "You are about 10 feet above the ground nestled among some large branches.<br />The nearest branch above you is out of reach. Besides you on the branch is a small birds nest.", [items.egg], false),
    "northClearing": new Room("northClearing", "Clearing", "You are in a clearing, with a forest surrounding you on all sides. A path leads south.", [items.leaves], false),
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


export default class CLI {
    /**
     * 
     * @param {element} inputElement The input element 
     * @param {element} outputElement The output element
     * @param {element} cliContainer The cli containing element
     */
    //deleted CLI container
    constructor() {
        this.player = null;

        this.inputElement  = '';
        this.outputElement = '';
        // this.cliContainer  = cliContainer;
        this.itemObjects = items;

        this.outputList = {
            saveLoaded : "Game loaded from a previous save.",
            gameSaved :"Your game state has been saved.",
            gameReset : "Your game state has been reset.",
            emptyBag :"There is nothing in your bag!",
            bagContains: "Your bag contains:",
            acceptableCommands:"Here is a list of acceptable commands:",
            acceptableCommandList: ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'],
            verboseMode: "ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).",
            briefMode : "ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.",
            invalidDirection : "You can't go that way.",
            notOpenable : "You can't open that.",
            notUseable : "Use what?",
            alreadyInUse : "The item is already in use. Putting item away.",
            notReadable : "You can't read that."
        };

        this.roomList = rooms;

        this.allowedVerbs = [
            "GO", "LOOK", "TAKE", "PUSH", "BACK",
            "PULL", "DROP", "OPEN", "WAIT", "ENTER",
            "CLOSE", "INVENTORY", "BAG", "ZYZZY", "HELP",
            "USE", "NORTH", "EAST", "SOUTH", "WEST", "MAILBOX",
            "UP", "DOWN", "LEFT", "RIGHT", "SAVE", "RESET",
            "HELP", "STATE", "BRIEF", "VERBOSE", "READ",
            "CLIMB", "UP", "DOWN",
        ];
        this.openableInstances = [
            "WINDOW", "DOOR", "TRAPDOOR", "TRAP", "TREE", "KITCHEN",
            "CHIMNEY",
        ];
    }

    enterInputElement(input){
        this.inputElement = input;
    }
    /**
     * Add event listener for input commands
     */
    // startCommandListener() 
    // {
    //     this.inputElement.on('keypress', (event) => {
    //         if( event.which === 13 ) {
    //             this.submitCommand();
    //             this.scrollDown();
    //         }
    //     });
    // }

    //update table command
    //when user enters a command, it needs to update game state
    
    /**
     * Receive, parse and return valid commands
     * 
     * @returns {array}
     */
    submitCommand(input, playerObject) 
    {
        // INIT
        this.init(playerObject);
        

        // Get command input
       // let cmd = this.inputElement.val();
        let cmd = input;
        
        // Drop command to lower case
        // This function is easier to implement and still runs in O(n)
        cmd = cmd.toUpperCase();
        // Split any words separated by a space into array parts.
        // This function is based off the similar python implementation.
        cmd = cmd.split(/(\s+)/).filter( e => e.trim().length > 0);
        // Validate that the command is within the acceptable commands array.
        for ( let i = 0; i < cmd.length; i++ ) {
            if ( !this.validateCommand(cmd[i]) ) {
                this.invalidCommand();
            
                return;
            }
        }


        let executableCommand = cmd[0];
        let commandArgument   = (cmd[1]) ? cmd[1] : null;
        this.executeCommand(executableCommand, commandArgument);
    }
    

    /**
     * Validate that the parameter CMD is within the
     * allowed verbs array.
     * 
     * @param {string} cmd The input command
     * @returns {bool}
     */
    validateCommand(cmd) 
    {
       
        if ( this.allowedVerbs.includes(cmd) || 
                // localArray.includes(cmd.toLowerCase()) ||
                this.openableInstances.includes(cmd)
            ) 
        {
            return true;
        }
        return false;
    }

    /**
     * Outputs an invalid command statement
     */
    invalidCommand() 
    {
        this.output("Oh no, that doesn't look right!");
    }

    /**
     * Prints output strings to the DOM CLI
     * 
     * @param {string} output The output 
     */

    output(output)
    {
        //this.outputElement.before(output+"<br><br>");
        // this.outputElement += output; 
        this.player.output = '';
        this.player.output += output;
    }
    //////////////////////////////////////GAME ENGINE METHODS
    init (playerObject) {
        // this.initializeCLI();
        // this.cli.startCommandListener();
        this.initalizePlayer(playerObject);
        this.lookAction();
        this.linkAllRooms();
    }

    initalizePlayer (playerObject) {
        this.player = new Player();
        this.player = this.player.loadPlayerState(playerObject);
    }

    saveGame () {
        this.player.savePlayerState();
        this.output(this.outputList.gameSaved);
    }

    resetGame() {
        this.player.resetPlayerState();
        this.output(this.outputList.gameReset);
    };

    dumpPlayerObject(){
        return this.player;
    }



     /********* CORE COMMANDS *********/

    // Outputs a help dialog to the player
    printHelp () {
        this.output(this.outputList.acceptableCommands);
        var acceptedCommands = this.outputList.acceptableCommandList;
        for(i = 0; i < acceptedCommands.length; i++) {
            this.output(acceptedCommands[i]);
        }
    }

    printInventory () {
        let inventory = this.player.getPlayerInventory();

        if(inventory === undefined || inventory.length == 0) {
			this.output(this.outputList.emptyBag);
		} else {
			this.output(this.outputList.bagContains);
			for(j=0;j<inventory.length;j++) {
				this.output(this.player.inventory[j]);
			}
		}
    }
    // Sets the output of items and rooms to verbose mode
    setVerboseOutput () {
        this.player.setVerboseMode(true);
        this.output(this.outputList.verboseMode);
    }
    // Sets the output of items and rooms to brief mode
    setBriefOutput () {
        this.player.setVerboseMode(false);
        this.output(this.outputList.briefMode);
    }

    getCurrentRoom() {
        return this.player.currentRoom;
    }
    
    getPreviousRoom () {
        return this.player.previousRoom;
    }

    /********* DIRECTIONAL COMMANDS *********/

    lookAction () {

        const currentRoom = this.player.currentRoom;
    

        if( !this.roomList[currentRoom].roomIsDark ) {

			this.output( this.roomList[currentRoom].name );
			this.output(this.roomList[currentRoom].look);
		
			this.showItems(this.roomList[currentRoom]);

		} else if(this.roomList[currentRoom].roomIsDark && !lantern.itemInUse) {

			this.output(this.roomList[currentRoom].darkText    );

		} else if(this.roomList[currentRoom].roomIsDark && lantern.itemInUse) {

			this.output(this.roomList[currentRoom].name );
			this.output(this.roomList[currentRoom].look);
		
			this.showItems(this.roomList[currentRoom]);

		}
    }

    showItems (room) {

        var itemlist = [];
	
		for (var i = 0; i < room.items.length; i++) {
			if (room.items[i].specialdesc) 
            {
				this.output(room.items[i].specialdesc + "<br>");
			}
			else 
            {
				itemlist.push(room.items[i].description);
			}
		}

		if (itemlist.length === 1) 
        {
			this.output("There is a " + itemlist[0] + " here.");
		}
		else if (itemlist.length > 1) 
        {
			var str = "";
			for (var i = 0; i < itemlist.length; i++) {
				if (!itemlist[i + 1]) {
					str.concat(itemlist[i]);
				}
				else {
					str.concat(itemlist[i] + ", ");
				}
			}
			this.output("There is a " + str + " here.");
		}
    }

    goAction (direction) {

        
        let currentRoom = this.player.currentRoom;                                                                                                         
        let lDirection = direction.toLowerCase();

        if ( lDirection == "back" ) {
            this.player.setCurrentLocation(this.player.getPreviousLocation());
            this.player.setPreviousLocation(roomList[currentRoom].varName);
            currentRoom = this.player.currentRoom;
        } else {

            if (this.roomList[currentRoom][lDirection] === undefined) 
            {
                this.output(this.outputList.invalidDirection);
                return;
            }

            this.player.setPreviousLocation(this.roomList[currentRoom].varName);
            this.player.setCurrentLocation(this.roomList[currentRoom][lDirection].varName);
            currentRoom = this.player.currentRoom;
        }

        if (this.player.getVerboseMode()){
            if (currentRoom.visited) {
                this.output("" + roomList[currentRoom].name + "");
                this.showItems(roomList[currentRoom]);
            }
            else {
                this.lookAction();
                roomList[currentRoom].visited = true;
            }
        }

        else {
            this.lookAction();
            this.roomList[currentRoom].visited = true;
        }
    }

    openAction (direction) {

        if ( direction == "EGG" ) {
            this.useAction("EGG");
            return;
        }

        let currentRoom = this.player.currentRoom;

        if (this.roomList[currentRoom]["open"] === undefined || !this.roomList[currentRoom]["open"]) 
        {
            this.output(this.outputList.notOpenable);
        }
        else 
        {

        console.log("**GameEngine: Opening room");
        this.player.setPreviousLocation(this.roomList[currentRoom].varName);
        this.player.setCurrentLocation(this.roomList[currentRoom]["open"].varName);
        currentRoom = this.player.currentRoom;

            if (this.player.getVerboseMode()){
                if (currentRoom.visited) {
                    this.output("" + this.roomList[currentRoom].name + "");
                    this.showItems(this.roomList[currentRoom]);
                }
                else {
                    this.lookAction();
                    this.roomList[currentRoom].visited = true;
                }
            }

            else {
                this.lookAction();
                this.roomList[currentRoom].visited = true;
            }
        }
    }

    takeAction (item) {

        let lItem = item.toLowerCase();
        let itemObject = this.itemObjects[lItem];
        let currentRoom = this.player.currentRoom;
        let roomItems = this.roomList[ currentRoom ].items;

        if ( ! roomItems.includes(itemObject) ) {
            this.output("A "+lItem+" does not exist here.");
            return;
        }

        if ( this.player.inventory[itemObject] ) {
            this.output("The "+lItem+" is already in your bag.");
            return;
        }

        this.player.addToInventory(lItem);
        this.output("You put the "+lItem+" in your bag.");
  
    }

    readAction (item) {
        let lItem = item.toLowerCase();
        let itemObject = this.itemObjects[lItem];

        if (!this.player.inventory.includes(lItem))
        {
            this.output("You don't own a "+lItem+ " to read.");
            return;
        }

        if (!itemObject.actionArray.includes("read"))
        {
            this.output(this.outputList.notReadable);
            return;
        }

        this.output(itemObject.contents);
    }

    dropAction (item) {

        let lItem = item.toLowerCase();
        let itemObject = this.itemObjects[lItem];

        if (!this.player.inventory.includes(lItem))
        {
            this.output("You don't own a "+lItem+ " to drop.");
            return;
        }

        let currentRoom = this.player.currentRoom;
        this.roomList[currentRoom].items.push(itemObject);

        this.player.removeFromInventory(lItem);
        this.output("You have dropped the "+lItem);

    }

    useAction (item) {

        if ( !item ) {
            this.output(this.outputList.notUseable);
        }

        let lItem = item.toLowerCase();

        if (!this.player.getPlayerInventory().includes(lItem)) {
            this.output("You don't have a "+lItem+" to use!");
        }

        if (this.itemObjects[lItem].inUse) {
            this.output(this.outputList.alreadyInUse);
            this.itemObjects[lItem].inUse = false;
            this.lookAction();
        } else {
            if ( lItem == "egg") {
                this.output(""+this.itemObjects[lItem].openDesc+"");
                if ( this.player.currentRoom == "tree") {
                    this.goAction("back");
                    return;
                }
            } else {
                this.output(""+this.itemObjects[lItem].useDesc+"");
            }
            this.itemObjects[lItem].inUse = true;
            this.lookAction();
        }

    }

    executeCommand(cmd, arg){
        this.player.moves += 1;

        //TODO: handle singel input commands

        switch (cmd) {
            case "GO":
                this.goAction(arg);
                break;
            case "NORTH":
                this.goAction(arg);
                break;
            case "SOUTH":
                this.goAction(arg);
                break;
            case "EAST":
                this.goAction(arg);
                break;
            case "WEST":
                this.goAction(arg);
                break;
            case "BACK":
                this.goAction(arg);
                break;
            case "CLIMB":
                this.goAction(arg);
                break;
            case "UP":
                this.goAction(arg);
                break;
            case "DOWN":
                this.goAction(arg);
                break;
            case "ENTER":
                this.goAction(arg);
                break;    
            case "LOOK":
                this.lookAction();
                break;
            case "TAKE":
                this.takeAction(arg);
                break;
            case "USE":
                this.useAction(arg);
                break;
            case "DROP":
                this.dropAction(arg);
                break;
            case "OPEN":
                this.openAction(arg);
                break;
            case "READ":
                this.readAction(arg);
                break;
            case "INVENTORY":
                this.printInventory();
                break;
            case "BAG":
                this.printInventory();
                break;
            case "HELP":
                this.printHelp();
                break;
            case "BRIEF":
                this.setBriefOutput();
                break;
            case "VERBOSE":
                this.setVerboseOutput();
                break;
            

        }
    }

    // executeCommand(cmd, arg = null) {
    //     this.player.moves += 1;

    //     var verbMap = {
    //         "GO":         this.goAction,
    //         "NORTH":      this.goAction,
    //         "SOUTH":      this.goAction,
    //         "EAST":       this.goAction,
    //         "WEST":       this.goAction,
    //         "BACK":       this.goAction,
    //         "CLIMB":      this.goAction,
    //         "UP":         this.goAction,
    //         "DOWN":       this.goAction,
    //         "ENTER":      this.goAction,
    //         "LOOK":       this.lookAction,
    //         "TAKE":       this.takeAction,
    //         "USE":        this.useAction,
    //         // "PUSH":       this.Push,
    //         // "PULL":       this.Pull,
    //         "DROP":       this.dropAction,
    //         "OPEN":       this.openAction,
    //         "READ":       this.readAction,
    //         // "WAIT":       this.Wait,
    //         // "CLOSE":      this.Close,
    //         "INVENTORY":  this.printInventory,
    //         "BAG":        this.printInventory,
    //         "HELP":       this.printHelp,
    //         "SAVE":       this.saveGame,
    //         "RESET":      this.resetGame,
    //         "BRIEF":      this.setBriefOutput,
    //         "VERBOSE":    this.setVerboseOutput,
    //     }
    
    //     if ( ["NORTH", "SOUTH", "EAST", "WEST", "BACK", "CLIMB", "ENTER", "UP", "DOWN"].includes(cmd) ) {
    //         verbMap[ cmd ]( cmd );
    //     } else {
    //         // OG
    //         verbMap[ cmd ]( arg );
    //         // verbMap[ cmd ];
    //     }

    // }




    // void
    linkAllRooms(){

        this.roomList.westOfHouse.visited = true;
        // Forest One
        this.roomList.forest_one.addExit("south", this.roomList.stormTossed);
        this.roomList.forest_one.addExit("north", this.roomList.southOfHouse);
        // Storm Tossed Forest
        this.roomList.stormTossed.addExit("north", this.roomList.forest_one);
        // North of House
        this.roomList.northOfHouse.addExit("east", this.roomList.behindHouse);
        this.roomList.northOfHouse.addExit("south", this.roomList.southOfHouse);
        this.roomList.northOfHouse.addExit("north", this.roomList.forestPath);
        this.roomList.northOfHouse.addExit("west", this.roomList.westOfHouse);
        //Forest Path
        this.roomList.forestPath.addExit("south", this.roomList.northOfHouse);
        this.roomList.forestPath.addExit("climb", this.roomList.tree);
        this.roomList.forestPath.addExit("up", this.roomList.tree);
        this.roomList.forestPath.addExit("north", this.roomList.northClearing);
        // North Clearing
        this.roomList.northClearing.addExit("west", this.roomList.forest_two);
        this.roomList.northClearing.addExit("east", this.roomList.forest_three);
        this.roomList.northClearing.addExit("south", this.roomList.forestPath);
        // Forest ( 2 )
        this.roomList.forest_two.addExit("east", this.roomList.forestPath);
        this.roomList.forest_two.addExit("north", this.roomList.northClearing);
        this.roomList.forest_two.addExit("south", this.roomList.westOfHouse);
        // Forest ( 3 )
        this.roomList.forest_three.addExit('west', this.roomList.forestPath);
        this.roomList.forest_three.addExit('east', this.roomList.forest_four);
        // Forest ( 4 )
        this.roomList.forest_four.addExit('west', this.roomList.forestPath);
        // Tree
        this.roomList.tree.addExit("climb",this.roomList.forestPath);
        this.roomList.tree.addExit("down",this.roomList.forestPath);
        this.roomList.tree.addExit("south",this.roomList.northOfHouse);
        // South of House
        this.roomList.southOfHouse.addExit("north", this.roomList.westOfHouse);
        this.roomList.southOfHouse.addExit("south", this.roomList.forest_one);
        this.roomList.southOfHouse.addExit("east", this.roomList.behindHouse);
        this.roomList.southOfHouse.addExit("west", this.roomList.westOfHouse);
        // West of House
        this.roomList.westOfHouse.addExit("north", this.roomList.northOfHouse);
        this.roomList.westOfHouse.addExit("south", this.roomList.southOfHouse);
        this.roomList.westOfHouse.addExit("east", this.roomList.behindHouse);
        this.roomList.westOfHouse.addExit("west", this.roomList.forest_two);
        this.roomList.westOfHouse.addExit("open", this.roomList.mailbox)
        // Mailbox
        this.roomList.mailbox.addExit("north", this.roomList.northOfHouse);
        this.roomList.mailbox.addExit("south", this.roomList.southOfHouse);
        this.roomList.mailbox.addExit("east", this.roomList.behindHouse);
        this.roomList.mailbox.addExit("west", this.roomList.forest_two);
        //Behind House
        this.roomList.behindHouse.addExit("open", this.roomList.windowBehindHouse);
        this.roomList.behindHouse.addExit("south", this.roomList.southOfHouse);
        this.roomList.behindHouse.addExit("west", this.roomList.westOfHouse);
        this.roomList.behindHouse.addExit("east", this.roomList.eastClearing);
        this.roomList.behindHouse.addExit("north", this.roomList.northOfHouse);
        // East Clearing
        this.roomList.eastClearing.addExit("west", this.roomList.behindHouse);
        this.roomList.eastClearing.addExit("east", this.roomList.canyonView);
        // Canyon View
        this.roomList.canyonView.addExit("west", this.roomList.eastClearing);
        this.roomList.canyonView.addExit("east", this.roomList.rockyLedge);
        this.roomList.canyonView.addExit("climb", this.roomList.rockyLedge);
        this.roomList.canyonView.addExit("down", this.roomList.rockyLedge);
        // Rocky Ledge
        this.roomList.rockyLedge.addExit("west", this.roomList.canyonView);
        this.roomList.rockyLedge.addExit("up", this.roomList.canyonView);
        this.roomList.rockyLedge.addExit("down", this.roomList.canyonBottom);
        this.roomList.rockyLedge.addExit("climb", this.roomList.canyonBottom);
        // Canyon Bottom
        this.roomList.canyonBottom.addExit("up", this.roomList.rockyLedge);
        this.roomList.canyonBottom.addExit("climb", this.roomList.rockyLedge);
        this.roomList.canyonBottom.addExit("north", this.roomList.endOfRainbow);
        //End of Rainbow
        this.roomList.endOfRainbow.addExit("south", this.roomList.canyonBottom);
        //Window Behind House
        this.roomList.windowBehindHouse.addExit("enter", this.roomList.kitchen);
        this.roomList.windowBehindHouse.addExit("east", this.roomList.eastClearing);
        this.roomList.windowBehindHouse.addExit("west", this.roomList.westOfHouse);
        this.roomList.windowBehindHouse.addExit("north", this.roomList.northOfHouse);
        this.roomList.windowBehindHouse.addExit("south", this.roomList.southOfHouse);
        // Kitchen
        this.roomList.kitchen.addExit("exit", this.roomList.behindHouse);
        this.roomList.kitchen.addExit("up", this.roomList.chimney);
        this.roomList.kitchen.addExit("west", this.roomList.livingRoom);
        // Chimney
        this.roomList.chimney.addExit("down", this.roomList.kitchen);
        // Living Room
        this.roomList.livingRoom.addExit("east", this.roomList.kitchen);
        this.roomList.livingRoom.addExit("move", this.roomList.livingRoomRugMoved);
        // Living Room rug moved
        this.roomList.livingRoomRugMoved.addExit("east", this.roomList.kitchen);
        this.roomList.livingRoomRugMoved.addExit("open", this.roomList.livingRoomTrapDoor);
        // Living Room Trap Door
        this.roomList.livingRoomTrapDoor.addExit("down", this.roomList.cellar);
        this.roomList.livingRoomTrapDoor.addExit("east", this.roomList.kitchen);
        // Cellar
        this.roomList.cellar.addExit("up", this.roomList.livingRoom);
    }

}
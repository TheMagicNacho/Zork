/**
 * CLI Service Class
 */ 
// function that takes in user param, pass to game engine, returns correct response
// need end points
import Item from "./Item.js";
import Room from "./Room.js";
import Player from "./Player.js";


export default class CLI {
    /**
     * 
     * @param {element} inputElement The input element 
     * @param {element} outputElement The output element
     * @param {element} cliContainer The cli containing element
     */
    //deleted CLI container
    constructor(rooms, items) {
       
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
    submitCommand(input) 
    {
        // INIT
        this.init();
        this.linkAllRooms();

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
                // $('input').val('');
                return;
            }
        }
        // Command is valid
        // $('input').val('');

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
        this.outputElement = output; 
    }
    //////////////////////////////////////GAME ENGINE METHODS
    init () {
        // this.initializeCLI();
        // this.cli.startCommandListener();
        this.initalizePlayer();
        this.lookAction();
    }

    initalizePlayer () {
        this.player = new Player();
        this.player = this.player.loadPlayerState();
        console.log('from INIT PLAYER'+ this.player.currentRoom);
       

        // This just provides feed back on if the file was loaded from save.
        // if ( this.player.gameIsSaved ) { this.output(this.outputList.saveLoaded); }
    }

    saveGame () {
        this.player.savePlayerState();
        this.output(this.outputList.gameSaved);
    }

    resetGame() {
        this.player.resetPlayerState();
        this.output(this.outputList.gameReset);
    };



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

        console.log('FROM GO ACTION'+ this.player.currentRoom);
        const currentRoom = this.player.currentRoom;                                                                                                         
        let lDirection = direction.toLowerCase();

        if ( lDirection == "back" ) {
            this.player.setCurrentLocation(this.player.getPreviousLocation());
            this.player.setPreviousLocation(roomList[currentRoom].varName);
            currentRoom = this.player.currentRoom;
        } else {

            if (roomList[currentRoom][lDirection] === undefined) 
            {
                this.output(this.outputList.invalidDirection);
                return;
            }

            this.player.setPreviousLocation(roomList[currentRoom].varName);
            this.player.setCurrentLocation(roomList[currentRoom][lDirection].varName);
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
            roomList[currentRoom].visited = true;
        }
    }

    openAction (direction) {

        if ( direction == "EGG" ) {
            this.useAction("EGG");
            return;
        }

        let currentRoom = this.player.currentRoom;

        if (roomList[currentRoom]["open"] === undefined || !roomList[currentRoom]["open"]) 
        {
            this.output(this.outputList.notOpenable);
        }
        else 
        {

        console.log("**GameEngine: Opening room");
        this.player.setPreviousLocation(roomList[currentRoom].varName);
        this.player.setCurrentLocation(roomList[currentRoom]["open"].varName);
        currentRoom = this.player.currentRoom;

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
                roomList[currentRoom].visited = true;
            }
        }
    }

    takeAction (item) {

        let lItem = item.toLowerCase();
        let itemObject = itemObjects[lItem];
        let currentRoom = this.player.currentRoom;

        if ( !roomList[currentRoom].items.includes(itemObject) ) {
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
        let itemObject = itemObjects[lItem];

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
        let itemObject = itemObjects[lItem];

        if (!this.player.inventory.includes(lItem))
        {
            this.output("You don't own a "+lItem+ " to drop.");
            return;
        }

        let currentRoom = this.player.currentRoom;
        roomList[currentRoom].items.push(itemObject);

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

        if (itemObjects[lItem].inUse) {
            this.output(this.outputList.alreadyInUse);
            itemObjects[lItem].inUse = false;
            this.lookAction();
        } else {
            if ( lItem == "egg") {
                this.output(""+itemObjects[lItem].openDesc+"");
                if ( this.player.currentRoom == "tree") {
                    this.goAction("back");
                    return;
                }
            } else {
                this.output(""+itemObjects[lItem].useDesc+"");
            }
            itemObjects[lItem].inUse = true;
            this.lookAction();
        }

    }




    /**
     * Receives a command and determine the output function
     * 
     * @param {string} cmd The command
     * @param {string|null} arg The command arguments ( if any )
     */
    executeCommand(cmd, arg = null)
    {

        var verbMap = {
            "GO":         this.goAction,
            "NORTH":      this.goAction,
            "SOUTH":      this.goAction,
            "EAST":       this.goAction,
            "WEST":       this.goAction,
            "BACK":       this.goAction,
            "CLIMB":      this.goAction,
            "UP":         this.goAction,
            "DOWN":       this.goAction,
            "ENTER":      this.goAction,
            "LOOK":       this.lookAction,
            "TAKE":       this.takeAction,
            "USE":        this.useAction,
            // "PUSH":       this.Push,
            // "PULL":       this.Pull,
            "DROP":       this.dropAction,
            "OPEN":       this.openAction,
            "READ":       this.readAction,
            // "WAIT":       this.Wait,
            // "CLOSE":      this.Close,
            "INVENTORY":  this.printInventory,
            "BAG":        this.printInventory,
            "HELP":       this.printHelp,
            "SAVE":       this.saveGame,
            "RESET":      this.resetGame,
            "BRIEF":      this.setBriefOutput,
            "VERBOSE":    this.setVerboseOutput,
        }
    
        if ( ["NORTH", "SOUTH", "EAST", "WEST", "BACK", "CLIMB", "ENTER", "UP", "DOWN"].includes(cmd) ) {
            verbMap[ cmd ]( cmd );
        } else {
            verbMap[ cmd ]( arg );
        }

    }
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
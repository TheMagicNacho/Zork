import Player from './Player.js';
import CLI from './CLI.js';

export default class GameEngine{

    // roomView:       $('.room'),
    // scoreBoard:     $('#score-int'),
    // movesBoard:     $('#move-int'),
    constructor(){
        // this.outputList = {
        //     saveLoaded : "Game loaded from a previous save.",
        //     gameSaved :"Your game state has been saved.",
        //     gameReset : "Your game state has been reset.",
        //     emptyBag :"There is nothing in your bag!",
        //     bagContains: "Your bag contains:",
        //     acceptableCommands:"Here is a list of acceptable commands:",
        //     acceptableCommandList: ['> go [direction]', '> north', '> east', '> south', '> west', '> up', '> down', '> look', '> open', '> enter', '> exit','> climb', '> brief [ short descriptions ]', '> verbose [ long descriptions ]', '> help', '> take', '> bag', '> save [ Save current game]', '> reset [ Reset game including save ]'],
        //     verboseMode: "ZORK is now in its \"verbose\" mode, which always gives long descriptions of locations (even if you've been there before).",
        //     briefMode : "ZORK is now in its normal \"brief\" printing mode, which gives long descriptions of places never before visited, and short descriptions otherwise.",
        //     invalidDirection : "You can't go that way.",
        //     notOpenable : "You can't open that.",
        //     notUseable : "Use what?",
        //     alreadyInUse : "The item is already in use. Putting item away.",
        //     notReadable : "You can't read that."
        // }
    };

    /**
     * Start the game engine
     */
    // static init () {
    //     // this.initializeCLI();
    //     // this.cli.startCommandListener();
    //     this.initalizePlayer();
    //     this.lookAction();
    // }

    // initializeCLI ( ) {
    //     let outputElement =  $('.commandline');
    //     let inputElement =   $('input');
    //     let cliContainer =   $('#content-inner');
    //     this.cli = new CLI(inputElement, 
    //                              outputElement, 
    //                              cliContainer);
    // }

    // static initalizePlayer () {
    //     this.player = new Player();
    //     this.player = this.player.loadPlayerState();

    //     // This just provides feed back on if the file was loaded from save.
    //     // if ( this.player.gameIsSaved ) { this.cli.output(this.outputList.saveLoaded); }
    // }

    /**
     * Save a current gameState object
     */
    // static saveGame () {
    //     this.player.savePlayerState();
    //     this.cli.output(this.outputList.gameSaved);
    // }

    /**
     * Reset a gameState object
     */
    // static resetGame() {
    //     this.player.resetPlayerState();
    //     this.cli.output(this.outputList.gameReset);
    // };

    // /********* CORE COMMANDS *********/

    // // Outputs a help dialog to the player
    // static printHelp () {
    //     this.cli.output(this.outputList.acceptableCommands);
    //     var acceptedCommands = this.outputList.acceptableCommandList;
    //     for(i = 0; i < acceptedCommands.length; i++) {
    //         this.cli.output(acceptedCommands[i]);
    //     }
    // }

    // static printInventory () {
    //     let inventory = this.player.getPlayerInventory();

    //     if(inventory === undefined || inventory.length == 0) {
	// 		this.cli.output(this.outputList.emptyBag);
	// 	} else {
	// 		this.cli.output(this.outputList.bagContains);
	// 		for(j=0;j<inventory.length;j++) {
	// 			this.cli.output(this.player.inventory[j]);
	// 		}
	// 	}
    // }
    // // Sets the output of items and rooms to verbose mode
    // static setVerboseOutput () {
    //     this.player.setVerboseMode(true);
    //     this.cli.output(this.outputList.verboseMode);
    // }
    // // Sets the output of items and rooms to brief mode
    // static setBriefOutput () {
    //     this.player.setVerboseMode(false);
    //     this.cli.output(this.outputList.briefMode);
    // }

    // static getCurrentRoom () {
    //     return this.player.getCurrentLocation();
    // }
    
    // static getPreviousRoom () {
    //     return this.player.getPreviousLocation();
    // }

    // /********* DIRECTIONAL COMMANDS *********/

    // static lookAction () {

    //     let currentRoom = this.getCurrentRoom();
    //     console.log('FROM Game Engine: ' + JSON.stringify(CLI.roomList));

    //     if( !CLI.roomList[currentRoom].roomIsDark ) {

	// 		CLI.output( roomList[currentRoom].name );
	// 		CLI.output(roomList[currentRoom].look);
		
	// 		this.showItems(roomList[currentRoom]);

	// 	} else if(roomList[currentRoom].roomIsDark && !lantern.itemInUse) {

	// 		CLI.output( roomList[currentRoom].darkText    );

	// 	} else if(roomList[currentRoom].roomIsDark && lantern.itemInUse) {

	// 		CLI.output( roomList[currentRoom].name );
	// 		CLI.output(roomList[currentRoom].look);
		
	// 		this.showItems(roomList[currentRoom]);

	// 	}
    // }

    // static showItems (room) {

    //     var itemlist = [];
	
	// 	for (var i = 0; i < room.items.length; i++) {
	// 		if (room.items[i].specialdesc) 
    //         {
	// 			this.cli.output(room.items[i].specialdesc + "<br>");
	// 		}
	// 		else 
    //         {
	// 			itemlist.push(room.items[i].description);
	// 		}
	// 	}

	// 	if (itemlist.length === 1) 
    //     {
	// 		this.cli.output("There is a " + itemlist[0] + " here.");
	// 	}
	// 	else if (itemlist.length > 1) 
    //     {
	// 		var str = "";
	// 		for (var i = 0; i < itemlist.length; i++) {
	// 			if (!itemlist[i + 1]) {
	// 				str.concat(itemlist[i]);
	// 			}
	// 			else {
	// 				str.concat(itemlist[i] + ", ");
	// 			}
	// 		}
	// 		this.cli.output("There is a " + str + " here.");
	// 	}
    // }

    // static goAction (direction) {

    //     let currentRoom = this.getCurrentRoom();
    //     let lDirection = direction.toLowerCase();

    //     if ( lDirection == "back" ) {
    //         this.player.setCurrentLocation(this.player.getPreviousLocation());
    //         this.player.setPreviousLocation(roomList[currentRoom].varName);
    //         currentRoom = this.getCurrentRoom();
    //     } else {

    //         if (roomList[currentRoom][lDirection] === undefined) 
    //         {
    //             this.cli.output(this.outputList.invalidDirection);
    //             return;
    //         }

    //         this.player.setPreviousLocation(roomList[currentRoom].varName);
    //         this.player.setCurrentLocation(roomList[currentRoom][lDirection].varName);
    //         currentRoom = this.getCurrentRoom();
    //     }

    //     if (this.player.getVerboseMode()){
    //         if (currentRoom.visited) {
    //             this.cli.output("" + roomList[currentRoom].name + "");
    //             this.showItems(roomList[currentRoom]);
    //         }
    //         else {
    //             this.lookAction();
    //             roomList[currentRoom].visited = true;
    //         }
    //     }

    //     else {
    //         this.lookAction();
    //         roomList[currentRoom].visited = true;
    //     }
    // }

    // static openAction (direction) {

    //     if ( direction == "EGG" ) {
    //         this.useAction("EGG");
    //         return;
    //     }

    //     let currentRoom = this.getCurrentRoom();

    //     if (roomList[currentRoom]["open"] === undefined || !roomList[currentRoom]["open"]) 
    //     {
    //         this.cli.output(this.outputList.notOpenable);
    //     }
    //     else 
    //     {

    //     console.log("**GameEngine: Opening room");
    //     this.player.setPreviousLocation(roomList[currentRoom].varName);
    //     this.player.setCurrentLocation(roomList[currentRoom]["open"].varName);
    //     currentRoom = this.getCurrentRoom();

    //         if (this.player.getVerboseMode()){
    //             if (currentRoom.visited) {
    //                 this.cli.output("" + roomList[currentRoom].name + "");
    //                 this.showItems(roomList[currentRoom]);
    //             }
    //             else {
    //                 this.lookAction();
    //                 roomList[currentRoom].visited = true;
    //             }
    //         }

    //         else {
    //             this.lookAction();
    //             roomList[currentRoom].visited = true;
    //         }
    //     }
    // }

    // static takeAction (item) {

    //     let lItem = item.toLowerCase();
    //     let itemObject = itemObjects[lItem];
    //     let currentRoom = this.getCurrentRoom();

    //     if ( !roomList[currentRoom].items.includes(itemObject) ) {
    //         this.cli.output("A "+lItem+" does not exist here.");
    //         return;
    //     }

    //     if ( this.player.inventory[itemObject] ) {
    //         this.cli.output("The "+lItem+" is already in your bag.");
    //         return;
    //     }

    //     this.player.addToInventory(lItem);
    //     this.cli.output("You put the "+lItem+" in your bag.");
  
    // }

    // static readAction (item) {
    //     let lItem = item.toLowerCase();
    //     let itemObject = itemObjects[lItem];

    //     if (!this.player.inventory.includes(lItem))
    //     {
    //         this.cli.output("You don't own a "+lItem+ " to read.");
    //         return;
    //     }

    //     if (!itemObject.actionArray.includes("read"))
    //     {
    //         this.cli.output(this.outputList.notReadable);
    //         return;
    //     }

    //     this.cli.output(itemObject.contents);
    // }

    // static dropAction (item) {

    //     let lItem = item.toLowerCase();
    //     let itemObject = itemObjects[lItem];

    //     if (!this.player.inventory.includes(lItem))
    //     {
    //         this.cli.output("You don't own a "+lItem+ " to drop.");
    //         return;
    //     }

    //     let currentRoom = this.getCurrentRoom();
    //     roomList[currentRoom].items.push(itemObject);

    //     this.player.removeFromInventory(lItem);
    //     this.cli.output("You have dropped the "+lItem);

    // }

    // static useAction (item) {

    //     if ( !item ) {
    //         this.cli.output(this.outputList.notUseable);
    //     }

    //     let lItem = item.toLowerCase();

    //     if (!this.player.getPlayerInventory().includes(lItem)) {
    //         this.cli.output("You don't have a "+lItem+" to use!");
    //     }

    //     if (itemObjects[lItem].inUse) {
    //         this.cli.output(this.outputList.alreadyInUse);
    //         itemObjects[lItem].inUse = false;
    //         this.lookAction();
    //     } else {
    //         if ( lItem == "egg") {
    //             this.cli.output(""+itemObjects[lItem].openDesc+"");
    //             if ( this.getCurrentRoom() == "tree") {
    //                 this.goAction("back");
    //                 return;
    //             }
    //         } else {
    //             this.cli.output(""+itemObjects[lItem].useDesc+"");
    //         }
    //         itemObjects[lItem].inUse = true;
    //         this.lookAction();
    //     }

    // }

}

// $(window).on('load', function() {
//     this.init();
// })
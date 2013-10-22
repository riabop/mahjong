"use strict";

/*

var App = {};

var stage = {
	pieces_width:0;
	pieces_height:0;
	PIECE_WIDTH:80;
	PIECE_HEIGHT:100;
	PIECE_THICKNESS:25;
	create: function(){},
	draw: function(){},
}
*/

var pieces_width = 0;
var pieces_height = 0;
var PIECE_WIDTH = 80;
var PIECE_HEIGHT = 100;
var PIECE_THICKNESS = 25;

/*
	this function draws the pieces, reading the virtual stage
*/
var drawStage = function() {

	console.log("drawStage()");
	var win_w = window.innerWidth;
	var win_h = window.innerHeight;

	PIECE_WIDTH = win_w * 80 / 1240; // 1240 --> 80
	PIECE_HEIGHT = PIECE_WIDTH * 100 / 80; // 840 --> 100  // 80->100 PIECE_WIDTH->x
	PIECE_THICKNESS = PIECE_HEIGHT * 25 / 100;

	// relocate background picture.
	/*
	var obj = document.getElementById("levelPicture");
	//console.log("obj.style.width/2:", obj.clientWidth);
	var x = (win_w / 2) - (obj.clientWidth / 2);
	var y = (win_h / 2) - (obj.clientHeight / 2);
	obj.style.top = y + "px";
	obj.style.left = x + "px";
	*/
	scnarioWidth = pieces_width / 2 * PIECE_WIDTH + PIECE_WIDTH;
	scnarioHeight = pieces_height / 2 * PIECE_HEIGHT + PIECE_HEIGHT;

	//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
	//console.log("pieces_width:",pieces_width,", pieces_height:",pieces_height);
	//console.log("scnarioWidth:",scnarioWidth,", scnarioHeight:",scnarioHeight);

	//var desp_x = 0;
	//var desp_y = 0;
	var desp_x = (win_w / 2) - (scnarioWidth / 2);
	var desp_y = (win_h / 2) - (scnarioHeight / 2);


	var upon_the_screen_x = PIECE_WIDTH / 2;
	var upon_the_screen_y = PIECE_HEIGHT / 2;

	var lon = worldManager.levelPieces.length;
	for (var i = 0; i < lon; i++) {
		var x = escenario1.positions[i].x * upon_the_screen_x + desp_x;
		var y = escenario1.positions[i].y * upon_the_screen_y + desp_y - (PIECE_THICKNESS * escenario1.positions[i].z);
		var objFicha = worldManager.levelPieces[i];
		objFicha.setValues(x, y, PIECE_WIDTH, PIECE_HEIGHT, PIECE_THICKNESS);
		/*
		objFicha.setPosition(x, y);
		objFicha.setWidth(PIECE_WIDTH);
		objFicha.setHeight(PIECE_HEIGHT + PIECE_THICKNESS);
		*/
		//worldManager.levelPieces[i].setThickness(PIECE_THICKNESS); // TODO Altura
	}

}

var scnarioWidth = null;
var scnarioHeight = null;
window.onresize = function(event) {
	//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
	drawStage();
}

/* 
	This function creates a virtual stage reading the world json 
*/
var createStage = function(scn) { // Here the pieces are created, we create new objects
	console.log("createStage()");

	document.getElementById('piecesContainer').innerHTML = ""; //Delete previows content!

	var lon = scn.positions.length;

	for (var i = 0; i < lon; i++) {
		worldManager.levelPieces[i] = new piece(scn.positions[i].pieceType);
		var x = scn.positions[i].x;
		var y = scn.positions[i].y;
		var z = scn.positions[i].z;
		worldManager.levelPieces[i].setMenPosition(x, y, z);
		//worldManager.levelPieces[i].setPosition(x * PIECE_WIDTH, y * PIECE_HEIGHT, z);
		worldManager.levelPieces[i].show();

		if (pieces_width < x) pieces_width = x;
		if (pieces_height < y) pieces_height = y;

	}

	//console.log("pieces_width:",pieces_width,", pieces_height:",pieces_height);
}

var game = {
	firstSelectedPiece: null,
	gameTime: null,
	gameLvel: null,
	init: function() { // atach events to the game interface.
		// <div id="btnCancelGame"></div>
		console.log("game.init() game interface Init");
		var el = document.getElementById("btnCancelGame");
		el.onclick = function() {
			//srceenChooseLevel.hide();
			//srceenMainMenu.show();

			// CANCEL THE GAME and ...

			router.goTo("mainMenu");
		};
	},
	giveMeThePieceType: function(id) {
		var obj = document.getElementById(id);
		return obj.getAttribute("pieceType");
	},
	selectPiece: function(id) {
		var obj = worldManager.giveMeThePiece(id);
		obj.select();
	},
	unSelectPiece: function(id) {
		var obj = worldManager.giveMeThePiece(id);
		obj.unselect();
	},

	destroyPiece: function(id) { // destroy the f***** piece forever!
		console.log("elimina pieza!");
		var obj = worldManager.giveMeThePiece(id);

		//worldManager.levelPieces
		//obj.properties.visible = false;
		obj.kill();
	},
	makeDancePieces: function(id, quantum) {
		/*
		makeDance(id,100);
		makeDance(id,75);
		makeDance(id,50);
		*/
		var obj = worldManager.giveMeThePiece(id);
		console.log("working with the piece: ", obj);
		obj.dance(quantum);
	},
	startGame: function() {
		createStage(escenario1);
		drawStage();
		timeMeter();
	},
	endGame: function() {

	},
	timeIsUp: function() {
		console.log("time is up!");
	},
	showMenu: function() {

	}
}

var actionsManager = {

	pressPiece: function(selected_piece_id, kindOf) {
		console.log("--------------------------------------------");
		console.log("game.firstSelectedPiece:", game.firstSelectedPiece);

		// --- delete this ! ----
		var obj = worldManager.giveMeThePiece(selected_piece_id);
		var donde_x = obj.properties.mem_x;
		var donde_y = obj.properties.mem_y;
		var donde_z = obj.properties.mem_z;
		console.log("-> ", selected_piece_id, " was pressed! xyz:", donde_x, donde_y, donde_z);
		// --- delete this ! ----

		if (game.firstSelectedPiece === null) {

			//if (1) {
			if (!worldManager.isFixed(selected_piece_id)) {

				console.log("(i) Is the first piece");
				game.firstSelectedPiece = selected_piece_id;
				game.selectPiece(selected_piece_id);
			} else {
				// We cant select this piece as the first one.
				// Maybe because it is in the midle of two pieces.
				console.log("We cant select that piece as the first one!");
			}

		} else {

			if (game.firstSelectedPiece == selected_piece_id) {

				console.log("(i) Is the same piece");
				game.unSelectPiece(selected_piece_id);
				game.firstSelectedPiece = null;

			} else {

				console.log("(i) Is another piece");

				var type1 = game.giveMeThePieceType(game.firstSelectedPiece);
				var type2 = game.giveMeThePieceType(selected_piece_id);

				if (type1 === type2) { // Are the pieces a couple?

					console.log("The pieces are conected! Lets try to destroy the pieces ... ");

					if (!worldManager.isFixed(selected_piece_id)) {

						game.destroyPiece(selected_piece_id);
						game.destroyPiece(game.firstSelectedPiece);
						game.firstSelectedPiece = null;

					} else { // we cant destroy te pieces.

						//game.makeDancePieces(game.firstSelectedPiece,100);
						//game.makeDancePieces(selected_piece_id,100);
						console.log("We cant select that piece as the Second one! The piece will not be destroyed.");
					}

				} else {
					console.log("Ups! The pieces are NOT conected!");
					//game.makeDancePieces(selected_piece_id,100);

					if (!worldManager.isFixed(selected_piece_id)) {

						//Unselect the previous selected piece
						game.unSelectPiece(game.firstSelectedPiece);

						//Select the new pieze
						game.firstSelectedPiece = selected_piece_id;
						game.selectPiece(selected_piece_id);
					}

				}

			}

		}

		console.log("game.firstSelectedPiece:", game.firstSelectedPiece);

	}
};

var srceenSplashScreen = {
	init: function() {
		console.log("splashScreen.init()");
	},
	show: function() {

		//this.fadeOut();
	},
	hide: function(wait) {
		var t = setTimeout("srceenSplashScreen.fadeOut()", wait);
	},
	fadeOut: function() {

		var i = 1;
		var animate = function() {
			i -= 0.05;
			if (i < 0) {
				window.cancelAnimationFrame(movId); // TODO Send a callback when finish
				console.log("main menu fade out finished");
				obj.style.display = "none";
				movId = 0;
				//finish();
			} else {
				obj.style.opacity = i;
				//console.log(obj,", ",i);
				movId = window.requestAnimationFrame(animate);
			}
		};

		var obj = document.getElementById("splashScreen");
		var movId = window.requestAnimationFrame(animate);


	}
};

var srceenMainMenu = {
	init: function() { // init wil be executed only once. Here Ill atach events to the buttons

		console.log("srceenMainMenu.init()");

		// attach events to interface buttons

		var el = document.getElementById("btnSound");
		el.onclick = function() {
			console.log("sound off/on");
		};

		var el = document.getElementById("btnPlay");
		el.onclick = function() {
			srceenMainMenu.hide();
			router.goTo("choseLevel");
		};

	},
	show: function() {
		//this.fadeIn();
		console.log("srceenMainMenu.show()");
		var obj = document.getElementById("mainMenu");
		obj.style.opacity = 1;
		obj.style.display = "block";

	},
	hide: function() {
		console.log("srceenMainMenu.hide()");
		/*
		var obj = document.getElementById("mainMenu");
		obj.style.opacity = 0;
		obj.style.display = "none";
		*/
		this.fadeOut();
	},
	fadeOut: function() {
		console.log("srceenMainMenu.fadeOut()");
		var i = 1;
		var animate = function() {

			i -= 0.05;
			if (i < 0) {
				window.cancelAnimationFrame(movId);
				obj.style.display = "none";
				movId = 0;
				console.log("main menu fade out finished!!");
			} else {
				obj.style.opacity = i;
				movId = window.requestAnimationFrame(animate);
			}


		};

		var obj = document.getElementById("mainMenu");
		var movId = window.requestAnimationFrame(animate);
	}
};



var srceenChooseLevel = {
	init: function() { // init wil be executed only once. Here Ill atach events to the buttons
		console.log("srceenChooseLevel.init()");
		var el = document.getElementById("btnReturnToMenu");
		el.onclick = function() {
			srceenChooseLevel.hide();
			//srceenMainMenu.show();
			router.goTo("mainMenu");
		};

		// PlAY LEVEL 1
		var el = document.getElementById("btn_lvl_1");
		el.onclick = function() {
			srceenChooseLevel.hide();
			//srceenMainMenu.show();
			//worldManager.setLevel(1);
			router.goTo("playGame");
			//this.goTo("playGame");
		};
	},
	show: function() {
		console.log("srceenChooseLevel.show()");
		var obj = document.getElementById("chooseLevel");
		obj.style.opacity = 1;
		obj.style.display = "block";
	},
	hide: function() {
		console.log("srceenChooseLevel.hide()");
		var obj = document.getElementById("chooseLevel");
		obj.style.opacity = 0;
		obj.style.display = "none";
		//this.fadeOut();
	},
	fadeOut: function() {
		/*
		var i = 1;
		var animate = function() {
		  	i-=0.05;
		  	if (i < 0) {
		  		window.cancelAnimationFrame(movId); // TODO Send a callback when finish
		  		obj.style.display = "none";
	  			movId = 0;
	  			//finish();
		  	}

		  	obj.style.opacity = i;
		  	//console.log(obj,", ",i);
		  	movId = window.requestAnimationFrame(animate);
		};
		var obj = document.getElementById("mainMenu"); //el; //document.getElementById("splashScreen");
		var movId = window.requestAnimationFrame(animate);
		*/
	}
};

var router = {
	whereTheAppIs: null,
	init: function() {
		srceenMainMenu.init();
		srceenChooseLevel.init();
		game.init();
		this.goTo("splashScreen");
	},
	goTo: function(whereToGo) {
		switch (whereToGo) {
			case "splashScreen":
				console.log("router.splashScreen");
				srceenSplashScreen.hide(2000);
				this.goTo("mainMenu");
				//game.startGame();
				break;

			case "mainMenu":
				console.log("router.mainMenu");
				srceenMainMenu.show();
				break;

			case "choseLevel":
				console.log("router.chooseLevel");
				//this.goTo("playGame");
				srceenChooseLevel.show();
				break;
			case "playGame":
				game.startGame();
				break;
		}
	}

};

router.init();
//game.startGame();


// time is up
// finish
// yow win
// sumary
var dlgFinish = function(){

};

var dlgWin = function(){

};

var dlgSumary = function(){

};
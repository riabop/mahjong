"use strict";

/*
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
 
var drawGameStage = function() {

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
	var scnr = App.world.levels[window.game.level];
	for (var i = 0; i < lon; i++) {
		var x = scnr.positions[i].x * upon_the_screen_x + desp_x;
		var y = scnr.positions[i].y * upon_the_screen_y + desp_y - (PIECE_THICKNESS * scnr.positions[i].z);
		var objFicha = worldManager.levelPieces[i];
		objFicha.setValues(x, y, PIECE_WIDTH, PIECE_HEIGHT, PIECE_THICKNESS);
	}

}

var scnarioWidth = null;
var scnarioHeight = null;
var drawStage = drawGameStage;

window.onresize = function(event) {
	//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
	drawStage();
}

/* 
	This function creates a virtual stage reading the world's json 
*/
var createStage = function(scn) { // Here the pieces are created, we create new objects
	console.log("createStage()");

	document.getElementById('piecesContainer').innerHTML = ""; //Delete previows content!

	var lon = scn.positions.length;
	//console.log("!!!!!!! lin:",lon);

	worldManager.levelPieces= []; // Clear!
	pieces_width = 0;
	pieces_height = 0;

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

App.router.init();

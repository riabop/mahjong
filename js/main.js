"use strict";

	var pieces_width = 0;
	var pieces_height = 0;
	var PIECE_WIDTH = 80;
	var PIECE_HEIGHT = 100;
	var PIECE_THICKNESS = 25;

	/*
		this function draws the pieces, reading the virtual stage
	*/
	var drawStage = function() {

		//console.log("Redraw!");
		var win_w = window.innerWidth;
		var win_h = window.innerHeight;

		PIECE_WIDTH = win_w * 80/1240;   // 1240 --> 80
		PIECE_HEIGHT = PIECE_WIDTH * 100 / 80;  // 840 --> 100  // 80->100 PIECE_WIDTH->x
		PIECE_THICKNESS = PIECE_HEIGHT * 25/100;

		// relocate background picture.
		/*
		var obj = document.getElementById("levelPicture");
		//console.log("obj.style.width/2:", obj.clientWidth);
		var x = (win_w / 2) - (obj.clientWidth / 2);
		var y = (win_h / 2) - (obj.clientHeight / 2);
		obj.style.top = y + "px";
		obj.style.left = x + "px";
		*/
		scnarioWidth = pieces_width/2 * PIECE_WIDTH + PIECE_WIDTH;
		scnarioHeight = pieces_height/2 * PIECE_HEIGHT + PIECE_HEIGHT;

		//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
		//console.log("pieces_width:",pieces_width,", pieces_height:",pieces_height);
		//console.log("scnarioWidth:",scnarioWidth,", scnarioHeight:",scnarioHeight);

		//var desp_x = 0;
		//var desp_y = 0;
		var desp_x = (win_w / 2) - (scnarioWidth / 2);
		var desp_y = (win_h / 2) - (scnarioHeight / 2);


		var upon_the_screen_x = PIECE_WIDTH/2;
		var upon_the_screen_y = PIECE_HEIGHT/2;

		var lon = worldManager.fichasEnJuego.length;
		for (var i = 0; i < lon; i++) {
			var x = escenario1.positions[i].x * upon_the_screen_x + desp_x;
			var y = escenario1.positions[i].y * upon_the_screen_y + desp_y - (PIECE_THICKNESS * escenario1.positions[i].z);
			var objFicha = worldManager.fichasEnJuego[i];
			objFicha.setPosition(x, y);
			objFicha.setWidth(PIECE_WIDTH);
			objFicha.setHeight(PIECE_HEIGHT + PIECE_THICKNESS);
			//worldManager.fichasEnJuego[i].setThickness(PIECE_THICKNESS); // TODO Altura
		}

		//relocateFichas();
	}

	window.onresize = function(event) {
		//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
		drawStage();
	}

	var scnarioWidth = null;
	var scnarioHeight = null;

	/* 
		This function creates a virtual stage reading the world json 
	*/

	var createStage = function(scn) { // Here the pieces are created, we create new objects

		var lon = scn.positions.length;
		for (var i = 0; i < lon; i++) {
			worldManager.fichasEnJuego[i] = new ficha(scn.positions[i].pieceType);
			var x = scn.positions[i].x;
			var y = scn.positions[i].y;
			var z = scn.positions[i].z;
			worldManager.fichasEnJuego[i].setMenPosition(x, y, z);
			//worldManager.fichasEnJuego[i].setPosition(x * PIECE_WIDTH, y * PIECE_HEIGHT, z);
			worldManager.fichasEnJuego[i].show();

			if (pieces_width < x) pieces_width = x;
			if (pieces_height < y) pieces_height = y;
		}

		//console.log("pieces_width:",pieces_width,", pieces_height:",pieces_height);
	}

	var gameStatus = {
		firstSelectedPiece: null,
		gameTime: null,
		gameLvel: null
	}

	var gameOperations = {
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

			//worldManager.fichasEnJuego
			//obj.properties.visible = false;
			obj.kill();
		},
		makeDancePieces: function(id,quantum) {
			/*
			makeDance(id,100);
			makeDance(id,75);
			makeDance(id,50);
			*/
			var obj = worldManager.giveMeThePiece(id);
			console.log("working with the piece: ",obj);
			obj.dance(quantum);
		},
		startGame: function() {

		},
		endGame: function() {

		},
		showMenu: function() {
			
		}
	}


	var actionsManager = {

		pressPiece: function(selected_piece_id, kindOf) {
			console.log("--------------------------------------------");
			console.log("gameStatus.firstSelectedPiece:", gameStatus.firstSelectedPiece);

			// --- delete this ! ----
			var obj = worldManager.giveMeThePiece(selected_piece_id);
			var donde_x = obj.properties.mem_x;
			var donde_y = obj.properties.mem_y;
			var donde_z = obj.properties.mem_z;
			console.log("-> ", selected_piece_id, " was pressed! xyz:", donde_x, donde_y, donde_z);
			// --- delete this ! ----

			if (gameStatus.firstSelectedPiece === null) {

				//if (1) {
				if (!worldManager.isFixed(selected_piece_id)){

					console.log("(i) Es primera pieza");
					gameStatus.firstSelectedPiece = selected_piece_id;
					gameOperations.selectPiece(selected_piece_id);
				} else {
					// We cant select this piece as the first one.
					// Maybe because it is in the midle of two pieces.
					console.log("We cant select that piece as the first one!");
				}

			} else {

				if (gameStatus.firstSelectedPiece == selected_piece_id) {

					console.log("(i) Es la misma pieza");
					gameOperations.unSelectPiece(selected_piece_id);
					gameStatus.firstSelectedPiece = null;

				} else {

					console.log("(i) Es otra pieza");

					var type1 = gameOperations.giveMeThePieceType(gameStatus.firstSelectedPiece);
					var type2 = gameOperations.giveMeThePieceType(selected_piece_id);

					if (type1 === type2) { // Are the pieces a couple?

						console.log("Trying to destroy the pieces! The pieces are conected!");

						if (!worldManager.isFixed(selected_piece_id)) {

							gameOperations.destroyPiece(selected_piece_id);
							gameOperations.destroyPiece(gameStatus.firstSelectedPiece);
							gameStatus.firstSelectedPiece = null;

						} else { // we cant destroy te pieces.

							//gameOperations.makeDancePieces(gameStatus.firstSelectedPiece,100);
							//gameOperations.makeDancePieces(selected_piece_id,100);
							console.log("We cant select that piece as the Second one!");
						}

					} else {
						console.log("Ups! The pieces are NOT conected!");
						//gameOperations.makeDancePieces(selected_piece_id,100);

						if (!worldManager.isFixed(selected_piece_id)) {

							//Unselect the previous selected piece
							gameOperations.unSelectPiece(gameStatus.firstSelectedPiece);

							//Select the new pieze
							gameStatus.firstSelectedPiece = selected_piece_id;
							gameOperations.selectPiece(selected_piece_id);
						}

					}

				}

			}

			console.log("gameStatus.firstSelectedPiece:", gameStatus.firstSelectedPiece);

		}
	};

	createStage(escenario1);
	drawStage();
	thermometer();
	//startGame();

	// End of file
"use strict";

	var pi_ejepcio = 3.16;
	var pi_griego = 3.14;
	var $ = document.getElementById;

	var pieces_width = 0;
	var pieces_height = 0;
	var PIECE_WIDTH = 80;
	var PIECE_HEIGHT = 100;
	var PIECE_THICKNESS = 25; //thickness
	//document.getElementById("mainContainer").innerHTML = "fuck!";

	console.log("fuking javascript!");


	/*
		this function draws the pieces, reading the virtual stage
	*/
	var redrawAll = function() {

		//console.log("Redraw!");
		var win_w = window.innerWidth;
		var win_h = window.innerHeight;

		// relocate background picture.
		/*
		var obj = document.getElementById("levelPicture");
		console.log("obj.style.width/2:", obj.clientWidth);
		var x = (win_w / 2) - (obj.clientWidth / 2);
		var y = (win_h / 2) - (obj.clientHeight / 2);
		obj.style.top = y + "px";
		obj.style.left = x + "px";
		*/

		// paint the pieces
		console.log("scnarioWidth:", scnarioWidth);
		console.log("scnarioHeight:", scnarioHeight);
		var desp_x = 0; //(win_w / 2) - (scnarioWidth / 2);
		var desp_y = 100; //(win_h / 2) - (scnarioHeight / 2);


		var lon = worldManager.fichasEnJuego.length;

		var upon_the_screen_x = PIECE_WIDTH/2;
		var upon_the_screen_y = PIECE_HEIGHT/2;

		for (var i = 0; i < lon; i++) {
			var x = escenario1.positions[i].x * upon_the_screen_x + desp_x;
			var y = escenario1.positions[i].y * upon_the_screen_y + desp_y - (PIECE_THICKNESS * escenario1.positions[i].z);
			worldManager.fichasEnJuego[i].setPosition(x, y);
		}

		//relocateFichas();
	}

	window.onresize = function(event) {
		console.log("width:", window.innerWidth, ", height:", window.innerHeight);
		redrawAll();
	}

	//var  fichasEnJuego = [];
	var scnarioWidth = null;
	var scnarioHeight = null;

	/* 
		This function creates a virtual stage reading the world json 
	*/

	var createScenario = function(scn) { // Here the pieces are created, we create new objects
		"use strict";

		var lon = scn.positions.length;
		for (var i = 0; i < lon; i++) {

			worldManager.fichasEnJuego[i] = new ficha(scn.positions[i].pieceType);

			var x = scn.positions[i].x * PIECE_WIDTH;
			var y = scn.positions[i].y * PIECE_HEIGHT;

			worldManager.fichasEnJuego[i].setPosition(x, y);
			worldManager.fichasEnJuego[i].show();
			//worldManager.fichasEnJuego[i].setX(x); //show();
			//worldManager.fichasEnJuego[i].setY(y);
			worldManager.fichasEnJuego[i].setStatus("ON");

			if (pieces_width < x) pieces_width = x;
			if (pieces_height < y) pieces_height = y;
		}

		scnarioWidth = pieces_width + PIECE_WIDTH;
		scnarioHeight = pieces_height + PIECE_HEIGHT;

	}

	var gameStatus = {
		firstSelectedPiece: null,
		gameTime: null,
		gameLvel: null
	}

	var gameOperations = {
		selectPiece: function(id) {

			//select the piece
			var obj = document.getElementById(id);
			obj.style.border = "3px solid #00FFFF"; //TODO concatenar estilo en vez de toquetearlo!
			obj.style.background = "#99ffff";

		},
		unSelectPiece: function(id) {

			//select the piece
			var obj = document.getElementById(id); //TODO concatenar estilo en vez de toquetearlo!
			obj.style.border = "1px solid #333";
			obj.style.background = "#ccc";

		},
		giveMeThePieceType: function(id) {
			var obj = document.getElementById(id);
			return obj.getAttribute("pieceType");
		},


		// TODO Put this inside the piece code!!!
		destroyPiece: function(id) { // destroy the f***** piece forever!

			console.log("elimina pieza!");
			//var destruction = function(id) {
			/*
				var obj = document.getElementById(id);
				var op = obj.style.opacity;
				op = op - 0.1
				console.log("op:",op);
				obj.style.opacity = op;
				if ( op > 0.5) { 
					var t = setTimeout( gameOperations.destroyPiece(id), 200 ); // TODO this does not run properly
				} else {
					console.log("final!");
				}
			*/
			//} 
			//destruction(id);
			var obj = document.getElementById(id);
			var op = obj.style.opacity;
			obj.style.opacity = 0;
			obj.style.display = "none";
		
		},

		// TODO Put this inside the piece code!!!
		makeDancePieces: function() {

		},
		
		startGame: function() {

		},
		endGame: function() {

		}
	}

	var worldManager = {

		fichasEnJuego: [], 

		/* This function will be used to know when a piece cant be deleted */
		isFixed: function(id) {
			
			console.log ("fichasEnJuego:",this.fichasEnJuego);
			return false;

		}

	};

	var actionsManager = {

		pressPiece: function(selected_piece_id, kindOf) {
			console.log("--------------------------------------------");
			console.log("gameStatus.firstSelectedPiece:", gameStatus.firstSelectedPiece);
			console.log("-> ", selected_piece_id, " was pressed!");

			if (gameStatus.firstSelectedPiece === null) {

				if (1) {
					console.log("(i) Es primera pieza");
					gameStatus.firstSelectedPiece = selected_piece_id;
					gameOperations.selectPiece(selected_piece_id);
				} else {
					// We cant select this piece as the first one.
					// Maybe because it is in the midle of two pieces.
					// Sacudimos la pieza.
				}

			} else {

				if (gameStatus.firstSelectedPiece == selected_piece_id) {

					console.log("(i) Es la misma pieza");
					gameOperations.unSelectPiece(selected_piece_id);
					gameStatus.firstSelectedPiece = null;

				} else {


					console.log("(i) Es otra pieza");

					// ver si son del mismo tipo
					var type1 = gameOperations.giveMeThePieceType(gameStatus.firstSelectedPiece);
					var type2 = gameOperations.giveMeThePieceType(selected_piece_id);

					if (type1 === type2) {

						console.log("INTENTAR DESTRUIR! Son piezas hermanas");

						//Ver si podemos destruir la ficha o esta entre dos piezas

						if (!worldManager.isFixed(selected_piece_id)) { // destruimos las piezas si se puede

							gameOperations.destroyPiece(selected_piece_id);
							gameOperations.destroyPiece(gameStatus.firstSelectedPiece);
							gameStatus.firstSelectedPiece = null;

						} else { // no podemos destruir las piezas. Las sacudimos

						}

					} else {
						console.log("ERROR! No son piezas hermanas");
					}

				}

			}

			console.log("gameStatus.firstSelectedPiece:", gameStatus.firstSelectedPiece);


		}



	};


	createScenario(escenario1);
	redrawAll();
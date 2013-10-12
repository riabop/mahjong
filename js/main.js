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

		PIECE_WIDTH = win_w * 80 / 1240;   // 1240 --> 80
		PIECE_HEIGHT = win_h * 100 / 840;  // 840 --> 100
		PIECE_THICKNESS = PIECE_HEIGHT * 25/100;

		// relocate background picture.
		var obj = document.getElementById("levelPicture");
		//console.log("obj.style.width/2:", obj.clientWidth);
		var x = (win_w / 2) - (obj.clientWidth / 2);
		var y = (win_h / 2) - (obj.clientHeight / 2);
		obj.style.top = y + "px";
		obj.style.left = x + "px";
		
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
			objFicha.setHeight(PIECE_HEIGHT);
			worldManager.fichasEnJuego[i].setThickness(PIECE_THICKNESS); // TODO Altura
		}

		//relocateFichas();
	}

	window.onresize = function(event) {
		//console.log("width:", window.innerWidth, ", height:", window.innerHeight);
		drawStage();
	}

	//var  fichasEnJuego = [];
	var scnarioWidth = null;
	var scnarioHeight = null;

	/* 
		This function creates a virtual stage reading the world json 
	*/

	var createScenario = function(scn) { // Here the pieces are created, we create new objects

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
		destroyPiece: function(id) { // destroy the f***** piece forever!
			console.log("elimina pieza!");
			var obj = worldManager.giveMeThePiece(id);
			obj.kill();

		},

		// TODO Put this inside the piece code!!!
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

		}
	}

	var worldManager = {

		fichasEnJuego: [], 

		/* This function will be used to know when a piece cant be deleted */
		isFixed: function(id) {

			console.log("----------isFixed---------------------------");

			// (1) We get the position of the piece that we wont to destroy.
			var obj = this.giveMeThePiece(id);
			var donde_x = obj.properties.mem_x;
			var donde_y = obj.properties.mem_y;
			var donde_z = obj.properties.mem_z;
			console.log("En popsicion", donde_x, donde_y, donde_z);

			/*
			Once wev got the position we have to generate an array
			with the positions in conflict. lets imagine... for the piece in the position 440
			the array showld be: arr = [ {240},{640},  {441},  {341},{541},  {331},{531},{351},{551}] 
			*/

			// Creamos un array de posiciones de piezas que pueden impedir la seleccion
			var array_of_problems = [];
			// Search for pieces at the left and the right

			/*
				// same z left 
				var ex_x = donde_x -2;
				var ex_y = donde_y;
				var ex_z = donde_z;
				array_of_problems[7]={x:ex_x,y:ex_y,z:ex_z};
				
				// same z right
				var ex_x = donde_x +2
				var ex_y = donde_y;
				var ex_z = donde_z;
				array_of_problems[8]={x:ex_x,y:ex_y,z:ex_z};
			*/

			// Search for pieces over

				// only one over
				var ex_x = donde_x;
				var ex_y = donde_y;
				var ex_z = donde_z+1;
				array_of_problems[0]={x:ex_x,y:ex_y,z:ex_z};

				// two pieces over
				var ex_x = donde_x-1;
				var ex_y = donde_y;
				var ex_z = donde_z+1;
				array_of_problems[1]={x:ex_x,y:ex_y,z:ex_z};

				var ex_x = donde_x+1;
				var ex_y = donde_y;
				var ex_z = donde_z+1;
				array_of_problems[2]={x:ex_x,y:ex_y,z:ex_z};

				// four pieces over
				var ex_x = donde_x-1;
				var ex_y = donde_y-1;
				var ex_z = donde_z+1;
				array_of_problems[3]={x:ex_x,y:ex_y,z:ex_z};

				var ex_x = donde_x+1;
				var ex_y = donde_y-1;
				var ex_z = donde_z+1;
				array_of_problems[4]={x:ex_x,y:ex_y,z:ex_z};

				var ex_x = donde_x-1;
				var ex_y = donde_y+1;
				var ex_z = donde_z+1;
				array_of_problems[5]={x:ex_x,y:ex_y,z:ex_z};

				var ex_x = donde_x+1;
				var ex_y = donde_y+1;
				var ex_z = donde_z+1;
				array_of_problems[6]={x:ex_x,y:ex_y,z:ex_z};


			var lon1 = this.fichasEnJuego.length;
			var lon2 = array_of_problems.length;
			console.log("fichasEnJuego:",lon1, "array_de_problemas:",lon2);

			/*
			for (var j = 0; j < lon2; j++) {
				console.log(array_of_problems[j]);
			}
			*/
			
			for (var i = 0; i < lon1; i++) {
				
				var obj = this.fichasEnJuego[i];
				var donde_x = obj.properties.mem_x;
				var donde_y = obj.properties.mem_y;
				var donde_z = obj.properties.mem_z;
				var donde_visible = obj.properties.visible;

				// fuck!
				var fichas_arriba = false;
				var ficha_derecha = false;
				var ficha_izquierda = false;

				// MIRAR LAS FICHAS DE ARRIBA!

				//console.log(donde_x, ", ", donde_y, ", ", donde_z, ", ", donde_visible);
				//console.log("-<>-Pieza ",i,"-----------------------------------------");
				// ver si alguna de las piezas visibles esta en el array de piezas que pueden impedir la seleccion
				if (donde_visible) {
					
					//console.log(donde_x, ", ", donde_y, ", ", donde_z, ", ", donde_visible);

					for (var j = 0; j < lon2; j++) {
						//console.log(array_of_problems[j]);
						
						/*
						console.log(donde_x, ", ", donde_y, ", ", donde_z, ", ", donde_visible);
						console.log(array_of_problems[j].x, ", ", array_of_problems[j].y, ", ", array_of_problems[j].z );
						console.log( donde_x==array_of_problems[j].x , ", ", donde_y==array_of_problems[j].y , ", ", donde_y==array_of_problems[j].z );
						*/

						if ( donde_x==array_of_problems[j].x && donde_y==array_of_problems[j].y && donde_z==array_of_problems[j].z ){ 
							//fichas_arriba = true;
							console.log("-> Arriba SI hay fichas!");
							return true;
						} else {
							console.log("-> Arriba NO hay fichas!");
						}

					}	
				}

				// MIRAR LAS FICHAS DE LOS LADOS

				// same z left 
				var ex_x = donde_x -2;
				var ex_y = donde_y;
				var ex_z = donde_z;
				array_of_problems[7]={x:ex_x,y:ex_y,z:ex_z};

				if ( donde_x==array_of_problems[7].x && donde_y==array_of_problems[7].y && donde_z==array_of_problems[7].z ){ 
					ficha_izquierda = true;
					console.log("-> A la izquierda SI hay ficha!");
				}else{
					console.log("-> A la izquierda NO hay ficha!");
				}

				// same z right
				var ex_x = donde_x +2
				var ex_y = donde_y;
				var ex_z = donde_z;
				array_of_problems[8]={x:ex_x,y:ex_y,z:ex_z};

				if ( donde_x==array_of_problems[8].x && donde_y==array_of_problems[8].y && donde_z==array_of_problems[8].z ){ 
					ficha_derecha = true;
					console.log("-> A la derecha SI hay ficha!");
				}else{
					console.log("-> A la derecha NO hay ficha!");
				}

				if (ficha_izquierda == true && ficha_derecha == true){
					console.log("-> A derecha e izquierda SI hay ficha!");
					return true;
				} else {
					console.log("-> Solo hay pieza enun lado a derecha o izquierda!");
				}

			};

			return false;
		},
		giveMeThePiece: function( desired_id ){

			var lon = this.fichasEnJuego.length;
			//console.log("fichasEnJuego:",lon);
			for (var i = 0; i < lon; i++) {
				if (this.fichasEnJuego[i].properties.id == desired_id){
					//console.log("Desired piece will be returned!");
					return this.fichasEnJuego[i];
				}
			};

			return null; // The desired piece id wasn't found in the world!	

		}

	};

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
					// Sacudimos la pieza.
					console.log("We cant select that piece as the first one!");
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

						console.log("Trying to destroy the pieces! The pieces are conected!");

						//Ver si podemos destruir la ficha o esta entre dos piezas

						if (!worldManager.isFixed(selected_piece_id)) { // destruimos las piezas si se puede

							gameOperations.destroyPiece(selected_piece_id);
							gameOperations.destroyPiece(gameStatus.firstSelectedPiece);
							gameStatus.firstSelectedPiece = null;

						} else { // no podemos destruir las piezas. Las sacudimos

							//gameOperations.makeDancePieces(gameStatus.firstSelectedPiece,100);
							//gameOperations.makeDancePieces(selected_piece_id,100);
							console.log("We cant select that piece as the Second one!");
						}

					} else {
						console.log("Ups! The pieces are NOT conected!");
						//gameOperations.makeDancePieces(selected_piece_id,100);
					}

				}

			}

			console.log("gameStatus.firstSelectedPiece:", gameStatus.firstSelectedPiece);

		}
	};

	createScenario(escenario1);
	drawStage();
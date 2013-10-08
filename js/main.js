	var pi_ejepcio = 3.16;
	var pi_griego = 3.14;
	var $ = document.getElementById;

	//document.getElementById("mainContainer").innerHTML = "fuck!";

	console.log("fuking javascript!");	

	var redrawAll = function(){

		//console.log("Redraw!");
		win_w = window.innerWidth;
		win_h = window.innerHeight;

		// relocate background picture.
		var obj = document.getElementById("levelPicture");
		console.log("obj.style.width/2:",obj.clientWidth);
		var x = (win_w/2) - (obj.clientWidth/2);
		var y = (win_h/2) - (obj.clientHeight/2);
		obj.style.top = y+"px";
		obj.style.left = x+"px";

		// paint the pieces
		console.log("scnarioWidth:",scnarioWidth);
		console.log("scnarioHeight:",scnarioHeight);
		var desp_x = (win_w/2)-(scnarioWidth/2);
		var desp_y = (win_h/2)-(scnarioHeight/2);


		var lon = fichasEnJuego.length;
		for (var i = 0; i < lon; i++){
			var x=escenario1.positions[i].x * 80 + desp_x;
			var y=escenario1.positions[i].y * 100 + desp_y; 
			fichasEnJuego[i].setPosition(x,y);
		}

		//relocateFichas();
	}

	window.onresize = function(event) {
	    console.log("width:",window.innerWidth,", height:", window.innerHeight);
	    redrawAll();
	}

	var fichasEnJuego=[];
	var scnarioWidth = null;
	var scnarioHeight = null;

	var createScenario = function(scn){ // Here the pieces are created, we create new objects

		var pieces_width = 0;
		var pieces_height = 0;

		var lon = scn.positions.length;
		for (var i=0; i<lon; i++){

			fichasEnJuego[i] = new ficha(scn.positions[i].pieceType);
			//console.log("scn.positions.model:",scn.positions.model);


			var x= scn.positions[i].x * 80;
			var y= scn.positions[i].y * 100; 
			fichasEnJuego[i].setPosition(x,y);
			fichasEnJuego[i].show();

			if (pieces_width < x) pieces_width = x;
			if (pieces_height < y) pieces_height = y;
		}

		scnarioWidth = pieces_width + 80;
		scnarioHeight = pieces_height + 100;

	}

	var gameStatus = {
		firstSelectedPiece: null,
		gameTime: null,
		gameLvel: null
	}

	var gameOperations = {
		selectPiece: function(id){

			//select the piece
			var obj = document.getElementById(id); 
			obj.style.border = "3px solid #00FFFF"; //TODO concatenar estilo en vez de toquetearlo!
			obj.style.background = "#99ffff";

		},
		unSelectPiece: function (id){

			//select the piece
			var obj = document.getElementById(id);  //TODO concatenar estilo en vez de toquetearlo!
			obj.style.border = "1px solid #333";
			obj.style.background = "#ccc";

		},
		giveMeThePieceType: function(id){
			var obj = document.getElementById(id); 
			return obj.getAttribute("pieceType");
		},
		destroyPiece: function(id){ // destroy the f***** piece forever!

			console.log("elimina pieza!");
			//var destruction = function(id) {
				console.log("destruyendo ..."); 
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
				
			//} 
			//destruction(id);

		},
		makeDancePieces: function(){

		},
		startGame: function(){

		},
		endGame: function(){

		}
	}

	var actionsManager = {

		pressPiece: function(id, kindOf){
			console.log("--------------------------------------------");
			console.log("gameStatus.firstSelectedPiece:",gameStatus.firstSelectedPiece);
			console.log("-> ",id, " was pressed!");

			if (gameStatus.firstSelectedPiece === null){

					console.log ("(i) Es primera pieza");
					gameStatus.firstSelectedPiece = id;
					gameOperations.selectPiece(id);

			} else {

				if ( gameStatus.firstSelectedPiece == id ){

					console.log ("(i) Es la misma pieza");
					gameOperations.unSelectPiece(id);
					gameStatus.firstSelectedPiece = null;

				} else {


					console.log ("(i) Es otra pieza");

					// ver si son del mismo tipo
					var type1 = gameOperations.giveMeThePieceType(gameStatus.firstSelectedPiece);
					var type2 = gameOperations.giveMeThePieceType(id);

					if (type1 === type2){
						
						console.log("INTENTAR DESTRUIR! Son piezas hermanas");

						//Ver si podemos destruir la ficha o esta impedida 
						if (1) { // destruimos las piezas

							gameOperations.destroyPiece(id);

						} else { // no podemos destruir las piezas

						}

					}else{
						console.log("ERROR! No son piezas hermanas");
					}



				}

			}

			console.log("gameStatus.firstSelectedPiece:",gameStatus.firstSelectedPiece);


		}



	}; 


	createScenario(escenario1);
	redrawAll();

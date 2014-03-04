"use strict";

var game = {
	firstSelectedPiece: null,
	gameTime: null,
	level: null, //escenario1,
	timer: null,
	init: function() { // atach events to the game interface.

		console.log("game.init() game interface Init");
		
		var el = document.getElementById("btnCancelGame");
		el.onclick = function() {
			game.cancelGame();
		};

		this.timer = new App.timeMeter();
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

		console.log("game.startGame()");
		this.firstSelectedPiece = null;

		//createStage(escenario1);
		createStage(App.world.levels[window.game.level]);
		drawStage();

		//var timer = new App.timeMeter();
		this.timer.reset(App.world.levels[window.game.level].time);
		this.timer.start();
	},
	cancelGame: function() {
		//App.timeMeter.reset(); //TODO
		App.router.goTo("mainMenu");
	},
	timeIsUp: function() {
		console.log("time is up!");
	},
	over: function() {

		console.log("The game was over!");
		this.timer.pause();

		/*
		status.stars = stars;
		status.totalTime = totalTime;
		status.nowTime = nowTime;
		*/

		var i = this.timer.getStatus();
		console.log(i);

		//App.dlgSumary.show();

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

		var continuePlaying = worldManager.countAvailablePieces();
		console.log("continuePlaying:", continuePlaying);

		if (continuePlaying < 2){
			console.log("The game is over!");
			
			App.dlgSummary.onAccept = function(){
				//srceenMainMenu.hide();
				//App.router.goTo("choseLevel");
				App.router.goTo("mainMenu");
				this.hide();
			};
			
			App.dlgSummary.show();

		}

	}
};
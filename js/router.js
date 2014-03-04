"use strict";

var App = {};

App.router = {
	whereTheAppIs: null,
	init: function() {
		srceenMainMenu.init();
		srceenChooseLevel.init();
		game.init();

		App.dlg.init(); // attach a behaviour to the dialog's buttons
		App.dlgSummary.init(); // attach a behaviour to the dialog's buttons

		this.goTo("splashScreen");
	},
	goTo: function(whereToGo) {

		switch (whereToGo) {
			case "splashScreen":

				console.log("router.splashScreen");
				srceenSplashScreen.hide(1000);

				// --- ini --- dlg example!

				/*
				App.dlg.setMessage("This game is cool!");

				App.dlg.onCancel = function(){
					srceenMainMenu.hide();
					App.router.goTo("choseLevel");
					this.hide();
				};
				
				App.dlg.onAccept = function(){
					this.hide();
				};

				//App.dlg.show();
				*/

				/*
				App.dlgSummary.onAccept = function(){
					//srceenMainMenu.hide();
					//App.router.goTo("choseLevel");
					this.hide();
				};
				App.dlgSummary.show();
				*/

				// --- fin --- dlg example!

				this.goTo("mainMenu");
				break;

			case "mainMenu":
				console.log("router.mainMenu");
				srceenMainMenu.show();
				break;

			case "choseLevel":
				drawStage = srceenChooseLevel.draw; //drawLevelsMenu;
				console.log("router.chooseLevel");
				srceenChooseLevel.show();
				break;

			case "playGame":
				drawStage = drawGameStage; // on resizing the drawStage function is called 
				game.startGame();
				break;

			case "aboutThisGame":
				console.log("router.aboutThisGame");
				break;

		}
	}

};
"use strict";

var App = {};

App.router = {
	whereTheAppIs: null,
	init: function() {
		srceenMainMenu.init();
		srceenChooseLevel.init();
		game.init();
		App.dlg.init();
		this.goTo("splashScreen");
	},
	goTo: function(whereToGo) {
		switch (whereToGo) {
			case "splashScreen":
				console.log("router.splashScreen");
				srceenSplashScreen.hide(1000);

				App.dlg.setMessage("This game is cool!");

				App.dlg.onCancel = function(){
					srceenMainMenu.hide();
					App.router.goTo("choseLevel");
					this.hide();
				};
				
				App.dlg.onAccept = function(){
					this.hide();
				};

				App.dlg.show();

				this.goTo("mainMenu");
				break;

			case "mainMenu":
				console.log("router.mainMenu");
				srceenMainMenu.show();
				break;

			case "choseLevel":
				console.log("router.chooseLevel");
				srceenChooseLevel.show();
				break;

			case "playGame":
				game.startGame();
				break;

			case "aboutThisGame":
				console.log("router.aboutThisGame");
				break;

		}
	}

};
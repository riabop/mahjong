"use strict";

var App = {};

App.router = {
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
				srceenSplashScreen.hide(1000);
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
		}
	}

};
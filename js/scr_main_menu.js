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
			App.router.goTo("choseLevel");
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
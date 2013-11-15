
"use strict";

var menuOption = function(num) {

	var menuOption = function(num) {
		console.log("menuOption("+num+")");
		drawTemplate(num);
		var el = document.getElementById("btn_lvl_"+num);
		el.onclick = function() {
			var id = el.getAttribute("id");
			var levelNumber = el.getAttribute("level");
			window.game.level = levelNumber;
			srceenChooseLevel.hide();
			App.router.goTo("playGame");
		};
	};
	var drawTemplate = function(i) {
		console.log("drawTemplate()");
		var content = '<div id="btn_lvl_'+ i +'" class="btnLvl" level="'+ i +'">Level '+ i +'</div>';
		document.getElementById("ch-btns-container").insertAdjacentHTML('beforeend', content);
	};

	menuOption(num);
};

var srceenChooseLevel = {

	init: function() { // init wil be executed only once. Here Ill atach events to the buttons
		console.log("srceenChooseLevel.init()");
		var el = document.getElementById("btnReturnToMnu");

		el.onclick = function() {
			srceenChooseLevel.hide();
			App.router.goTo("mainMenu");
		};

		var lon = App.world.levels.length;
		for (var i = 0; i < lon; i++) new menuOption(i);

	},
	show: function() {
		console.log("srceenChooseLevel.show()");
		var obj = document.getElementById("chooseLevel");
		obj.style.opacity = 1;
		obj.style.display = "block";
	},
	hide: function() {
		console.log("srceenChooseLevel.hide()");
		var obj = document.getElementById("chooseLevel");
		obj.style.opacity = 0;
		obj.style.display = "none";
		//this.fadeOut();
	},
	fadeOut: function() {
		/*
		var i = 1;
		var animate = function() {
		  	i-=0.05;
		  	if (i < 0) {
		  		window.cancelAnimationFrame(movId); // TODO Send a callback when finish
		  		obj.style.display = "none";
	  			movId = 0;
	  			//finish();
		  	}

		  	obj.style.opacity = i;
		  	//console.log(obj,", ",i);
		  	movId = window.requestAnimationFrame(animate);
		};
		var obj = document.getElementById("mainMenu"); //el; //document.getElementById("splashScreen");
		var movId = window.requestAnimationFrame(animate);
		*/
	}
};
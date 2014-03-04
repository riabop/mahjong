
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

		var el = document.getElementById("btn-ch-ReturnToMnu");
		el.onclick = function() {
			console.log("----------return()------------");
			srceenChooseLevel.hide();
			App.router.goTo("mainMenu");
		};

		var lon = App.world.levels.length;
		for (var i = 0; i < lon; i++) new menuOption(i);

		//this.draw();

	},
	show: function() {
		console.log("srceenChooseLevel.show()");
		var obj = document.getElementById("chooseLevel");
		obj.style.opacity = 1;
		obj.style.display = "block";
		this.draw();
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
	},
	draw: function(){

		var win_w = window.innerWidth;
		var win_h = window.innerHeight;

		console.log("srceenChooseLevel.drawLevelsMenu()");
		var lon = App.world.levels.length;

		// Logo and title
		var logoLong = 350;
		var optionsContainner = document.getElementById("ch-title").style.top = 10 + "px";
		var optionsContainner = document.getElementById("ch-title").style.left = win_w/2-logoLong/2 + "px";

		// button´s containner
		var optionsContainner = document.getElementById("ch-btns-container").style.width = win_w - 200 + "px";
		var optionsContainner = document.getElementById("ch-btns-container").style.height = win_h - 200 + "px";
		var optionsContainner = document.getElementById("ch-btns-container").style.backgroundColor="#00ff00";
		var optionsContainner = document.getElementById("ch-btns-container").style.top = 100 + "px";
		var optionsContainner = document.getElementById("ch-btns-container").style.left = 100 + "px";

		// for each picture in the menu
		for (var i = 0; i < lon; i++){

			// calculate
			var w_lim = document.getElementById("ch-btns-container").offsetWidth;
			var h_lim = document.getElementById("ch-btns-container").offsetHeight;
			//console.log("w_lim:"+w_lim +", h_lim:"+h_lim);

			var h = h_lim;
			var w = 800 * h_lim / 1000;

			if (w * 3 >= w_lim ){
				w = w_lim/3;
				h = 1000 * w / 800;
			}

			var t = (h_lim/2) - (h/2); 
			//var l = (w_lim/2) - (w/2);
			
			var margin = 10;
			var margins = (lon-1) * margin;
			var buttonsWidth = (w * lon) + margins;
			var positionZero = (w_lim - buttonsWidth) /2;
			var stepLon = w + margin;

			var l = positionZero + (i * stepLon);

			document.getElementById("btn_lvl_"+i).style.top = t + "px";
			document.getElementById("btn_lvl_"+i).style.left = l + "px";

			// assign the styles
			var menuOptionHtml = document.getElementById("btn_lvl_"+i).style.height = h + "px"; 
			var menuOptionHtml = document.getElementById("btn_lvl_"+i).style.width = w + "px"; 
			var img = "imgs/menu/"+ App.world.levels[i].facePicture; //"lake.png";
			var menuOptionHtml = document.getElementById("btn_lvl_"+i).style.backgroundImage="url('"+img+"')";
		}

		// return button position
		var buttonLong = document.getElementById("btn-ch-ReturnToMnu").offsetWidth;
		var optionsContainner = document.getElementById("btn-ch-ReturnToMnu").style.left = win_w/2-buttonLong/2 + "px";
	}

};
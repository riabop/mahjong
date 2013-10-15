"use strict";

var timeMeter = function (){

	var createID = function(){
		var timestamp = new Date().getTime();
		var randomNumber = Math.ceil(Math.random()*100000);
		return type + "_" + timestamp + "_" + randomNumber;	
	};
	
	var type = "timeMeter";
	var ID = createID();
	var el = null;


	

	var timeMeter = function(pieceType,self){
		console.log("initialize object ", ID);
		drawTemplate();
		start();

		/*
		el = document.getElementById(ID);
		self.properties.el = el;
		el.onclick = function(){
			var id = el.getAttribute("id");
			window.actionsManager.pressPiece(id);
		};
		*/
	};

	var drawTemplate = function(){
		//document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="ficha" style="top:0px; left:0px; display:none; opacity:1"> [' + pieceType+ '] </div>');
		//var content = '<div id="'+ ID +'" type="'+type+'" class="timeMeter" style=" top:0px; left:0px; opacity:1 "></div>';
		//document.getElementById('timeMeterContainer').innerHTML += content;
	};

	var movId;
	var j= 400;

	var animate = function(time)  {

	  	j-=5;
	  	if (j < 0) {
	  		//console.log("Time is up!");
	  		game.timeIsUp();
	  		stop();
	  	}

	  	document.getElementById("time").style.height=j + "px";
	  	movId = window.requestAnimationFrame(animate);
	};

	var start = function() {
	  	movId = window.requestAnimationFrame(animate);
	};

	var stop = function() {
	  	if (movId)
	    window.cancelAnimationFrame(movId);
	  	movId = 0;
	}

	timeMeter(this);

}
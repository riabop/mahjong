"use strict";

var thermometer = function (){


	
	var type = "thermometer";
	var ID = createID();
	var el = null;

	this.properties = {
		id: ID,
		el: null
	}

	var thermometer = function(pieceType,self){
		console.log("initialize object ", ID);
		drawTemplate();

		/*
		el = document.getElementById(ID);
		self.properties.el = el;
		el.onclick = function(){
			var id = el.getAttribute("id");
			window.actionsManager.pressPiece(id);
		};
		*/
	}
	
	var drawTemplate = function(){
		//document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="ficha" style="top:0px; left:0px; display:none; opacity:1"> [' + pieceType+ '] </div>');
		var content = '<div id="'+ ID +'" type="'+type+'" class="thermometer" style=" top:0px; left:0px; opacity:1 "></div>';
		document.getElementById('thermometerContainer').innerHTML += content;
	}

	var createID = function(){
		var timestamp = new Date().getTime();
		var randomNumber = Math.ceil(Math.random()*100000);
		return type + "_" + timestamp + "_" + randomNumber;	
	}	

	thermometer(this);

}
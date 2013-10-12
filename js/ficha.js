"use strict";

var ficha = function (pieceType){

	var createID = function(){
		var timestamp = new Date().getTime();
		var randomNumber = Math.ceil(Math.random()*100000);
		return type + "_" + timestamp + "_" + randomNumber;	
	}
	
	var type = "ficha";
	var ID = createID();
	var el = null;

	this.properties = {
		id: ID,
		el: null,
		visible: true,
		screen_x:null,
		screen_y:null,
		screen_z:null,
		mem_x:null,
		mem_y:null,
		mem_z:null
	}

	// Funcion privada
	var ficha = function(pieceType,self){
		console.log("inicializado objeto ", ID);
		drawTemplate();
		el = document.getElementById(ID);
		//console.log("this.el",el);

		self.properties.el = el;

		el.onclick = function(){
			//console.log(ID,"onClick!");
			//console.log("el",el);

			// get id
			var id = el.getAttribute("id");
			window.actionsManager.pressPiece(id);
		};
	}
	
	var drawTemplate = function(){
		//console.log("dibuja!");	
		//document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="ficha" style="top:0px; left:0px; display:none; opacity:1"> [' + pieceType+ '] <div class="mini-info">' + ID +'</div></div>');
		document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="ficha" style="top:0px; left:0px; display:none; opacity:1"> [' + pieceType+ '] <div class="mini-info">' + ID +'</div></div>');
	}

	this.oculta = function(){
		//console.log("oculta!");	
	}

	this.getType = function(){
		return pieceType;
	};

	this.selectTicha = function(){
		console.log("select ".el);
		el.style.border = "3px solid blue";
	};

	this.unselect = function(){
		
	};

	this.setPosition = function(x,y,z){
		
		el.style.top = y+"px";
		el.style.left = x+"px";

		this.properties.screen_x = x;
		this.properties.screen_y = y;
		this.properties.screen_z = z;
	};

	this.setMenPosition = function(x,y,z){
		this.properties.mem_x = x;
		this.properties.mem_y = y;
		this.properties.mem_z = z;
	};

	this.setWidth = function(w){
		el.style.width = w+"px";
	}

	this.setHeight = function(h){
		el.style.height = h+"px";
	}
	
	this.setStatus = function(status){
		// ON or visible... 
	};

	this.setThickness = function(t){
		console.log("t:",t);
		el.style.borderBottom = t + "px solid #ddd";
	}

	this.show = function(){
		el.style.display = null;
		this.properties.visible = true;
	}

	this.hide = function(){
		el.style.display = "none";
		this.properties.visible = false;
	}

	this.kill = function(){
		//console.log("this.kill");
		this.hide();
	}

	this.dance = function(quantum){
		console.log("This piece is dancing ",quantum);
	}
	
	ficha(pieceType,this);
	//console.log("pieceType:",pieceType);
}
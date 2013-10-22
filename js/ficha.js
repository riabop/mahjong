"use strict";

var piece = function(pieceType) {

	var createID = function() {
		var timestamp = new Date().getTime();
		var randomNumber = Math.ceil(Math.random() * 100000);
		return type + "_" + timestamp + "_" + randomNumber;
	};


	var type = "piece";
	var el = null;
	var ID = createID();
	var img = null;

	this.properties = {
		id: ID,
		el: null,
		visible: true,
		screen_x: null,
		screen_y: null,
		screen_z: null,
		mem_x: null,
		mem_y: null,
		mem_z: null
	};

	var piece = function(pieceType, self) {

		console.log("initialize object ", ID);
		drawTemplate();
		el = document.getElementById(ID);
		img = el.childNodes[0]; //child[0];
		self.properties.el = el;

		el.onclick = function() {
			var id = el.getAttribute("id");
			window.actionsManager.pressPiece(id);
		};
	};

	var drawTemplate = function() {
		//document.write('<div id="'+ ID +'" pieceType="'+pieceType+'" class="piece" style="top:0px; left:0px; display:none; opacity:1"> [' + pieceType+ '] </div>');
		var content = '<div id="' + ID + '" pieceType="' + pieceType + '" class="piece" style="top:0px; left:0px; display:none; opacity:1"><div id="pieceImage" class="pieceImage"></div> [' + pieceType + '] </div>';
		//document.getElementById('piecesContainer').innerHTML += content;
		document.getElementById('piecesContainer').insertAdjacentHTML('beforeend', content); //appendChild(content);
	};

	this.oculta = function() {
		//console.log("oculta!");	
	};

	this.getType = function() {
		return pieceType;
	};

	/*
	this.selectTicha = function(){
		console.log("select ".el);
		el.style.border = "3px solid blue";
	};

	this.unselect = function(){
		
	};
	*/

	this.setPosition = function(x, y, z) {
		el.style.top = y + "px";
		el.style.left = x + "px";
		this.properties.screen_x = x;
		this.properties.screen_y = y;
		this.properties.screen_z = z;
	};

	this.setMenPosition = function(x, y, z) {
		this.properties.mem_x = x;
		this.properties.mem_y = y;
		this.properties.mem_z = z;
	};

	this.setWidth = function(w) {
		el.style.width = w + "px";
	};
	/*
	this.setImage = function(w){
		img.style.backgroundSize= w * 9 + "px auto";
		img.style.backgroundPosition= -w * pieceType + "px 0";
	};
	*/

	this.setHeight = function(h) {
		el.style.height = h + "px";
	};

	this.setThickness = function(t) {
		console.log("t:", t);
		el.style.borderBottom = t + "px solid #ddd";
	};

	this.setValues = function(x, y, w, h, t) {
		this.setPosition(x, y);
		this.setWidth(w);
		this.setHeight(h + t);
		img.style.backgroundSize = w * 9 + "px " + (h + t) * 6 + "px ";
		img.style.backgroundPosition = -w * pieceType + "px 0";
		img.style.height = h + "px ";
	};

	this.select = function(h) {
		el.style.backgroundPosition = "0 29.5%"; //"position";
	};

	this.unselect = function(h) {
		//el.style.height = h+"px";
		el.style.backgroundPosition = "0 0";
	};

	this.show = function() {
		el.style.display = null;
		this.properties.visible = true;
	};

	this.hide = function() {
		el.style.display = "none";
		this.properties.visible = false;
	};

	this.kill = function() {
		//console.log("this.kill");
		this.hide();
	};

	this.dance = function(quantum) {
		console.log("This piece is dancing ", quantum);
	};

	piece(pieceType, this);

};
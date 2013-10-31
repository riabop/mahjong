"use strict";

var worldManager = {

	levelPieces: [],

	/* This function will be used to know when a piece cant be deleted */
	isFixed: function(id) {

		console.log("----------isFixed---------------------------");

		// (1) We get the position of the piece that we want to destroy.
		var obj = this.giveMeThePiece(id);
		var selectedPiece_x = obj.properties.mem_x;
		var selectedPiece_y = obj.properties.mem_y;
		var selectedPiece_z = obj.properties.mem_z;

		/*
		Once wev got the position we have to generate an array with the positions in conflict.
		Lets imagine... for the piece in the position 440 the array showld be: 
		arr = [ {240},{640},  {441},  {341},{541},  {331},{531},{351},{551}, ... ] 
		*/

		var arr_pieces_over_the_selected = [];

		// Search for pieces over

		var ex_x = null,
			ex_y = null,
			ex_z = null;

		ex_x = selectedPiece_x; // only one over
		ex_y = selectedPiece_y;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[0] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x - 1; // two pieces over
		ex_y = selectedPiece_y;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[1] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x + 1;
		ex_y = selectedPiece_y;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[2] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x - 1; // four pieces over
		ex_y = selectedPiece_y - 1;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[3] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x + 1;
		ex_y = selectedPiece_y - 1;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[4] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x - 1;
		ex_y = selectedPiece_y + 1;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[5] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};

		ex_x = selectedPiece_x + 1;
		ex_y = selectedPiece_y + 1;
		ex_z = selectedPiece_z + 1;
		arr_pieces_over_the_selected[6] = {
			x: ex_x,
			y: ex_y,
			z: ex_z
		};


		var lon1 = this.levelPieces.length;
		var lon2 = arr_pieces_over_the_selected.length;

		/*
		console.log("levelPieces:",lon1, "array_de_problemas:",lon2);
		for (var j = 0; j < lon2; j++) {
			console.log(arr_pieces_over_the_selected[j]);
		}
		*/

		var rightPiece = 0;
		var leftPiece = 0;

		for (var i = 0; i < lon1; i++) {

			var obj = this.levelPieces[i];
			var where_x = obj.properties.mem_x;
			var where_y = obj.properties.mem_y;
			var where_z = obj.properties.mem_z;
			var where_visible = obj.properties.visible;


			// Searching for pieces upon the selected ...

			//console.log("-----> ",where_x, ", ", where_y, ", ", where_z, ", ", where_visible);
			
			// We need to know if we've got pieces around the selected one in order to cancel the selecting piece process.
			if (where_visible) {

				//console.log(where_x, ", ", where_y, ", ", where_z, ", ", where_visible);

				for (var j = 0; j < lon2; j++) {
					//console.log(arr_pieces_over_the_selected[j]);

					/*
					console.log(where_x, ", ", where_y, ", ", where_z, ", ", where_visible);
					console.log(arr_pieces_over_the_selected[j].x, ", ", arr_pieces_over_the_selected[j].y, ", ", arr_pieces_over_the_selected[j].z );
					console.log( where_x==arr_pieces_over_the_selected[j].x , ", ", where_y==arr_pieces_over_the_selected[j].y , ", ", where_y==arr_pieces_over_the_selected[j].z );
					*/

					if (where_x == arr_pieces_over_the_selected[j].x && where_y == arr_pieces_over_the_selected[j].y && where_z == arr_pieces_over_the_selected[j].z) {
						//console.log("-> There are upper pieces!");
						return true;
					} else {
						//console.log("-> There aren't upper pieces!");
					}

				}

				// Searching for pieces on the right and left ...

				// same z left 
				var ex_x = selectedPiece_x - 2;
				var ex_y = selectedPiece_y;
				var ex_z = selectedPiece_z;
				//arr_pieces_over_the_selected[7]={x:ex_x,y:ex_y,z:ex_z};

				//console.log("left ---> arr_pieces_over_the_selected[7]:",arr_pieces_over_the_selected[7]);

				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					leftPiece++;
					//console.log("-> There is a piece at the left!");
				} else {
					//console.log("-> There isn't a piece at the left!");
				}

				var ex_x = selectedPiece_x - 2;
				var ex_y = selectedPiece_y - 1;
				var ex_z = selectedPiece_z;
				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					leftPiece++;
					//console.log("-> There is a piece at the left!");
				} else {
					//console.log("-> There isn't a piece at the left!");
				}

				var ex_x = selectedPiece_x - 2;
				var ex_y = selectedPiece_y + 1;
				var ex_z = selectedPiece_z;
				//arr_pieces_over_the_selected[7]={x:ex_x,y:ex_y,z:ex_z};

				//console.log("left ---> arr_pieces_over_the_selected[7]:",arr_pieces_over_the_selected[7]);

				//if ( where_x == arr_pieces_over_the_selected[7].x && where_y == arr_pieces_over_the_selected[7].y && where_z == arr_pieces_over_the_selected[7].z ){ 
				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					leftPiece++;
					//console.log("-> There is a piece at the left!");
				} else {
					//console.log("-> There isn't a piece at the left!");
				}

				// same z right
				var ex_x = selectedPiece_x + 2
				var ex_y = selectedPiece_y;
				var ex_z = selectedPiece_z;
				//arr_pieces_over_the_selected[8]={x:ex_x,y:ex_y,z:ex_z};

				//console.log("left ---> arr_pieces_over_the_selected[8]:",arr_pieces_over_the_selected[8]);

				//if ( where_x == arr_pieces_over_the_selected[8].x && where_y == arr_pieces_over_the_selected[8].y && where_z == arr_pieces_over_the_selected[8].z ){ 
				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					rightPiece++;
					//console.log("-> There is a piece at the right!");
				} else {
					//console.log("-> There isn't a piece at the right!");
				}

				var ex_x = selectedPiece_x + 2
				var ex_y = selectedPiece_y - 1;
				var ex_z = selectedPiece_z;
				//arr_pieces_over_the_selected[8]={x:ex_x,y:ex_y,z:ex_z};

				//console.log("left ---> arr_pieces_over_the_selected[8]:",arr_pieces_over_the_selected[8]);

				//if ( where_x == arr_pieces_over_the_selected[8].x && where_y == arr_pieces_over_the_selected[8].y && where_z == arr_pieces_over_the_selected[8].z ){ 
				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					rightPiece++;
					//console.log("-> There is a piece at the right!");
				} else {
					//console.log("-> There isn't a piece at the right!");
				}

				var ex_x = selectedPiece_x + 2
				var ex_y = selectedPiece_y + 1;
				var ex_z = selectedPiece_z;
				//arr_pieces_over_the_selected[8]={x:ex_x,y:ex_y,z:ex_z};

				//console.log("left ---> arr_pieces_over_the_selected[8]:",arr_pieces_over_the_selected[8]);

				//if ( where_x == arr_pieces_over_the_selected[8].x && where_y == arr_pieces_over_the_selected[8].y && where_z == arr_pieces_over_the_selected[8].z ){ 
				if (where_x == ex_x && where_y == ex_y && where_z == ex_z) {
					rightPiece++;
					//console.log("-> There is a piece at the right!"); 
				} else {
					//console.log("-> There isn't a piece at the right!"); 
				}

			}

		}; //for ends

		console.log("leftPiece:", leftPiece);
		console.log("rightPiece:", rightPiece);

		if (leftPiece > 0 && rightPiece > 0) {
			console.log("-> There are pieces at the left and at the right!");
			return true;
		} else {
			console.log("-> There is only a piece at the left or at the right!");
		}

		return false;
	},
	giveMeThePiece: function(desired_id) {

		var arr = this.levelPieces;
		var lon = arr.length;
		for (var i = 0; i < lon; i++) {
			if (arr[i].properties.id == desired_id) return arr[i];
		};
		return null; // The desired piece id wasn't found in the world!	
	},
	countAvailablePieces: function(){

		var lon1 = this.levelPieces.length;
		var piecesLeft = [];

		var cont = 0;
		for (var i = 0; i < lon1; i++) {

			var obj = this.levelPieces[i];

			/*
			var where_x = obj.properties.mem_x;
			var where_y = obj.properties.mem_y;
			var where_z = obj.properties.mem_z;
			*/

			var where_visible = obj.properties.visible;
			var pieceType = obj.getType();

			// Searching for pieces upon the selected ...
			//console.log("-----> ",where_x, ", ", where_y, ", ", where_z, ", ", where_visible);
			//console.log("getType:",pieceType );
			// create array of visible pieces

			
			if (where_visible) {
				cont++;
				
				/*
				if (isNaN(piecesLeft[pieceType-1])){
					piecesLeft[pieceType-1] = 1;
				}else{
					piecesLeft[pieceType-1] +=1;
				}
				*/
				
			}


			//console.log("piecesLeft.length:",piecesLeft.length);

			// Fill NaN values with 0
			
			/*			
			for (var i = 0; i < piecesLeft.length; i++) {
				//typeof something === "undefined"
				if (typeof piecesLeft[pieceType] === "undefined") {
					piecesLeft[pieceType] = 0;
				}
			};
			*/			

		};

		//console.log("piecesLeft:", piecesLeft);

		if (cont == 0) {
			console.log("We dont have pieces!");
			
		} else { // There are more pieces
			
			if (cont == 1) {
				console.log("There is only one piece!");

			} else { // There are more than one pieces

				if (1) { //areThereCouples()
					console.log("There are couples!");
					
					/*
					if (areThereMoovments()){

					} else {
						
					}
					*/

				}else{
					console.log("There aren't couples!");

				}	

			};
		};
		
		return cont; 
	}

};
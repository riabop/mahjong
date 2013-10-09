	"use strict";

	var escenario1 = {
		type: "scenary",
		name: "scenary number one",
		bgPicture: "flowers.jpg",
		/*
		positions: [
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
		]
		*/
		
		// positions: [{x:0,y:0,},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]

		positions: [
			{x:0, y:0, z:0, pieceType:1},
			{x:0, y:1, z:0, pieceType:2},
			{x:0, y:2, z:0, pieceType:3},
			{x:1, y:2, z:0, pieceType:2},
			{x:2, y:2, z:0, pieceType:1},
			{x:3, y:2, z:0, pieceType:3},

			{x:4, y:1, z:0, pieceType:4},
			{x:5, y:1, z:0, pieceType:4},

			{x:5, y:0, z:0, pieceType:5},
			{x:6, y:1, z:0, pieceType:5} //,

			// {x:4,y:3, z:0, pieceType:2}
		]

		/* // Double!!!
		positions: [
			{x:0, y:0, z:0, pieceType:1},
			{x:0, y:2, z:0, pieceType:2},
			{x:0, y:4, z:0, pieceType:3},
			{x:2, y:4, z:0, pieceType:2},
			{x:4, y:4, z:0, pieceType:1},
			{x:6, y:4, z:0, pieceType:3},

			{x:8, y:2, z:0, pieceType:4},
			{x:10, y:2, z:0, pieceType:4},

			{x:10, y:0, z:0, pieceType:5},
			{x:12, y:2, z:0, pieceType:5},

			{x:8, y:6, z:0, pieceType:2}
		]
		*/
	};

	var escenario2 = {
		type: "scenary",
		name: "scenary number one",
		bgPicture: "flowers.jpg",
		positions: [
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]},
			{floor:[{x:0,y:0},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]}
		]
		//positions: [{x:0,y:0,},{x:0,y:1},{x:0,y:2},{x:1,y:2},{x:2,y:2}]
	};
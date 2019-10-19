const Shapes = {
	Circle: function (param) {
		console.log("new " + param.color + " circle created with radius " + param.radius + "px");
	},

	Square: function (param) {
		console.log("new " + param.color + " square created with " + param.side + "px on a side ");
	},

	Triangle: function (param) {
		console.log("new " + param.color + " triangle created with " + param.side + "px on a side ");
	}
}
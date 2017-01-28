var direction = {
	left:37, // You needed commas separating the properties.
	up:38,
	right:39,
	down:40 // You don't need a comma for the last property, but it's fine if there is one.
}; // You needed a semicolon when initialising variables to an object.
var player = {
	color:"blue",
	position_x:0,
	position_y:0,
	movement_x:0,
	movement_y:0,
	canMove: function(displacement_x, displament_y) {
		//check if potential movement is possible
		//if(){return true;}
		//else{return false;}
		
		// fun fact, if you're returning a boolean, you don't really need the if statement. Example:
		// return 5 < 4;
		// That will always return false.
    }
};

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

window.addEventListener("keydown", /*keydown =*/ function(event) {
	switch(event.keyCode){
		case direction.up: // I'm not actually sure if you need the case keyword..
			player.movement_y=-5;
			break;
		case direction.down:
			player.movement_y=5;
			break;
		case direction.left:
			player.movement_x=-5;
			break;
		case direction.right:
			player.movement_x=5;
			break;
	}
});

// This line actually initialises the variable 'keyup' to contain that function,
//		which you don't use. I only did this because I wanted to call the 'keyup' funtion myself in other places in the code.
window.addEventListener("keyup", /*keyup =*/ function(event) {
	switch(event.keyCode){
		case direction.up:
			player.movement_y=0;
			break;
		case direction.down:
			player.movement_y=0;
			break;
		case direction.left:
			player.movement_x=0;
			break;
		case direction.right:
			player.movement_x=0;
			break;
	}
});
		
function draw() { // Draw entire frame.
	context.beginPath(); // Clear canvas.
	context.fillStyle = "black";
	context.rect(0, 0, canvas.width, canvas.height);
	context.fill();
	
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'blue';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = '#003300';
	context.stroke();
}
		
function initCanvas() { // Setup canvas with context and dimensions.
	canvas = document.getElementById("myCanvas");
	//canvas.width = cols * tileSize; The variable 'cols' is never initialised.
	//canvas.height = rows * tileSize; The variable 'rows' is never initialised.
	context = canvas.getContext("2d");
}

function drawText(string, x, y, maxWidth) {
	context.strokeStyle = "turquoise";
	context.fillStyle = "black";
	context.fillText(string, x, y, maxWidth);
	context.strokeText(string, x, y, maxWidth);
}

//MAIN
initCanvas();
draw();
loop = setInterval(main = function() {
	draw();
	// I'm pretty sure you need to add player.movement_N to the player.position_N to get it to move...
}, 1000);
// If you're only calling the 'draw' function in your setinterval, you can do it like this:
// setInterval(draw, 1000);
// The 'loop' variable contains the ID of the interval, so you can call 'clearInterval(ID);' later, but you never do this.
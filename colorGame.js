/*-------------------- variables ----------------------*/
var h1 = document.querySelector("h1");
// The array of random colors
var colors = generateRandomColors(6);
// Squares that user can click on
var squares = document.querySelectorAll(".square");
// Pick the color for user to guess
var pickedColor = pickColor();
// Display the RGB value for user to guess
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
// Display success or try again message for user
var messageDisplay = document.querySelector("#message");
// The new color can reset the color of squares
var resetButton = document.querySelector("#reset");
// easy mode or hard mode (default hard)
var mode = "hard";
var modeButtons = document.querySelectorAll(".mode");
// start everything
init();
/*-------------------- functions ----------------------*/
function init() {
	setUpModeBtns();
	setUpResetBtn();
	setUpSquares();
}

function setUpModeBtns() {
	// attach event listener to each mode button
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			mode = this.textContent.toLowerCase();
			reset(mode);
			for (var i = 0; i < modeButtons.length; i++)
				modeButtons[i].classList.remove("selected");
			this.classList.add("selected");
		});
	}
}

function setUpResetBtn() {
	resetButton.addEventListener("click", function() {
		reset(mode);
	});
}

function setUpSquares() {
	// Asign the colors to squares and
	// attach event listener to each square
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "You are so smart!";
				resetButton.textContent = "Play Again?";
				changeColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				messageDisplay.textContent = "Try Again..";
				this.style.backgroundColor = null;
			}
		});
	}
}

function reset(mode) {
	var num = mode === "hard" ? 6 : 3;
	// re-assign rondom colors to squares
	colors = generateRandomColors(num);
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else squares[i].style.display = "none";
	}
	// re-pick color
	pickedColor = pickColor();
	// re-display messages
	resetButton.textContent = "NEW COLORS";
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	h1.style.backgroundColor = "steelblue";
}

function changeColor(color) {
	for (var i = 0; i < colors.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(length) {
	var index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

function generateRandomColors(num) {
	var result = [];
	var generateRandomColor = function() {
		return Math.floor(Math.random() * 256).toString();
	};
	for (var i = 0; i < num; i++) {
		var temp =
			"rgb(" +
			generateRandomColor() +
			", " +
			generateRandomColor() +
			", " +
			generateRandomColor() +
			")";
		result[i] = temp;
	}
	return result;
}
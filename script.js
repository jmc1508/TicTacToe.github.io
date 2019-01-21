// JS script for Tic Tac Toe - Dynamic Grid

// Declarations
const buttonSubmit = document.getElementById('buttonSubmit');
const textSubmit= document.getElementById('textSubmit');
const grid = document.getElementsByClassName("gameBoard")[0];
const displayResult = document.getElementById('displayResult');
const updateScoreX= document.getElementById('updateScoreX');
const updateScoreO= document.getElementById('updateScoreO');
const playAgainButton = document.getElementById('playAgain');

let scoreCountX = 0;	
let scoreCountO = 0;


const gridStyle = "";
var boxMatrix = [];
var boxArray=[];

let countSymbol= 0;  	

// User will input value into textbox, then click 'Submit'
	
	buttonSubmit.onclick= function (event) {
		event.preventDefault();
	// Define user's preferred grid size and style the grid
		let gridSize = textSubmit.value;
		let gridStyle = ("grid-template: repeat(" + gridSize + ",1fr)/repeat(" + gridSize + ",1fr);");

	// Call a function to create HTML boxes for the grid
		createBox(gridStyle, gridSize);

	// Now we create events to handle each click

		for (let i = 0; i<gridSize*gridSize; i++){
			const box = document.getElementsByClassName('box');

			let item = box[i];

			item.onclick = function (event){
			// Target the current box being clicked 
				let currentValue = event.target;
		
			// If box is empty, we populate the box with either X or O
				if(currentValue.innerHTML ==''){
					
					let currentPlayer = symbol(countSymbol);
					currentValue.innerHTML=currentPlayer;

			// Indicate to user which player is next
					playerMove(currentPlayer);
				
					countSymbol+=1;

			// Populate the current box values into an array
				
					boxArray=createBoxArray(gridSize,boxArray,box);

			// Then create a nested array - this will be used to loop through winning conditions based on whatever grid size there is

					boxMatrix = createArrayNested(gridSize,boxMatrix,boxArray)
			// Check for the winning conditions
					if((rowCheck(currentPlayer,boxMatrix))||colCheck(currentPlayer,boxMatrix)||diagCheckOne(currentPlayer,boxMatrix)||diagCheckTwo(currentPlayer,boxMatrix)){
						displayWinner(currentPlayer);

						// clearAll();


					} else if (countSymbol==gridSize*gridSize) {
						displayResult.innerHTML = 'A draw has been declared'
					}

			// Clear all boxes when user clicks Play Again
					
					playAgainButton.onclick= function(event){
						event.preventDefault();
						window.alert('Box will be cleared for next game');
		
						clearAll();

						displayResult.innerHTML='';
					}

			// Else, this means the box already has a value
				} else {
					window.alert('This box has already been clicked');
				}
			}
		}
	}

// *********Functions**************

// Function: indicate to user which player is next
	function playerMove(currentPlayer){

		if(currentPlayer=='X') {
			displayResult.innerHTML= 'Player O is next';
		} else {
			displayResult.innerHTML= 'Player X is next';
		}
	}

// Function: return symbol O or X depending on whose turn it is

	function symbol(countSymbol){

		if (countSymbol%2==0) {
			return 'O';
		} else {
			return 'X';
		}
	}

// Function: create an array of length gridSize^2 that contains all box values

	function createBoxArray(gridSize, boxArray,box) {
		
		for (let j=0; j<(gridSize*gridSize); j++) {
			boxArray[j]=box[j].innerHTML;
		}
		return	boxArray;
	}

// Function: Create nested array with length 3. Each element is another array

	function createArrayNested(gridSize,boxMatrix,boxArray) {

		for (let j = 0; j<gridSize; j++){
		 	boxMatrix[j]=boxArray.slice(gridSize*j, gridSize*(j+1));
		}
		return boxMatrix;
	}

// Function: Create HTML boxes based on user input gridsize

	function createBox(gridStyle,gridSize) {
		for(let i = 0; i<(gridSize*gridSize); i++) {

			const box = document.createElement("li");
			const grid = document.getElementsByClassName("gameBoard")[0];

		// Add class that captures grid size to the box
			box.classList.add("box");
			grid.setAttribute("style",gridStyle);
			grid.appendChild(box);
			// box.innerHTML=i;
		}
	}

// Function - display Winner

	function displayWinner(winner) {				
				
				if (winner == 'X') {
					displayResult.innerHTML = 'Player X wins. Press "Play Again" to restart.'
	// Keep track of existing score count if no rest
					scoreCountX+=1;

					updateScoreX.innerHTML=scoreCountX;

				} else if (winner == 'O') {
					displayResult.innerHTML = 'Player O wins. Press "Play Again" to restart.'
					scoreCountO+=1;
					
					updateScoreO.innerHTML=scoreCountO;

				} else if (countSymbol==9) {
					displayResult.innerHTML = 'A draw has been declared. Press "Play Again" to restart.'
				}
	}

// Function - clear all innerHTML in boxes	
	function clearAll(){
		const clearBox = document.querySelectorAll('.box');
		
		for (let clear = 0; clear<clearBox.length;clear++) {
			clearBox[clear].innerHTML='';
			clearBox[clear].classList.remove("boxPlayerX");
			clearBox[clear].classList.remove("boxPlayerO");

		}

		// Reset countSymbol, else it will continue checking for a draw
			countSymbol=0;
	}


// Function to check winner: we use a loop to cycle through each row
	function rowCheck(symbol, boxMatrix) {
	// For Loop 1: Row Check Function returns True;
		
		// console.log(boxMatrix);
		// console.log(boxMatrix.length);

		for (let i = 0; i<boxMatrix.length; i++) {
			
			let count = 0;
			let countLimit=boxMatrix.length;

			for (let j = 0; j<boxMatrix[i].length; j++) {

		// Count Limit = the grid size. If countLimit is zero, then reset the count and move on
				 if(countLimit>0) {
					 if (boxMatrix[i][j]==symbol) {
					 	count +=1
					 }
				}
				countLimit-=1;
		// Check for the winner. If count = array length, means consecutive values
				if (count ==boxMatrix.length) {
					return true;
				}

			}
		
		}
	}

// Function: we use a loop to cycle through each column
	function colCheck(symbol, boxMatrix) {

		for (let i = 0; i<boxMatrix.length; i++) {

			let count = 0;
			let countLimit=boxMatrix.length;

			for (let j = 0; j<boxMatrix[i].length; j++) {

		// Count Limit = the grid size. If countLimit 
				 if(countLimit>0) {
					 if (boxMatrix[j][i]==symbol) {
					 	count +=1

					 }
				}
				countLimit-=1;

				if (count ==boxMatrix.length) {
					return true;
				}

			}
		
		}
	}

// Function: we use a loop to cycle through one diagonal
	function diagCheckOne(symbol, boxMatrix) {

		let count = 0;
		// For each row, check the diagonal by adding 2 each time
		for (let i = 0; i<boxMatrix.length; i++) {


			let j = i;

			if(boxMatrix[i][j]==symbol) {
				count +=1;
			}

			if(count==boxMatrix.length){
				return true;
			}

		}

	}

// Function: we use a loop to cycle through other diagonal
	function diagCheckTwo(symbol, boxMatrix) {

		let count = 0;
		let i = 0;
		// For loop start at outermost column i = array.length-1

		for (let j = boxMatrix.length-1; j>=0; j--) {

			if(boxMatrix[i][j]==symbol) {
				count+=1;
			}

			if(count==boxMatrix.length){
				return true;
			}

			i +=1;
		}

	}

// ENDS


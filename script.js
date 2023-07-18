const gameContainer = document.getElementById("game");
let guessCounter = 0;
let firstGuess = '';
let secondGuess = '';
let eventOne;
let matchCounter = 0;
const score = document.getElementById("score");
let noClick = false;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = 'white';
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(noClick){return}
  // you can use event.target to see which element was clicked
  if(event.target.style.backgroundColor !== 'white'){
    alert("Don't pick the same card twice plz thx")
  }
  else{
  guessCounter++;
  let targetColor = event.target.className;
  event.target.style.backgroundColor = targetColor;
  if(guessCounter%2 === 1){
    eventOne = event;
    firstGuess = targetColor;
  } 
  else{
    noClick = true;
    secondGuess = targetColor;
    if(firstGuess !== secondGuess){
      setTimeout(function(){
      event.target.style.backgroundColor = 'white';
      eventOne.target.style.backgroundColor = 'white';
      noClick = false;
    },1000);
    }
    else if(firstGuess === secondGuess){
      console.log('match');
      matchCounter++;
      if(matchCounter === (COLORS.length /2)){
        alert('WINNER!');
         
      }
      noClick = false;
    }
    }
    
  }
  score.innerText = guessCounter;
}

// when the DOM loads
createDivsForColors(shuffledColors);


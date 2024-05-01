const gameContainer = document.getElementById("game");
let savedCount = JSON.parse(localStorage.getItem('bestScore')) || [];
let topScore = document.querySelector('#bestScore h3');
if(savedCount > 0){
  topScore.textContent = savedCount;
}

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
    newDiv.style.backgroundColor = '#aaffaacc';

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
const bestScore = JSON.parse(localStorage.getItem('bestScore')) || [];
let numOfClicks = document.querySelector('#numOfClicks h3');

let clickCounter = 0;



let storedClick = [];
let matchedColors = [];
let counter = 0;
// TODO: Implement this function!

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  counter++;
  /* preventing user from clicking more than 2 cards */
  if(counter > 2){
    counter = 0;
    console.log('to many cards clicked');
    return;
  }
  /* preventing user from clicking same square twice in a row */
  console.log("you just clicked", event.target);
  if(event.target === storedClick[0]){
    counter = 1;
    console.log('you already clicked that one');
    return;
  }
 
  event.target.style.backgroundColor = event.target.classList;
  storedClick.push(event.target);
  
  console.log(counter);

  function reset(){
    for(let i=0; i< storedClick.length; i++){
      storedClick[i].style.backgroundColor = '#aaffaacc';
    }
    console.log('function worked!');
  }
  if(counter == 2 && storedClick.length < 2){
    storedClick = [];
    counter = 0;
    return;
  }
  if(counter == 2 && storedClick[0].className === storedClick[1].className){
    console.log('we have a match');
    setTimeout(function(){
      counter = 0;
    },100);
    matchedColors.push(storedClick[0],storedClick[1]);
    storedClick = [];

  } else if((counter == 2 && storedClick[0].className !== storedClick[1].className)){
    console.log('try again!');
    setTimeout(reset,1000);
    setTimeout(function(){
      counter = 0;
    },500);
    setTimeout(function(){
      storedClick = [];
    },1500);
  }
  clickCounter++;
  console.log(clickCounter);
  numOfClicks.innerText = clickCounter;

  if(matchedColors.length == COLORS.length){
    console.log('you matched all possible colors!');
    if(savedCount == 0){
      localStorage.setItem('bestScore',JSON.stringify(clickCounter));
    } else if(savedCount != 0 && clickCounter < savedCount){
      localStorage.setItem('bestScore',JSON.stringify(clickCounter));
    } else if(clickCounter > savedCount){
      console.log('sorry you didnt beat the high score!')
    } else if(clickCounter < savedCount){
      topScore.textContent = clickCounter;
    }
    
  }
}



let reset = document.querySelector('#reset');
reset.addEventListener('click',function(){
  window.location.reload();
});





// when the DOM loads
createDivsForColors(shuffledColors);

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);

// Calculator Program

const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}

// Rock Paper Scissors
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if(randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'Rock';
  } else if(randomNumber > 1/3 && randomNumber < 2/3){
      computerMove = 'Paper';
  }else if(randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'Scissors';
  }

  return computerMove;
}

let win = '';
let lose = '';
let tie = '';

function playGame(playerMove) {
  const computerMove = pickComputerMove(); 

  let result = '';

  if(playerMove === 'Scissors') {
      if(computerMove === 'Scissors') {
          result = 'It\'s a tie!'
          tie++;
          document.getElementById('matchTies').innerText = (`${tie}`);
      }else if(computerMove === 'Rock') {
          result = 'You lost!'
          lose++;
          document.getElementById('matchLoss').innerText = (`${lose}`);
      }else if(computerMove === 'Paper') {
          result = 'You Win!'
          win++;
          document.getElementById('matchWins').innerText = (`${win}`);
      }

  } else if(playerMove === 'Rock') {
      if(computerMove === 'Rock') {
          result = 'It\'s a tie!'
          tie++;
          document.getElementById('matchTies').innerText = (`${tie}`);
      }else if(computerMove === 'Paper') {
          result = 'You lost!'
          lose++;
          document.getElementById('matchLoss').innerText = (`${lose}`);
      }else if(computerMove === 'Scissors') {
          result = 'You Win!'
          win++;
          document.getElementById('matchWins').innerText = (`${win}`);
      }
      
  } else if(playerMove === 'Paper') {
      if(computerMove === 'Paper') {
          result = 'It\'s a tie!'
          tie++;
          document.getElementById('matchTies').innerText = (`${tie}`);
      }else if(computerMove === 'Scissors') {
          result = 'You lost!'
          lose++;
          document.getElementById('matchLoss').innerText = (`${lose}`);
      }else if(computerMove === 'Rock') {
          result = 'You Win!'
          win++;
          document.getElementById('matchWins').innerText = (`${win}`);
      }
  } 

  document.getElementById('matchResult').innerText = (`You chose ${playerMove}. \nThe computer chose ${computerMove}. \n\n${result}. `);
}

//---- Unit Converter ----//

// Get the input field
var celcius = document.getElementById("celciusConverter");

// Function to append °C and manage input
celcius.addEventListener("input", function(event) {
    // Remove any existing '°F' from the input value
    let celciusValue = celcius.value.replace(/[^\d.-]/g, ''); // Allow only numbers and a dot

    // Set the new value with °F appended
    celcius.value = celciusValue + '°C';
});

// Execute a function when the user presses a key on the keyboard
celcius.addEventListener("keydown", function(event) {
    // Check if the key pressed is 'Enter'
    if (event.key === "Enter") {
        event.preventDefault();
                    
        var value = parseFloat(celcius.value); // Convert input to number

        if (!isNaN(value)) { // Check if the input is a valid number
            // Call your function here with 'C' as the unit
            convertToFahrenheit(value);
        } else {
            alert("Please enter a valid number");
        }
    }
});

// Prevent user from deleting °F when pressing Backspace
celcius.addEventListener("keydown", function(event) {
    if (event.key === "Backspace" && celciusvalue.includes("°F")) {
        event.preventDefault();
        celcius.value = celcius.value.slice(0, -3); // Remove the last character before °F
    }
});

// Get the input field
var fahrenheit= document.getElementById("fahrenheitConverter");

// Function to append °C and manage input
fahrenheit.addEventListener("input", function(event) {
    // Remove any existing '°F' from the input value
    let inputValue = fahrenheit.value.replace(/[^\d.-]/g, ''); // Allow only numbers and a dot

    // Set the new value with °F appended
    fahrenheit.value = inputValue + '°F';
});

fahrenheit.addEventListener("keydown", function(event) {
    // Check if the key pressed is 'Enter'
    if (event.key === "Enter") {
        event.preventDefault();
                    
        var value = parseFloat(fahrenheit.value); // Convert input to number

        if (!isNaN(value)) { // Check if the input is a valid number
            // Call your function here with 'C' as the unit
            convertToCelcius(value);
        } else {
            alert("Please enter a valid number");
        }
    }
});

// Prevent user from deleting °F when pressing Backspace
fahrenheit.addEventListener("keydown", function(event) {
    if (event.key === "Backspace" && fahrenheit.value.includes("°F")) {
        event.preventDefault();
        fahrenheit.value = fahrenheit.value.slice(0, -3); // Remove the last character before °F
    }
});

function convertToFahrenheit(number){
    let fahrenheit = (number * 9 / 5) + 32;

    document.getElementById('fahrenheitConverter').value = `${fahrenheit.toFixed(2)} °F`
}


function convertToCelcius(number){
    let celcius = (number - 32) * 5 / 9;

    document.getElementById('celciusConverter').value = `${celcius.toFixed(2)} °C`;
}

//---- Coin Flip Game ----//

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0
};

document.getElementById('flipMatchWins').innerText = (`${score.wins}`);
document.getElementById('flipMatchLoss').innerText = (`${score.losses}`);

function playFlipGame(guess) {
const randomNumber = Math.random();

const result = randomNumber <= 0.5 ? 'heads' : 'tails';

let finalResult = guess == result ? 'You win' : 'You lose';

finalResult === 'You win' ? score.wins++ : score.losses++;

document.getElementById('flipMatchWins').innerText = (`${score.wins}`);
document.getElementById('flipMatchLoss').innerText = (`${score.losses}`);

localStorage.setItem('score', JSON.stringify(score));
}

function ResetFlipGame(){
    localStorage.removeItem('score');

    score = { wins: 0, losses: 0 };

    document.getElementById('flipMatchWins').innerText = '0';
    document.getElementById('flipMatchLoss').innerText = '0';
}

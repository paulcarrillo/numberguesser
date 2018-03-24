/*
GAME FUNCTION:
- Player must guess a number between a min and a max
- Playe gets a certain amount of guesses
- Notify the player of the correct answer if they lose
- Let player chose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI ELEMENTS
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assing UI min and maxNum
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value);
  console.log(guess);

  //Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }
  //Check if won
  if(guess === winningNum) {
    // Game over - won
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // Game over - lost
      // Disable input
      guessInput.disabled = true;
      // Change border color
      guessInput.style.borderColor = 'red';
      // Set message
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)

    } else {
      // Game Continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      //Clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

    }
  }
});

// Game over
function gameOver(won, msg) {
 let color;
 won === true ? color = 'green' : color = 'red';


  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  //Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max-min+1) + min);
}

// Set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

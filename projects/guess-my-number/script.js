'use strict';

/*
let sicretNum = Math.trunc(Math.random() * 20) + 1;
let score = document.querySelector('.score');
let highScore = document.querySelector('.highscore');
let displayNumber = document.querySelector('.number');

console.log(sicretNum);

const checkBtn = document.querySelector('.check');
checkBtn.addEventListener('click', () => {
  const inputNum = Number(document.querySelector('.guess').value);
  document.querySelector('.guess').value = '';
  let message = document.querySelector('.message');

  if (inputNum < 1 || inputNum > 20) {
    alert('Just numbers between 1 and 20');
  }

  if (inputNum < sicretNum) {
    message.innerText = 'too low';
    score.textContent = `${Number(score.textContent) - 1}`;
  } else if (inputNum > sicretNum) {
    message.innerText = 'too high';
    score.textContent = `${Number(score.textContent) - 1}`;
  } else {
    message.innerText = 'Corect number';
    if (score.textContent > highScore.textContent) {
      highScore.textContent = `${score.textContent}`;
    }
    displayNumber.textContent = `${sicretNum}`;
    checkBtn.setAttribute('disabled', 'true');
  }
});

const againBtn = document.querySelector('.again');
againBtn.addEventListener('click', () => {
  score.textContent = 20;
  displayNumber.textContent = '?';
  checkBtn.removeAttribute('disabled');
});
*/


let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let score = 20;
let highscore = 0;

const displayMessage = function(message){
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // Ako je razlicito od true to jeste ako je broj 0 zato sto je 0 false
  if (!guess) {
     displayMessage('❌ No number');

    // When player win
  } else if (guess === secretNumber) {

        displayMessage('🎉 Correct Number!');

        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';

            if (score > highscore){
                highscore = score
                document.querySelector('.highscore').textContent = highscore;
            }


    // When guess is wrong
  } else if (guess !== secretNumber){

        if (score > 1){
            displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low!');
            score--;
            document.querySelector('.score').textContent = score;
        }else{
            displayMessage('You lost the game!');
            document.querySelector('.score').textContent = 0;
        }

  } 

});

document.querySelector('.again').addEventListener('click', () => {

    score = 20
    document.querySelector('.score').textContent = score;

    displayMessage('Start guessing...');
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';

    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.guess').value = '';

});

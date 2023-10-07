'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');


let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    current0El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

init();


const switchPlayer = function(){
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0El.classList.toggle('player--active'); // toggel je metoda koja ako klasa ne postoji dodaje je,
    player1El.classList.toggle('player--active'); // a ako klasa vec postoji obrisace je

}


// Rolling dice funcionality
btnRoll.addEventListener('click', () => {
    if (playing){
        // 1. Generating a random dice roll
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNumber}.png`;

        // 3. Check for rolled 1;
        if(diceNumber !== 1){
            // Add dice to current score
            currentScore += diceNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;

        } else {
            // Switch to next player
            switchPlayer();

            // Moze i ovako ali je sa toggle prakticnije
            // if(activePlayer === 0 && player1El.classList.contains('player--active')){
            //     player1El.classList.remove('player--active');
            //     player0El.classList.add('player--active');
            // }else if (activePlayer === 1 && player0El.classList.contains('player--active')){
            //     player0El.classList.remove('player--active');
            //     player1El.classList.add('player--active');           
            // }
        }
    }
});


btnHold.addEventListener('click', () => {
    if (playing){
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        
        // 2. Check if player's score >=100 Finish the game
        if(scores[activePlayer] >= 20){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else{
            // Switch to the next player
            switchPlayer();
        }
        
    }

    





    // totalScore += currentScore;
    // document.querySelector(`#score--${activePlayer}`).textContent = totalScore;

    // document.querySelector(`#current--${activePlayer}`).textContent = 0;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    
    // totalScore = 0;
    
    // currentScore = 0;
    // player0El.classList.toggle('player--active'); // toggel je metoda koja ako klasa ne postoji dodaje je,
    // player1El.classList.toggle('player--active');
});




btnNew.addEventListener('click', init);
   

    /*
    if (!playing){
        playing = true;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    }

    currentScore = 0;
    for (let i = 0; i < 2; i++){
        document.querySelector(`#current--${i}`).textContent = 0;
    }

    for (let i = 0; i < scores.length; i++){
        scores[i] = 0;
        document.querySelector(`#score--${i}`).textContent = 0;
    }

    activePlayer = 0;
    if (player1El.classList.contains('player--active')){
        player1El.classList.remove('player--active');
        player0El.classList.add('player--active'); 
    }else{
        player0El.classList.add('player--active'); 
    }

    diceEl.classList.add('hidden');
    */
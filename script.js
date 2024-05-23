'use strict';

// Selecting Elements 
const score0 = document.querySelector("#score--0");
const score1 = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const totalCurrentScore = document.querySelectorAll(".current-score");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const player = document.querySelector(".player");
let currentScore, scores, activePlayer, isGamePlaying;

//Starting Conditions
init();
function init () {
    //Resetting Scores
    currentScore = 0;
    scores = [0, 0];
    // scores[0] = 0;
    // scores[1] = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    for(let i = 0; i < totalCurrentScore.length; i++){
        totalCurrentScore[i].textContent = 0;
    }
    

    //Check if activePlayer contains playerWinner. Worked in newbtn func but doesn't here for a reason.
    // document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
    // document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    //Setting Active Player to default
    activePlayer = 0;
    document.querySelector(".player--0").classList.add('player--active');


    isGamePlaying = true;
    diceImg.classList.add('hidden');
}
buttonRoll(btnRoll);
btnHold.addEventListener("click", hold);

//Button Roll Functionality
function buttonRoll (btnRoll) {
    btnRoll.addEventListener("click", rollBtn);
}

function rollBtn () {
    if(isGamePlaying) {
        //1. Generate a random dice roll
        const generateRoll = Math.round(Math.random () * 5) + 1;

        //2. Display dice
         diceImg.classList.remove("hidden");
         diceImg.src = `dice-${generateRoll}.png`;

        //3. Check if it's a 1 or not
        if(generateRoll !== 1){
        //Add dice to current score
        currentScore += generateRoll;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }else{
            //Switch to next player
            switchPlayer();
        }
    }
    
    
}

//Player Switch
function switchPlayer () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

//Hold Button Functionality
function hold () {
    if(isGamePlaying) {

    //Add current score to active player's score
        scores[activePlayer] += currentScore; 

    //Change active player's score
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //Check if active player's score is less than or equals 100
    if(scores[activePlayer] >= 100) {
        isGamePlaying = false; //Change game's state
        //Change the active player's design 
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        diceImg.classList.add('hidden');
     }else{
        switchPlayer();
     }

    }

}

//Resetting the Game
btnNew.addEventListener("click", init);




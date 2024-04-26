'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let gameIsFinished = false;

function switchPlayer() {
  //Reset current score of active player
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  //Switching the player
  activePlayer = activePlayer ? 0 : 1;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}
function resetGame() {
  currentScore = 0;
  activePlayer = 0;
  gameIsFinished = false;
  scores.map(el => el * 0);
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document.getElementById(`current--${activePlayer + 1}`).textContent =
    currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent = 0;
  document.querySelector(`#score--${activePlayer + 1}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer + 1}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer + 1}`)
    .classList.remove('player--winner');
  diceEl.classList.add('hidden');
}
// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  // 1. Generating a random dice roll
  if (!gameIsFinished) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `/dice-${dice}.png`;
    // 3.Check for rolled 1: if true - switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (!gameIsFinished) {
    let globalScore = document.querySelector(`#score--${activePlayer}`);
    //   1. Add current score to active player`s score
    scores[activePlayer] += currentScore;
    globalScore.textContent = scores[activePlayer];

    //   2. Check if player`s score is >=100
    if (scores[activePlayer] >= 100) {
      gameIsFinished = true;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);

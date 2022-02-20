'use strict';
// Selecting elements
const scorePlayer0El = document.querySelector('#score--0');
const scorePlayer1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// starting condistions
// scorePlayer0El.textContent = 0;
// scorePlayer1El.textContent = 0;
// diceEl.classList.add('hidden');
let scores, currentScore, activePlayer, playing;

// * initialisation function
const init = function () {
  scorePlayer0El.textContent = 0;
  scorePlayer1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
// ! calling the init function
init();
//* function for switching player
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// nutton rolling event function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // *3 . chek for rolled 1 : if true switch player
    //  * else add the number

    if (dice !== 1) {
      currentScore += dice;
      // currentScore1El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// * Hold button function
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //* test if the score > 100
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      // switch player
    } else switchPlayer();
  }
});

// * new game button function
btnNew.addEventListener('click', function () {
  // scores[0] = 0;
  // scores[1] = 0;
  // currentScore = 0;
  // activePlayer = 0;
  // playing = true;
  init();
});

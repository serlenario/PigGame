'use strict';

const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

let isPlaying, totalScore, currentScore, activePlayer;

const initGame = function () {
	score0Element.textContent = 0;
	score1Element.textContent = 0;
	diceElement.classList.add('hidden');

	isPlaying = true;
	totalScore = [0, 0];
	currentScore = 0;
	activePlayer = 0;
};

initGame();

const switchActivePlayer = function () {
	currentScore = 0;
	document.querySelector(`#current--${activePlayer}`).textContent =
		currentScore;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0Element.classList.toggle('player--active');
	player1Element.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
	if (isPlaying) {
		const diceNumber = Math.trunc(Math.random() * 6) + 1;

		diceElement.classList.remove('hidden');
		diceElement.src = `icons/dice${diceNumber}.png`;

		if (diceNumber !== 1) {
			currentScore += diceNumber;
			document.querySelector(`#current--${activePlayer}`).textContent =
				currentScore;
		} else {
			switchActivePlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (isPlaying) {
		totalScore[activePlayer] += currentScore;
		document.querySelector(`#score--${activePlayer}`).textContent =
			totalScore[activePlayer];

		if (totalScore[activePlayer] >= 5) {
			isPlaying = false;

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');

			document.querySelector('body').style.backgroundColor = 'white';

			if (activePlayer === 0) {
				document
					.querySelector(`.player--${activePlayer + 1}`)
					.classList.add('player--looser');
			} else {
				document
					.querySelector(`.player--${activePlayer - 1}`)
					.classList.add('player--looser');
			}

			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add('player--winner');
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove('player--active');

			for (let i = 0; i < 2; i++) {
				document.querySelectorAll('.current')[i].style.backgroundColor =
					'white';
				document.querySelectorAll('.current-label')[i].style.color = 'black';
				('white');
				document.querySelectorAll('.current-score')[i].style.color = 'black';
				('white');
			}
		} else {
			switchActivePlayer();
		}
	}
});

document.querySelector('.btn--new').addEventListener('click', function () {
	initGame();

	score0Element.textContent = 0;
	score1Element.textContent = 0;
	current0Element.textContent = 0;
	current1Element.textContent = 0;
	player0Element.classList.remove('player--winner');
	player0Element.classList.remove('player--looser');
	player1Element.classList.remove('player--winner');
	player1Element.classList.remove('player--looser');
	document.querySelector(`.player--0`).classList.remove('player--active');
	document.querySelector(`.player--1`).classList.remove('player--active');
	document.querySelector(`.player--0`).classList.add('player--active');
	document.querySelector('body').style.backgroundColor = 'black';

	for (let i = 0; i < 2; i++) {
		document.querySelectorAll('.current')[i].style.backgroundColor = 'black';
		document.querySelectorAll('.current-label')[i].style.color = 'white';
		('white');
		document.querySelectorAll('.current-score')[i].style.color = 'white';
		('white');
	}
});

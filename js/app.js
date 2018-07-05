document.addEventListener('DOMContentLoaded', function() {

	const startScreen = document.querySelector('#start-overlay');
	const gameHeader = document.querySelector('#game-header');
	const game = document.querySelector('#memory-game');

	/*
	 *
	 * START SCREEN
	 *
	 */

	const startGame = function() {
		startTimer();
		this.parentNode.remove();
	}

	/*
	 *
	 * TIMER
	 *
	 */

	let secondCounter;
	const startTimer = function() {

		console.log('TIMER FIRING');

		/*** second counter ***/
		const secSpan = gameHeader.querySelector('#seconds');
		let startSeconds = new Date();
		let endSeconds = new Date();
		let secCountUp;

		startSeconds.setSeconds(0);
		endSeconds.setSeconds(59);

		secondCounter = setInterval(function() {
			endSeconds.setSeconds((endSeconds.getSeconds()) + 1);
			secCountUp = (endSeconds.getSeconds() - startSeconds.getSeconds());

			console.log(endSeconds.getSeconds() + '-' + startSeconds.getSeconds());
			console.log(secCountUp);

			// add minute once 60 seconds have passed
			// and update minute span

			if (secCountUp === 0) {
				minCountUp = endMinutes.getMinutes() - startMinutes.getMinutes();

				endMinutes.setMinutes((endMinutes.getMinutes()) + 1);
				console.log(minCountUp);

				minSpan.innerHTML = minCountUp;
			}

			secSpan.innerHTML = secCountUp;


		}, 1000);

		/*** minute counter ***/
		const minSpan = gameHeader.querySelector('#minutes');
		let startMinutes = new Date();
		let endMinutes = new Date();

		startMinutes.setMinutes(0);
		endMinutes.setMinutes(0);

		

	}

	// reset timer
	const resetTimer = function() {
		clearInterval(secondCounter);
		startTimer();
	}




	/*
	 *
	 * SHUFFLING
	 *
	 */

	const shuffle = function() {
		let oldCards = Array.from(document.querySelectorAll('.card'));
		const newCards = [];
		let num = '';

		// generate random number
		// max depends on how many total elements in oldCards
		// add randomly selected card to new array,
		// then delete it from old array

		for (let i = oldCards.length; i > 0; i--) {
			num = Math.floor(Math.random() * (oldCards.length));
			newCards.push(oldCards[num]);
			oldCards.splice(num, 1);
		}
		for (const card of newCards) {
			// credit to Matthew Cranford, our fellow classmate, for this loop
			game.appendChild(card);
		}
	}

	shuffle();

	/*
	 *
	 * GAME LOGIC 
	 *
	 */

	let card1 = '';
	let card2 = '';


	const match = function(e) {

		//store clicked cards as vars


		/*since vars reset after both are assigned and tested,
			we can track first and second clicks
			by using vars as conditionals */

		if (!card1 && !card2) {
			card1 = e.target.classList[1];
		} else if (card1 && !card2) {
			card2 = e.target.classList[1];
		}


		console.log('card1 and card 2 variables:' + card1 + ' ' + card2);

		// test for match

		const letter = /(a|b)$/;
		const letterA = /card\da/;
		const letterB = /card\db/;
		let hiddenCards;

		// test for same card #, then different letter
		/***** NOTE: UPDATE MOVE COUNTER HERE ********/

		if ((card1.replace(letter, '') === card2.replace(letter, ''))
				&& ((letterA.test(card1) && letterB.test(card2)) 
					|| (letterB.test(card1) && letterA.test(card2)))) { 

			const matchingCards = game.querySelectorAll( '.' + (card1.replace(letter, '').toString()));

			// loop through each match, set display to none
			for (var i = 0; matchingCards.length > i; i++) {
				matchingCards[i].style.display = 'none';
			}

			// check if user has won

			hiddenCards = game.querySelectorAll('.card[style="display: none;"]');

			if (hiddenCards.length === 16) {
				alert('USER HAS WON');
				clearInterval(secondCounter);
			}


			console.log('Match!');
		} else {
			console.log('No match!');
		}
	


		//reset card vars after cards have been tested

		if (card1 && card2) {
			updateCounter();
			updateRating();
			console.log('RESETTING VARS');
			card1 = '';
			card2 = '';
		}
	}

	/*
	 *
	 * RESET GAME
	 *
	 */

	// undo hiding the cards
	const resetGame = function() {

		shuffle();
		resetTimer();

		const cards = game.querySelectorAll('.card');

		// loop through each card, reset display, showing cards again
		for (const card of cards) {
			card.style.display = '';
		}

		gameHeader.querySelector('#rating').innerHTML = '★ ★ ★';

		//reset count
		count = 0;
		gameHeader.querySelector('#moves').innerHTML = 0;

	}


	/*
	 *
	 * UPDATE COUNTER
	 *
	 */

	let movesSpan;
	let count = 0;
	const updateCounter = function() {
		movesSpan = gameHeader.querySelector('#moves');
		count += 1;
		movesSpan.innerHTML = count;

		console.log('the counter is at ' + count + '. adding one updates it to ' + (count + 1));
		movesSpan.innerHTML = count;
	};

	/*
	 *
	 * STAR RATING
	 *
	 */

	const updateRating = function() {
		const starRating = gameHeader.querySelector('#rating');

		console.log('the count is ' + count);
		if (count === 14) {
			starRating.innerHTML = '★ ★ ☆';
		} else if (count === 19) {
			starRating.innerHTML = '★ ☆ ☆';
		}
	}





	game.addEventListener('click', match);
	startScreen.querySelector('#start-game-button').addEventListener('click', startGame);
	gameHeader.querySelector('#reset').addEventListener('click', resetGame);
	

});

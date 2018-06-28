document.addEventListener('DOMContentLoaded', function() {

	const gameHeader = document.querySelector('#game-header');
	const game = document.querySelector('#memory-game');

	/*
	 *
	 * TIMER
	 *
	 */

	const resetTimer = function() {

		/*** second counter ***/
		const secSpan = gameHeader.querySelector('#seconds');
		let startSeconds = new Date();
		let endSeconds = new Date();
		let secCountUp;

		startSeconds.setSeconds(0);
		endSeconds.setSeconds(59);

		setInterval(function() {
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

		setInterval(function() {
			// console.log(endMinutes.getMinutes() + '-' + startMinutes.getMinutes());
			// console.log((endMinutes.getMinutes() - startMinutes.getMinutes()));
		}, 1000);
		

	}

	resetTimer();


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

		// test for same card #, then different letter
		/***** NOTE: UPDATE MOVE COUNTER HERE AND CALL TIMER FUNCTION ********/

		if ((card1.replace(letter, '') === card2.replace(letter, ''))
				&& ((letterA.test(card1) && letterB.test(card2)) 
					|| (letterB.test(card1) && letterA.test(card2)))) { 

			const matchingCards = game.querySelectorAll( '.' + (card1.replace(letter, '').toString()));

			// loop through each match, set display to none

			for (var i = 0; matchingCards.length > i; i++) {
				matchingCards[i].style.display = 'none';
			}

			console.log('Match!');
		} else {
			console.log('No match!');
		}

		//reset card vars after cards have been tested

		if (card1 && card2) {
			console.log('RESETTING VARS');
			card1 = '';
			card2 = '';
		}
	}


	game.addEventListener('click', match);

});

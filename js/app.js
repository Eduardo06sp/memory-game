document.addEventListener('DOMContentLoaded', function() {

	/*** GAME LOGIC ***/
	let card1 = '';
	let card2 = '';

	const game = document.getElementById('memory-game');

	const match = function(e) {

		//store clicked cards as vars


		/*
		 * since vars reset after both are assigned and tested,
		 * we can track first and second clicks
		 * by using vars as conditionals
		 *
		 */

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

		(card1.replace(letter, '') === card2.replace(letter, ''))
			&& ((letterA.test(card1) && letterB.test(card2)) 
					|| (letterB.test(card1) && letterA.test(card2)))
			? console.log('Match!') : console.log('No match!');

		//reset card vars after cards have been tested

		if (card1 && card2) {
			console.log('RESETTING VARS');
			card1 = '';
			card2 = '';
		}
	}

game.addEventListener('click', match);

});

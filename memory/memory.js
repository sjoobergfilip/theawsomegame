/*
 * Memory game
 *
 */

const getBricks = () => {
	return [
		{ id: 1, img: '1.png' },
		{ id: 2, img: '2.png' },
		{ id: 3, img: '3.png' },
		{ id: 4, img: '4.png' },
		{ id: 5, img: '5.png' },
		{ id: 6, img: '6.png' },
		{ id: 7, img: '7.png' },
		{ id: 8, img: '8.png' }
	];
};

// Shuffle bricks in random order
const shuffleBricks = bricks => {
	let currentIndex = bricks.length;
	let temporaryValue;
	let randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = bricks[currentIndex];
		bricks[currentIndex] = bricks[randomIndex];
		bricks[randomIndex] = temporaryValue;
	}

	return bricks;
};

// Render memory grid to page
const renderMemoryGrid = () => {
	let bricks = [...getBricks(), ...getBricks()];
	bricks = shuffleBricks(bricks);

	// Create brick grid
	bricks.forEach(brick => {
		// Create brick element
		const html = `
			<div class="brick" data-id="${brick.id}">
				<div class="front"></div>
				<div class="back" style="background-image: url('/assets/img/memory/${brick.img}')"></div>
			</div>`;

		// Append brick to grid
		document.querySelector('.memory-grid').innerHTML += html;
	});
};

let counter = 0;
let selectedBricks = [];

const flipBrick = brick => {
	brick.classList.add('selected');
	selectedBricks.push(brick.dataset.id);
};

const checkMatch = () => {
	if (selectedBricks[0] === selectedBricks[1]) {
		document.querySelectorAll('.selected').forEach(brick => {
			brick.classList.remove('selected');
			brick.classList.add('match');
		});
		return selectedBricks[0];
	} else {
		document.querySelectorAll('.selected').forEach(brick => {
			brick.classList.remove('selected');
		});
		return 0;
	}
};

const isClickable = () => {
	return true;
};

const resetGuesses = () => {
	counter = 0;
	selectedBricks = [];
};

document.querySelector('.memory-grid').addEventListener('click', e => {
	if (e.target.tagName === 'SECTION') {
		return;
	}

	if (counter < 2 && isClickable()) {
		flipBrick(e.target.parentElement);
		counter++;
	}

	if (counter === 2) {
		setTimeout(checkMatch, 1200);
		setTimeout(resetGuesses, 1200);
	}
});

renderMemoryGrid();

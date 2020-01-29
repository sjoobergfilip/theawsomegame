/*
 * Memory game
 *
 */

const getBricks = () => {
	return [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
		{ id: 8 }
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
	bricks.forEach((brick, idx) => {
		// Create brick element
		const html = `
			<div class="brick" data-id="${brick.id}" data-index="${idx}">
				<div class="front"></div>
				<div class="back" style="background-image: url('/assets/img/memory/${brick.id}.png')"></div>
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
	} else {
		document.querySelectorAll('.selected').forEach(brick => {
			brick.classList.remove('selected');
		});
	}
};

const isClickable = brick => {
	if (brick.classList.contains('selected') || brick.classList.contains('match')) {
		return false;
	}
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

	if (counter < 2 && isClickable(e.target.parentElement)) {
		flipBrick(e.target.parentElement);
		counter++;
	}

	if (counter === 2) {
		setTimeout(checkMatch, 1200);
		setTimeout(resetGuesses, 1200);
	}
});

renderMemoryGrid();

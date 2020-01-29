const X_ClASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATTIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.querySelector('#board')
const winningMessageElement = document.querySelector('#winning-message')
const winningMessageTextElement = document.querySelector('.data-winning-message-text')
const restartButton = document.getElementById('restartButton')
let circleTurn



restartButton.addEventListener('click', function () {
    console.log('hello')
    winningMessageElement.style.display = 'none';
    startGame()
})

startGame()

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_ClASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.addEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, {
            once: true
        })
    })
    // setBoardHoverClass()
    winningMessageTextElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_ClASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)

    } else if (isDraw()) {
        endGame(true)
    } else {
        swampTurns()
        // setBoardHoverClass()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${ circleTurn ?"O'S":"X's"}Wins`
    }
    // winningMessageElement.classList.add('show')
    winningMessageElement.style.display = "flex";
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_ClASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swampTurns() {
    circleTurn = !circleTurn
}


// function setBoardHoverClass() {
//     board.classList.remove(X_ClASS)
//     board.classList.remove(CIRCLE_CLASS)
//     if (circleTurn) {
//         board.classList.add(CIRCLE_CLASS)
//     } else {
//         board.classList.add(X_ClASS)
//     }

// }

function checkWin(currentClass) {
    return WINNING_COMBINATTIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
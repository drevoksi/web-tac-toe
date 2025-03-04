let turn = "X"
let gameState = "";

function isClear(state) {
    return state !== "X" && state !== "O";
}

function changeTurn() {
    // Can already see lots of functions here
    turn = (turn == "X" ? "O" : "X");
    document.getElementById("turn").innerHTML = "Turn: " + turn;
}

function checkBoard() {
    let check = checkCells();
    
    if (check) {
        gameState = check;
        document.getElementById("turn").innerHTML = isClear(gameState) ? "Draw!" : gameState + " Wins!";
    }
}

// TODO: need to return coordinates of the cells, for the ability to create a line through
// TODO: game needs to be restartable
// TODO: ideally shouldn't duplicate data, store either in array or elements, not both
function checkCells() {
    for (let row = 0; row < 3; row++) {
        if (check = compareCells(boardArray[0][row], boardArray[1][row], boardArray[2][row])) {
            return check;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (check = compareCells(boardArray[col][0], boardArray[col][1], boardArray[col][2])) {
            return check;
        }
    }

    if (check = compareCells(boardArray[0][0], boardArray[1][1], boardArray[2][2])) {
        return check;
    }

    if (check = compareCells(boardArray[2][0], boardArray[1][1], boardArray[0][2])) {
        return check;
    }
    
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (isClear(boardArray[x][y].dataset.state)) {
                return false
            }
        }
    }

    return " ";
}

function compareCells(a, b, c) {
    if (!isClear(a.dataset.state) && a.dataset.state === b.dataset.state && b.dataset.state === c.dataset.state) {
        return a.dataset.state;
    }
    return false;
}

function updateCells() {
    for (const cell of document.getElementsByClassName("cell")) {
        cell.innerHTML = cell.dataset.state;
    }
}

function resetCells() {
    for (const cell of document.getElementsByClassName("cell")) {
        cell.dataset.state = " ";
    }
}

function printBoard() {
    let result = "";
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            result += boardArray[x][y].dataset.state;
        }
        result += "\n";
    }
    console.log(result);
}

let board = document.getElementById('board');
let boardArray = []

// create board
for (let x = 0; x < 3; x++) {
    let col = []
    for (let y = 0; y < 3; y++) {
        let element = document.createElement("div");
        element.classList.add('cell');
        element.dataset.state = " ";
        element.dataset.x = x;
        element.dataset.y = y;
        board.appendChild(element);
        col.push(element);
    }
    boardArray.push(col)
}



// add click to elements
for (const cell of document.getElementsByClassName('cell')) {
    cell.addEventListener('click', function () {
        if (isClear(cell.dataset.state) && isClear(gameState)) {
            cell.dataset.state = turn;
            changeTurn();
            updateCells();
            printBoard();
            checkBoard();
        }
    });
}
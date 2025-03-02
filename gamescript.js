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
            if (isClear(boardArray[x][y])) {
                return false
            }
        }
    }

    return " ";
}

function compareCells(a, b, c) {
    if (!isClear(a) && a === b && b === c) {
        return a;
    }
    return false;
}

function printBoard() {
    let result = "";
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            result += boardArray[x][y];
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
        element.dataset.x = x;
        element.dataset.y = y;
        board.appendChild(element);
        col.push(".")
    }
    boardArray.push(col)
}

// add click to elements
for (const cell of document.getElementsByClassName('cell')) {
    cell.addEventListener('click', function () {
        let state = boardArray[cell.dataset.x][cell.dataset.y];
        if (isClear(state) && isClear(gameState)) {
            cell.innerHTML = turn;
            boardArray[cell.dataset.x][cell.dataset.y] = turn;
            changeTurn();
            printBoard();
            checkBoard();
        }
    });
}
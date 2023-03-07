const cells = Array.from(document.querySelectorAll(".cells"));
const restartBtn = document.querySelector("#restartBtn");
let playerTurn = document.querySelector(".playerTurn");
let statusText = document.querySelector(".statusText");

let running = false;
// let spaces = Array(9).fill(null);
let spaces = ["", "", "", "", "", "", "", "", ""]

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const oText = "O";
const xText = "X";
let currentPlayer = xText;


// testing
// console.log(cells)
// console.log(restartBtn)
// console.log(playerTurn)
// console.log(statusText)
// console.log(spaces)

// startgame
// click 
// upadate the arr
// change player
// check winner
// SoundEffect

startGame()

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked))
    running = true;
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
};

function cellClicked() {
    playSound ("./audio/Slack - Yoink.mp3")
    const cellIndex = this.getAttribute("cellIndex");


    if (spaces[cellIndex] != "" || !running) {
        return;
    }

    else {
        updateCell(this, cellIndex);
        // changePlayer();
        checkWinner();
    }

}


function updateCell(cell, index) {
    spaces[index] = currentPlayer;
    cell.textContent = currentPlayer;
    // console.log(spaces);

};

function changePlayer() {
    currentPlayer = (currentPlayer == xText) ? oText : xText;

    statusText.textContent = `${currentPlayer}'s turn`;
}

function playSound(url) {
    let audio = new Audio(url);

    audio.play();

}


function restartGame() {
    //  soundEffect for restart
    playSound("./audio/Slack - Ding.mp3");

    currentPlayer = xText;

    spaces = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `${currentPlayer}'s turn`

    cells.forEach(cell => cell.textContent = "");
    running = true;

}



function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = spaces[condition[0]];
        const cellB = spaces[condition[1]];
        const cellC = spaces[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        };

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {

        // soundEffect for win notification
        playSound("./audio/Slack - Incoming call.mp3");
        playerTurn.textContent = `${currentPlayer}'s wins!`
        statusText.textContent = `${currentPlayer}'s wins!`
        running = false;
    }

    else if (!spaces.includes("")) {
        // soundEffect for draw notification
        playSound("./audio/Slack - Whoa.mp3")
        statusText.textContent = `Draw!`;
        running = false;
    }

    else {
        changePlayer();
    }
}
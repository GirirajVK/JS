let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#msg1");
let themeBtn = document.querySelector("#theme");
let currMode = "light";
let playerScore = 0;
let botScore = 0;
document.body.classList.add("light");

themeBtn.onclick = () => {
    if(currMode === "light"){
        currMode = "dark";
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        themeBtn.innerText = "Light-Mode";
    } else {
        currMode = "light";
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        themeBtn.innerText = "Dark-Mode";
    }
};

let turnofO = true; //player1, player2

const winIf = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnofO && box.innerText === ""){
            //player1
            box.innerText = "O";
            box.classList.add("o-st");
            box.disabled = true;
            turnofO = false;
            count++;

            let isWin = checkWin();
            
            if(!isWin && count<9){
                setTimeout(botMove, 300);
            }
        } 
    });
});

const botMove = () => {
    let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if(availableBoxes.length>0){
        let randomIndex = Math.floor(Math.random()*availableBoxes.length);
        let selectedBox = availableBoxes[randomIndex];

        selectedBox.innerText = "X";
        selectedBox.classList.add("x-st");
        selectedBox.disabled = true;
        count++;

        let botWon = checkWin();

        if(!botWon){
            turnofO = true;
        }
    }
};

const checkWin = () => {
    let winnerFound = false;
    for(let pattern of winIf){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val == pos2val && pos2val == pos3val){
                showWinner(pos1val);
                updateScore(pos1val);
                winnerFound = true;
                return;
            }
        }
    }
    if(!winnerFound && count === 9){
        showDraw();
        gameActive = false;
        return false;
    }
    return false;
};

let gameActive = true;

const updateScore = (winner) => {
    if(!gameActive) return;

    if (winner === "O"){
        playerScore++;
        document.querySelector("#p-score").innerText = playerScore;
    } else {
        botScore++;
        document.querySelector("#b-score").innerText = botScore;
    }
    gameActive = false;
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = `Draw!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-st","o-st");
    }
}

const resetGame = (fullReset = false) => {
    gameActive = true;
    turnofO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;

    if(fullReset){
        playerScore = 0;
        botScore = 0;

        document.querySelector("#p-score").innerText = "0";
        document.querySelector("#b-score").innerText = "0";
    }
};

newGameBtn.addEventListener("click", () => resetGame(false));
resetBtn.addEventListener("click", () => resetGame(true));
msgContainer.classList.add("hide");

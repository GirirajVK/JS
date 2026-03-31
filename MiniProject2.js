let userScore = 0;
let botScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const botScorePara = document.querySelector("#bot-score");

const genBotchoice = () => {
    const options = ["Rock", "Paper", "Scissor"];
    const randomIdx = Math.floor(Math.random()*3);
    return options[randomIdx];
}

const playGame = (userChoice) => {
    const botChoice = genBotchoice();

    if(userChoice === botChoice){
        draw();
        userScore++;
        botScore++;
        userScorePara.innerText = userScore;
        botScorePara.innerText = botScore; 
    } else{
        let userWin = true;
        if(userChoice === "Rock"){
            userWin = botChoice === "Paper" ? false : true;
        } else if(userChoice === "Paper"){
            userWin = botChoice === "Scissor" ? false : true;
        } else{
            userWin = botChoice === "Rock" ? false : true;
        }
        showWin(userWin, userChoice, botChoice);
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

const draw = () => {
    msg.innerText = `Draw! Play Again`;
    msg.style.backgroundColor = "gold";
    msg.style.boxShadow = "0 4px 14px 0 #ffd700"
}

const showWin = (userWin, userChoice, botChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore; 
        msg.innerText = `You Win! Your ${userChoice} beats bot's ${botChoice}`;
        msg.style.backgroundColor = "green";
        msg.style.boxShadow = "0 4px 14px 0 rgba(0, 255, 0, 0.922)";

    } else {
        botScore++;
        botScorePara.innerText = botScore;
        msg.innerText = `You Lose! Bot's ${botChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        msg.style.boxShadow = "0 4px 14px 0 rgba(255, 0, 0, 0.922)";
    }
};

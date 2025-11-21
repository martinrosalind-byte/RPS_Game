const resultDisplay = document.getElementById('result-display');
const choiceButtons = document.querySelectorAll('.choice-btn');
const userScoreDisplay=document.getElementById('user-score');
const computerScoreDisplay=document.getElementById('computer-score');
const roundInfoDisplay = document.getElementById('current-round');
const resetButton = document.getElementById('reset-btn');
const moves = ['rock', 'paper', 'scissors'];

let userScore=0;
let computerScore=0;
let currentRound = 1;
const maxRounds = 3;

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function updateScoreDisplays(){
	userScoreDisplay.textContent=userScore;
	computerScoreDisplay.textContent=computerScore;
	roundInfoDisplay.textContent=currentRound;
}

function endGame(message){
	resultDisplay.innerHTML = `<span style="color: red;">Game Over!</span><br>**${message}**`;
	choiceButtons.forEach(button =>{
		button.disabled=true;
	});
	resetButton.style.display='block';
}

function playGame(userChoice) {
	if (currentRound > maxRounds){
		return;
	}
    const computerChoice = getComputerChoice();
    let roundResult = '';

    if (userChoice === computerChoice) {
        roundResult = "It's a tie! 🤝";
    } 
    else if (
        (userChoice === 'rock' && computerChoice === 'scissors') || // Rock beats Scissors
        (userChoice === 'paper' && computerChoice === 'rock') ||    // Paper beats Rock
        (userChoice === 'scissors' && computerChoice === 'paper')   // Scissors beats Paper
    ) {
        roundResult = 'You win! 🎉';
		userScore++;
    } 
    else {
        roundResult = 'You lose! 😢';
		computerScore++;
    }
	
		updateScoreDisplays();
	
	resultDisplay.innerHTML = `
        You chose **${userChoice}**. <br>
        The computer chose **${computerChoice}**. <br>
        **${roundResult}**
    `;
	
   	if (userScore === 2 || computerScore === 2) { 
		const finalResult = userScore > computerScore ?
			"Congratulations! You won the best of three!" :
			"The computer won the best of three.";
		endGame(finalResult);
	}
    else if (currentRound === maxRounds) {
        let finalResult;
        if (userScore > computerScore) {
            finalResult = "You won the best of three!";
        } 
		else if (computerScore > userScore) {
            finalResult = "The computer won the best of three.";
        } 
		else {
            finalResult = "The best of three ended in a draw.";
        }
		endGame(finalResult);
	}
   	else {
		currentRound++;
		roundInfoDisplay.textContent=currentRound;
	}
}

function resetGame(){
	userScore = 0;
	computerScore = 0;
	currentRound = 1;
	resultDisplay.innerHTML = 'Make your choice to start the game!';
	choiceButtons.forEach(button =>{
		button.disabled = false;
	});
	resetButton.style.display = 'none';
	updateScoreDisplays();
}

choiceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const userChoice = e.currentTarget.id;
        playGame(userChoice);
    });
});

resetButton.addEventListener('click', resetGame);

updateScoreDisplays();
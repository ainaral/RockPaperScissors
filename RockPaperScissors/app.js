const game = ()=> {
    let pScore = 0;
    let cScore = 0;
    resultHistory = [];

// Start the game
const startGame = () =>{
    const playBtn = document.querySelector('.intro button');
    const introScreen = document.querySelector('.intro');
    const match = document.querySelector('.match');

    playBtn.addEventListener('click', () => {
        introScreen.classList.add("fadeOut");
        match.classList.add("fadeIn");
        });
    };

// Play match
const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll('.hands img');

    hands.forEach(hand =>{
        hand.addEventListener('animationend', function(){
            this.style.animation = '';
        });
    });

// function to disable buttons
const disableBtns = (option) => {
    option.disabled = true;
    setTimeout(() => {
        option.disabled = false;
    }, 2000);
}


// computer options
const computerOptions = ['rock', 'paper', 'scissors'];

    options.forEach(option => {
        option.addEventListener('click', function(){
        // computer choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        console.log(computerChoice);

        setTimeout(() => {
        // Here is where we call compare hands
            compareHands(this.textContent, computerChoice)
        // update images
            playerHand.src = `./images/${this.textContent}.png`;
            computerHand.src = `./images/${computerChoice}.png`;
        }, 2000);

        // resetting to rock for next round
        playerHand.src = `./images/rock.png`;
        computerHand.src = `./images/rock.png`;

        // animation
            playerHand.style.animation = "shakePlayer 2s ease";
            computerHand.style.animation = "shakeComputer 2s ease";

        // calling disableBtns function while hands are shaking
        disableBtns(options);
            });
        });  
    };

// compare the scores
// I tried to call in the gameOver function to reset the screen 
const updateScore = () =>{
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    const winner = document.querySelector('.winner');
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    if (pScore === 3){
        if (cScore < 3) {
            winner.textContent = "Player is the winner"
            gameOver();
            return;
        } else {
            winner.textContent = "Computer is the winner";
            cScore == 3;
            gameOver();
            return;
        }
    } if (cScore === 3) {
        if (pScore < 3) {
            winner.textContent = "Computer is the winner"
            gameOver();
            return;
        } else {
            winner.textContent = "Player is the winner"
            gameOver();
            return;
        }
    }
    }

const compareHands = (playerChoice, computerChoice) =>{
    // update text
    const winner = document.querySelector('.winner');
    // checking for a tie
    if(playerChoice === computerChoice){
        winner.textContent = 'It is a tie';
        return;
    }
    // check for Rock
    if(playerChoice === 'rock'){
        if(computerChoice === 'scissors'){
            winner.textContent = 'Player wins'
            pScore++;
            updateScore();
            resultHistory.push(1);
            return;
        }else{
            winner.textContent = 'Computer wins';
            cScore++;
            updateScore();
            resultHistory.push(1);
            return;
        }
    }
    // Check for Paper
    if(playerChoice === 'paper'){
        if(computerChoice === 'scissors'){
            winner.textContent = 'Computer wins'
            cScore++;
            resultHistory.push(1);
            updateScore();
            return;
        }else{
            winner.textContent = 'Player wins';
            pScore++;
            resultHistory.push(1);
            updateScore();
            return;
        };
        };
    // check for Scissors
    if(playerChoice === 'scissors'){
        if(computerChoice === 'rock'){
            winner.textContent = 'Computer wins';
            cScore++;
            resultHistory.push(1);
            updateScore();
            return;
        }else{
            winner.textContent = 'Player wins';
            pScore++;
            resultHistory.push(1);
            updateScore();
            return;
        };
    };
    }; 

// Game over function
// I tried to stop the match but it didn't work
const gameOver = (computerChoice, playerChoice) => {

    while (cScore < 4 ) {
        if ( cScore === 3) {
            break;
        }
        cScore++;
        resultHistory.push(1);
    }
    while (pScore < 4) {
        if (pScore === 3) {
            break;
        }
        pScore++;
        resultHistory.push(1);
    }

    // I made this to block or make dissapear the options when game is over
    playerChoice.forEach(option => {
        option.style.display = "fadeOut"
    }); 
    computerChoice.forEach(option => {
        option.style.display = "fadeOut"
    });

    // I tried to show the gameOver screen with these:
    const playAgainBtn = document.querySelector(".game-over button");
    const gameOverScreen = document.querySelector(".game-over");
    const match = document.querySelector(".match");

    // game over screen
    gameOverScreen.textContent ='Game over!'
    computerChoice = 'none'

    playAgainBtn.addEventListener('click', () => {
        gameOverScreen.classList.add('fadeOut');
        match.classList.add("fadeIn");
    });
};


    //call all the inner function
    startGame();
    playMatch();
};


// start the game function
game();
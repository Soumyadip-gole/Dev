let playerCards = [];
let playerSum = 0;
let isAlive = false;
let hasBlackjack = false;

let dealerCards = [];
let dealerSum = 0;

// DOM Elements
const messageOut = document.getElementById("msg");
const playerCardsOut = document.getElementById("cards");
const playerSumOut = document.getElementById("sum");
const dealerInfo = document.getElementById("dealer-info");
const dealerCardsOut = document.getElementById("dealer-cards");
const dealerSumOut = document.getElementById("dealer-sum");
const startButton = document.getElementById("start-btn");
const newCardButton = document.getElementById("new-card-btn");
const standButton = document.getElementById("stand-btn");

function startGame() {
    resetGame();

    isAlive = true;
    hasBlackjack = false;

    playerCards = [getRandomCard(), getRandomCard()];
    playerSum = calculateSum(playerCards);

    dealerCards = [getRandomCard()];
    dealerSum = calculateSum(dealerCards);

    updateGameUI();
}

function drawNewCard() {
    if (isAlive && !hasBlackjack) {
        const newCard = getRandomCard();
        playerCards.push(newCard);
        playerSum = calculateSum(playerCards);
        updateGameUI();

        if (playerSum > 21) {
            messageOut.textContent = "Busted! You lost.";
            isAlive = false;
            endGame();
        }
    }
}

function stand() {
    isAlive = false;

    while (dealerSum < 17) {
        const newCard = getRandomCard();
        dealerCards.push(newCard);
        dealerSum = calculateSum(dealerCards);
    }

    updateGameUI();
    determineWinner();
}

function determineWinner() {
    if (dealerSum > 21 || playerSum > dealerSum) {
        messageOut.textContent = "Congratulations! You win!";
    } else if (dealerSum === playerSum) {
        messageOut.textContent = "It's a tie!";
    } else {
        messageOut.textContent = "Dealer wins. Better luck next time!";
    }

    endGame();
}

function resetGame() {
    playerCards = [];
    playerSum = 0;
    dealerCards = [];
    dealerSum = 0;
    isAlive = false;
    hasBlackjack = false;

    messageOut.textContent = "Want to play a round?";
    playerCardsOut.textContent = "Cards: ";
    playerSumOut.textContent = "Sum: ";
    dealerCardsOut.textContent = "Dealer's Cards: ";
    dealerSumOut.textContent = "Dealer's Sum: ";
    newCardButton.disabled = true;
    standButton.disabled = true;
    dealerInfo.classList.add("hidden");
}

function getRandomCard() {
    const randomValue = Math.floor(Math.random() * 13) + 1;
    if (randomValue === 1) {
        return 11; // Ace
    } else if (randomValue > 10) {
        return 10; // Face cards (J, Q, K)
    } else {
        return randomValue;
    }
}

function calculateSum(cards) {
    return cards.reduce((sum, card) => sum + card, 0);
}

function updateGameUI() {
    playerCardsOut.textContent = `Cards: ${playerCards.join(" ")}`;
    playerSumOut.textContent = `Sum: ${playerSum}`;

    if (!isAlive) {
        dealerInfo.classList.remove("hidden");
        dealerCardsOut.textContent = `Dealer's Cards: ${dealerCards.join(" ")}`;
        dealerSumOut.textContent = `Dealer's Sum: ${dealerSum}`;
    }

    if (playerSum === 21) {
        messageOut.textContent = "Blackjack! You win!";
        hasBlackjack = true;
        endGame();
    } else if (playerSum < 21) {
        messageOut.textContent = "Pick a new card or stand.";
        newCardButton.disabled = false;
        standButton.disabled = false;
    }
}

function endGame() {
    newCardButton.disabled = true;
    standButton.disabled = true;
}

"use strict";

// Function to get the computed style
const getComputedStyleValue = (element, property) => {
  return window.getComputedStyle(element).getPropertyValue(property);
};

// Store Original Message and Styles
const originalMessage = document.querySelector(".message").textContent;
const bodyElement = document.querySelector("body");
const gameNumber = document.querySelector(".game-number");
const guessInput = document.querySelector(".guess");
const originalStyles = {
  backgroundColor: getComputedStyleValue(bodyElement, "background-color"),
  gameNumberWidth: getComputedStyleValue(gameNumber, "width"),
  gameNumberFontSize: getComputedStyleValue(gameNumber, "font-size"),
};

// Function to handle '.message' DOM Manipulation
const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

// Initialize Game Variables
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
let gameActive = true; // Add a flag to track game status

// Function to check the guess
const checkGuess = () => {
  if (!gameActive) return; // Exit if the game is not active
  const guess = Number(document.querySelector(".guess").value);
  if (score > 1) {
    if (!guess) {
      displayMessage("🙅🏻 No Number!");
    } else if (guess === secretNumber) {
      displayMessage("🎉 Correct Number!");
      gameNumber.textContent = secretNumber;
      bodyElement.style.backgroundColor = "rgb(96, 179, 71)";
      gameNumber.style.width = "40rem";
      gameNumber.style.fontSize = "8rem";
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = highScore;
      }
      gameActive = false; // Set game status to inactive
    } else {
      score--;
      document.querySelector(".score").textContent = score;
      displayMessage(guess > secretNumber ? "🥱 Too High" : "😴 Too Low");
      // Add shake effect
      guessInput.classList.add("shake");
      setTimeout(() => {
        guessInput.classList.remove("shake");
      }, 500);
    }
  } else {
    score = 0;
    document.querySelector(".score").textContent = score;
    displayMessage("😭 You Lose the Game");
    bodyElement.style.backgroundColor = "#e03131";
  }
};

// Function to reset the game
const resetGame = () => {
  gameActive = true;
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  gameNumber.textContent = "?";
  displayMessage(originalMessage);
  bodyElement.style.backgroundColor = originalStyles.backgroundColor;
  gameNumber.style.width = originalStyles.gameNumberWidth;
  gameNumber.style.fontSize = originalStyles.gameNumberFontSize;
};

// Event Listeners
document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);

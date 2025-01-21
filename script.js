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
let score;
let maxGuesses;
let gameActive = true;
// Object to store high scores for each difficulty
const highScores = {
  2: 0, // God
  5: 0, // Hard
  10: 0, // Normal
  15: 0, // Beginner
};

// Function to set the difficulty
const setDifficulty = () => {
  const difficulty = document.getElementById("difficulty").value;
  maxGuesses = Number(difficulty);
  score = maxGuesses;
  document.querySelector(".score").textContent = score;
  document.querySelector(".highscore").textContent = highScores[difficulty];
};

// Set initial difficulty to 'Beginner' (15 guesses)
document.getElementById("difficulty").value = "15";
setDifficulty();

// Event listener for difficulty change
document.getElementById("difficulty").addEventListener("change", () => {
  setDifficulty();
  resetGame(); // Reset game when difficulty changes
});

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
      const difficulty = document.getElementById("difficulty").value;
      if (score > highScores[difficulty]) {
        highScores[difficulty] = score;
        document.querySelector(
          ".highscore"
        ).textContent = `${score} / ${maxGuesses}`;
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
    gameActive = false; // Set game status to inactive
  }
};

// Function to reset the game
const resetGame = () => {
  gameActive = true;
  score = maxGuesses;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  gameNumber.textContent = "?";
  displayMessage(originalMessage);
  bodyElement.style.backgroundColor = originalStyles.backgroundColor;
  gameNumber.style.width = originalStyles.gameNumberWidth;
  gameNumber.style.fontSize = originalStyles.gameNumberFontSize;
};

// Initialize Display Values
document.querySelector(".score").textContent = score;

// Event Listeners
document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);
guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess(); // Trigger the guess check when Enter key is pressed
  }
});

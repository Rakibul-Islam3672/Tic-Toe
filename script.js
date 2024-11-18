// script.js
document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
  
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = Array(9).fill(null);
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    function renderBoard() {
      board.innerHTML = "";
      gameState.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (cell) cellElement.classList.add("taken");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        board.appendChild(cellElement);
      });
    }
  
    function handleCellClick(index) {
      if (gameState[index] || !gameActive) return;
  
      gameState[index] = currentPlayer;
      renderBoard();
  
      if (checkWin()) {
        message.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }
  
      if (gameState.every(cell => cell)) {
        message.textContent = "It's a Draw!";
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s Turn`;
    }
  
    function checkWin() {
      return winningCombinations.some(combination =>
        combination.every(index => gameState[index] === currentPlayer)
      );
    }
  
    restartButton.addEventListener("click", () => {
      currentPlayer = "X";
      gameActive = true;
      gameState = Array(9).fill(null);
      message.textContent = `Player ${currentPlayer}'s Turn`;
      renderBoard();
    });
  
    renderBoard();
    message.textContent = `Player ${currentPlayer}'s Turn`;
  });
  
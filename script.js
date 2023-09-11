//Factory function that creates new players.
const Player = (name, symbol) => {
  return { name, symbol };
};

//Module that houses the logic for the game board.
const gameBoard = (() => {
  //Array to store players symbols.
  let board = ["", "", "", "", "", "", "", "", ""];

  //Function to retrieve the board in another module.
  const getBoard = () => board;

  //Function that displays the game board.
  const displayBoard = () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (!gameFlow.isGameOver() && cell.textContent === "") {
          board[index] = gameFlow.getCurrentPlayer();
          cell.textContent = gameFlow.getCurrentPlayer();
          gameFlow.PlayerTurn();
          gameFlow.display.textContent = `Player ${gameFlow.getCurrentPlayer()}'s Turn`;
          gameFlow.checkWinner();
          console.log(board);
        }
      });
    });
  };

  //Function to reset the game board.
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.textContent = "";
    });
  };

  return { displayBoard, getBoard, resetBoard };
})();

//Module to control the flow of the game.
const gameFlow = (() => {
  //Creates new players and sets the current player.
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let activePlayer = player1;

  //function that handles the players turns.
  const PlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  //function to get the current players symbol.
  const getCurrentPlayer = () => {
    return activePlayer.symbol;
  };

  //Dom element for  display.
  const display = document.querySelector(".display");
  display.textContent = `Player ${getCurrentPlayer()}'s Turn`;

  //variable to indicate if game is over.
  let gameOver = false;

  //Function to retrieve gameOver variable.
  const isGameOver = () => {
    return gameOver;
  };

  //Function to declare winner or tie.
  const checkWinner = () => {
    //Variable to indicate if a winner is declared or not.
    let winnerDeclared = false;

    //Array of arrays depicting all possible win conditions.
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //For loop looping through win conditions.
    for (condition of winConditions) {
      const [a, b, c] = condition;
      const cellA = gameBoard.getBoard()[a];
      const cellB = gameBoard.getBoard()[b];
      const cellC = gameBoard.getBoard()[c];

      //If statement to determine winner.
      if (cellA && cellA === cellB && cellA === cellC) {
        winnerDeclared = true;
        gameOver = true;
        display.textContent = `${
          cellA === "X" ? "Player 1" : "Player 2"
        } Wins!`;
        console.log(`${cellA === "X" ? "Player 1" : "Player 2"} Wins!`);
        return;
      }
    }

    //If statement to declare tie.
    const allCellsFilled = gameBoard.getBoard().every((cell) => cell !== "");
    if (allCellsFilled === true && winnerDeclared === false) {
      display.textContent = "It's a Tie!";
      console.log("It's A Tie!");
    }
  };

  //Event Listener to reset game.
  const resetBtn = document.querySelector(".resetBtn");
  resetBtn.addEventListener("click", () => {
    gameBoard.resetBoard();
    activePlayer = player1;
    display.textContent = `Player ${getCurrentPlayer()}'s Turn`;
    winnerDeclared = false;
    gameOver = false;
  });

  return { getCurrentPlayer, PlayerTurn, checkWinner, isGameOver, display };
})();

gameBoard.displayBoard();

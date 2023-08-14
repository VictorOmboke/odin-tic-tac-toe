//Factory function that creates new players.
const Player = (name, symbol) => {
  return { name, symbol };
};

//Module that houses the logic for the game board.
const gameBoard = (() => {
  const board = [];

  //Function that displays the game board.
  const displayBoard = () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "") {
          board[index] = gameFlow.getCurrentPlayer();
          cell.textContent = gameFlow.getCurrentPlayer();
          gameFlow.PlayerTurn();
          console.log(board);
        }
      });
    });
  };

  return { displayBoard };
})();

gameBoard.displayBoard();

//Module to control the flow of the game.
const gameFlow = (() => {
  //Creates new players and sets the current player
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "O");
  let activePlayer = player1;

  //function that handles the players turns
  const PlayerTurn = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  //function to get the current players symbol
  const getCurrentPlayer = () => {
    return activePlayer.symbol;
  };

  return { getCurrentPlayer, PlayerTurn };
})();

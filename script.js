//Module that houses the logic for the game board.
const gameBoard = (() => {
  const board = [];

  const displayBoard = () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "") {
          const currentPlayer = getCurrentPlayer();
          board[index] = currentPlayer;
          cell.textContent = currentPlayer;
          console.log(board);
        }
      });
    });

    const getCurrentPlayer = () => {
      const radioX = document.getElementById("chooseX");
      return radioX.checked ? "X" : "O";
    };
  };

  return { displayBoard };
})();

gameBoard.displayBoard();

//Factory function that creates new players.
const Player = (name, symbol) => {
  return { name, symbol };
};

//Module to control the flow of the game.
const game = (() => {})();

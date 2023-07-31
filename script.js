//Module that houses the logic for the game board.
const gameBoard = (() => {
  const board = ["X", "O", "O", "X", "X", "O", "O", "X", "X"];

  const getBoard = () => board;

  const displayBoard = () => {
    for (let i = 0; i < board.length; i++) {
      const cells = document.querySelectorAll(".cell");
      cells[i].textContent = board[i];
      console.log(board[i]);
    }
  };

  return { getBoard, displayBoard };
})();

gameBoard.displayBoard();

//Factory function that creates new players.
const Player = (name, symbol) => {
  return { name, symbol };
};

//Module to control the flow of the game.
const game = (() => {})();

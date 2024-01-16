const cells = document.querySelectorAll('.cell');
const winnerMessage = document.querySelector('.winner-message');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

const handleCellClick = (cellIndex) => {
  if (gameBoard[cellIndex] || winnerMessage.textContent !== '') {
    return;
  }

  gameBoard[cellIndex] = currentPlayer;
  cells[cellIndex].textContent = currentPlayer;

  checkForWinner();

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  document.querySelector('.game-info p').textContent = `Next player: ${currentPlayer}`;
};

const checkForWinner = () => {
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

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winnerMessage.textContent = `Player ${gameBoard[a]} wins!`;
      return;
    }
  }

  if (!gameBoard.includes(null)) {
    winnerMessage.textContent = 'The game is a draw!';
  }
};

cells.forEach((cell) => cell.addEventListener('click', () => {
  handleCellClick(parseInt(cell.dataset.cellIndex));
}));

resetButton.addEventListener('click', () => {
  gameBoard = Array(9).fill(null);
  cells.forEach((cell) => cell.textContent = '');
  winnerMessage.textContent = '';
  currentPlayer = 'X';
  document.querySelector('.game-info p').textContent = 'Next player: X';
});

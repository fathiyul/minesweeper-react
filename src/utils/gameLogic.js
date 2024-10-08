export function createBoard(width, height) {
  return Array(height).fill().map(() => Array(width).fill().map(() => ({
    isMine: false,
    isRevealed: false,
    isFlagged: false,
    adjacentMines: 0
  })));
}

export function placeMines(board, mines, firstClickX, firstClickY) {
  const width = board[0].length;
  const height = board.length;
  let minesPlaced = 0;

  while (minesPlaced < mines) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    // Ensure we don't place a mine on the first clicked cell or its neighbors
    if (!board[y][x].isMine && (Math.abs(x - firstClickX) > 1 || Math.abs(y - firstClickY) > 1)) {
      board[y][x].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate adjacent mines
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      board[y][x].adjacentMines = countAdjacentMines(board, x, y);
    }
  }

  return board;
}

function countAdjacentMines(board, x, y) {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  return directions.reduce((count, [dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
      if (board[newY][newX].isMine) count++;
    }
    return count;
  }, 0);
}

export function revealCell(board, x, y) {
  if (board[y][x].isRevealed || board[y][x].isFlagged) return board;
  
  board = board.map(row => row.map(cell => ({...cell})));
  board[y][x].isRevealed = true;
  
  if (board[y][x].adjacentMines === 0) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];
    
    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < board[0].length && newY >= 0 && newY < board.length) {
        if (!board[newY][newX].isRevealed) {
          board = revealCell(board, newX, newY);
        }
      }
    });
  }
  
  return board;
}

export function toggleFlag(board, x, y) {
  if (board[y][x].isRevealed) return board;
  
  board = board.map(row => row.map(cell => ({...cell})));
  board[y][x].isFlagged = !board[y][x].isFlagged;
  return board;
}

export function checkWin(board) {
  return board.every(row => row.every(cell => 
    cell.isRevealed || cell.isMine
  ));
}

export function checkLoss(board) {
  return board.some(row => row.some(cell => 
    cell.isRevealed && cell.isMine
  ));
}
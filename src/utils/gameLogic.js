// Generate a new game board
export function createBoard(width, height, mines) {
    let board = Array(height).fill().map(() => Array(width).fill({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0
    }));
    
    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      if (!board[y][x].isMine) {
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
  
  // Count adjacent mines for a cell
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
  
  // Reveal a cell and handle cascading reveals
  export function revealCell(board, x, y) {
    if (board[y][x].isRevealed || board[y][x].isFlagged) return board;
    
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
  
  // Check if the game is won
  export function checkWin(board) {
    return board.every(row => row.every(cell => 
      cell.isRevealed || cell.isMine
    ));
  }
  
  // Check if the game is lost (a mine was revealed)
  export function checkLoss(board) {
    return board.some(row => row.some(cell => 
      cell.isRevealed && cell.isMine
    ));
  }
  
  // Toggle flag on a cell
  export function toggleFlag(board, x, y) {
    if (!board[y][x].isRevealed) {
      board[y][x].isFlagged = !board[y][x].isFlagged;
    }
    return board;
  }
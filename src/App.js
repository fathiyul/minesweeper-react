import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import { createBoard, revealCell, toggleFlag, checkWin, checkLoss } from './utils/gameLogic';
import './styles/Game.css';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('not started');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newBoard = createBoard(10, 10, 10);  // 10x10 board with 10 mines
    setBoard(newBoard);
    setGameStatus('ongoing');
  };

  const handleCellClick = (x, y) => {
    if (gameStatus !== 'ongoing') return;

    const newBoard = revealCell([...board], x, y);
    setBoard(newBoard);

    if (checkLoss(newBoard)) {
      setGameStatus('lost');
    } else if (checkWin(newBoard)) {
      setGameStatus('won');
    }
  };

  const handleCellRightClick = (x, y) => {
    if (gameStatus !== 'ongoing') return;

    const newBoard = toggleFlag([...board], x, y);
    setBoard(newBoard);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Minesweeper</h1>
      </header>
      <main>
        <Board 
          board={board} 
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />
        <div>Game Status: {gameStatus}</div>
        <button onClick={startNewGame}>New Game</button>
      </main>
    </div>
  );
};

export default App;
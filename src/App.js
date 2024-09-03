import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import { createBoard, revealCell, toggleFlag, checkWin, checkLoss } from './utils/gameLogic';
import './styles/Game.css';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('not started');
  const [mineCount, setMineCount] = useState(10);
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);

  const startNewGame = useCallback(() => {
    const newBoard = createBoard(10, 10, mineCount);
    setBoard(newBoard);
    setGameStatus('ongoing');
    setFlagCount(0);
    setTime(0);
  }, [mineCount]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  useEffect(() => {
    let timer;
    if (gameStatus === 'ongoing') {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStatus]);

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
    
    const newFlagCount = newBoard[y][x].isFlagged 
      ? flagCount + 1 
      : flagCount - 1;
    setFlagCount(newFlagCount);
  };

  const handleDifficultyChange = (newMineCount) => {
    setMineCount(newMineCount);
    startNewGame();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Minesweeper</h1>
      </header>
      <main>
        <div className="game-info">
          <div>💣 {mineCount - flagCount}</div>
          <div>⏱️ {time}</div>
          <div>{gameStatus.toUpperCase()}</div>
        </div>
        {board.length > 0 && (
          <Board 
            board={board} 
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
          />
        )}
        <div className="controls">
          <button onClick={startNewGame}>New Game</button>
          <select onChange={(e) => handleDifficultyChange(Number(e.target.value))}>
            <option value="10">Easy (10 mines)</option>
            <option value="20">Medium (20 mines)</option>
            <option value="30">Hard (30 mines)</option>
          </select>
        </div>
        {(gameStatus === 'won' || gameStatus === 'lost') && (
          <div className="game-over">
            {gameStatus === 'won' ? 'You Won!' : 'Game Over!'}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
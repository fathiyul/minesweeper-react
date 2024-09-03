import React, { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import { createBoard, placeMines, revealCell, toggleFlag, checkWin, checkLoss } from './utils/gameLogic';
import './styles/Game.css';

import clickSound from './sounds/click.wav';
import flagSound from './sounds/flag.wav';
import gameoverSound from './sounds/gameover.wav';

const App = () => {
  const [board, setBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState('not started');
  const [mineCount, setMineCount] = useState(10);
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('minesweeperHighScores');
    return saved ? JSON.parse(saved) : { easy: Infinity, medium: Infinity, hard: Infinity };
  });

  const playSound = (sound) => {
    new Audio(sound).play();
  };

  const startNewGame = useCallback(() => {
    const newBoard = createBoard(10, 10);
    setBoard(newBoard);
    setGameStatus('ongoing');
    setFlagCount(0);
    setTime(0);
    setIsFirstClick(true);
  }, []);

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

    let newBoard = [...board];

    if (isFirstClick) {
      newBoard = placeMines(newBoard, mineCount, x, y);
      setIsFirstClick(false);
    }

    newBoard = revealCell(newBoard, x, y);
    setBoard(newBoard);
    playSound(clickSound);

    if (checkLoss(newBoard)) {
      setGameStatus('lost');
      playSound(gameoverSound);
    } else if (checkWin(newBoard)) {
      setGameStatus('won');
      playSound(gameoverSound);
      updateHighScore();
    }
  };

  const handleCellRightClick = (x, y) => {
    if (gameStatus !== 'ongoing') return;

    const newBoard = toggleFlag([...board], x, y);
    setBoard(newBoard);
    playSound(flagSound);
    
    const newFlagCount = newBoard[y][x].isFlagged 
      ? flagCount + 1 
      : flagCount - 1;
    setFlagCount(newFlagCount);
  };

  const handleDifficultyChange = (newMineCount) => {
    setMineCount(newMineCount);
    startNewGame();
  };

  const updateHighScore = () => {
    let difficulty;
    if (mineCount === 10) difficulty = 'easy';
    else if (mineCount === 20) difficulty = 'medium';
    else difficulty = 'hard';

    if (time < highScores[difficulty]) {
      const newHighScores = { ...highScores, [difficulty]: time };
      setHighScores(newHighScores);
      localStorage.setItem('minesweeperHighScores', JSON.stringify(newHighScores));
    }
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
        <div className="high-scores">
          <h2>High Scores</h2>
          <p>Easy: {highScores.easy === Infinity ? '-' : highScores.easy}s</p>
          <p>Medium: {highScores.medium === Infinity ? '-' : highScores.medium}s</p>
          <p>Hard: {highScores.hard === Infinity ? '-' : highScores.hard}s</p>
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
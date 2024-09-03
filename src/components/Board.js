import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick, onCellRightClick }) => {
  if (!board || board.length === 0 || board[0].length === 0) {
    return <div>Loading board...</div>;
  }

  const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${board[0].length}, 30px)`,
    gap: '1px',
    padding: '10px',
    backgroundColor: '#999',
    border: '2px solid #333',
  };

  return (
    <div style={boardStyle}>
      {board.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            cell={cell}
            onClick={() => onCellClick(x, y)}
            onContextMenu={(e) => {
              e.preventDefault();
              onCellRightClick(x, y);
            }}
          />
        ))
      )}
    </div>
  );
};

export default Board;
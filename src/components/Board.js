import React from 'react';
import Cell from './Cell';

const Board = ({ board, onCellClick, onCellRightClick }) => {
  if (!board || board.length === 0 || board[0].length === 0) {
    return <div>Loading board...</div>;
  }

  return (
    <div className="board" style={{
      gridTemplateColumns: `repeat(${board[0].length}, auto)`
    }}>
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
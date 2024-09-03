import React from 'react';

const Cell = ({ cell, onClick, onContextMenu }) => {
  const cellContent = () => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return null;
    if (cell.isMine) return '💣';
    if (cell.adjacentMines === 0) return null;
    return cell.adjacentMines;
  };

  const getCellClass = () => {
    let className = 'cell';
    if (cell.isRevealed) className += ' revealed';
    if (cell.isRevealed && cell.isMine) className += ' mine';
    return className;
  };

  const getContentStyle = () => {
    if (!cell.isRevealed || cell.isMine || cell.isFlagged) return {};
    const colors = ['blue', 'green', 'red', 'purple', 'maroon', 'turquoise', 'black', 'gray'];
    return { color: colors[cell.adjacentMines - 1] };
  };

  return (
    <div
      className={getCellClass()}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <span style={getContentStyle()}>{cellContent()}</span>
    </div>
  );
};

export default Cell;
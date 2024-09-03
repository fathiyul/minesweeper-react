import React from 'react';

const Cell = ({ cell, onClick, onContextMenu }) => {
  const cellContent = () => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return null;
    if (cell.isMine) return '💣';
    if (cell.adjacentMines === 0) return null;
    return cell.adjacentMines;
  };

  const cellStyle = {
    width: '30px',
    height: '30px',
    border: '1px solid #999',
    backgroundColor: cell.isRevealed ? '#ccc' : '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div
      style={cellStyle}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {cellContent()}
    </div>
  );
};

export default Cell;
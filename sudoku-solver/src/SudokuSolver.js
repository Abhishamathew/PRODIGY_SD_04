import React, { useState } from 'react';
import './CSS/Sudoku.css';

const SudokuSolver = () => {
  const initialGrid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ];

  const [grid, setGrid] = useState(initialGrid);

  const solveSudoku = () => {
    const isSafe = (row, col, num) => {
      for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num || grid[row - (row % 3) + Math.floor(x / 3)][col - (col % 3) + (x % 3)] === num) {
          return false;
        }
      }
      return true;
    };

    const solve = () => {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (grid[row][col] === null) {
            for (let num = 1; num <= 9; num++) {
              if (isSafe(row, col, num)) {
                grid[row][col] = num;
                if (solve()) {
                  return true;
                }
                grid[row][col] = null;
              }
            }
            return false;
          }
        }
      }
      return true;
    };

    if (solve()) {
      setGrid([...grid]);
    } else {
      alert('No solution exists.');
    }
  };

  const renderGrid = () => {
    return (
      <table className="sudoku-grid">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="sudoku-container">
      <h1>Sudoku Solver</h1>
      {renderGrid()}
      <button onClick={solveSudoku}>Solve Sudoku</button>
    </div>
  );
};

export default SudokuSolver;

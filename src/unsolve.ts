import { Grid, Position } from './types';
import { shuffleArray } from './shuffle';
import { solve } from './solve';
import { generateCandidates } from './candidates';

export const unsolve = (grid: Grid): [Grid, number] => {
  const newGrid: Grid = grid.map(row => row.map(cell => ({ ...cell })));
  let filledCells = newGrid
    .map((row, i) => row.map((cell, j) => ({ cell, pos: [i, j] as Position })))
    .flat()
    .filter(({ cell }) => cell.value !== 0);
  shuffleArray(filledCells);
  let index = 0;
  while (index < filledCells.length) {
    const { cell, pos } = filledCells[index];
    const value = cell.value;
    cell.value = 0;
    const unique = solve(newGrid, true);
    if (unique) {
      index++;
      newGrid[pos[0]][pos[1]].value = 0;
      filledCells = newGrid
        .map((row, i) => row.map((cell, j) => ({ cell, pos: [i, j] as Position })))
        .flat()
        .filter(({ cell }) => cell.value !== 0);
      shuffleArray(filledCells);
    } else {
      cell.value = value;
      // index--;
    }
  }
  return [newGrid, newGrid.flat().filter(cell => cell.value === 0).length];
};

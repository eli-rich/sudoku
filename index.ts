import { Grid, Puzzle } from './src/types';

import { generateCells } from './src/load';
import { solve } from './src/solve';
import { unsolve } from './src/unsolve';

const printGrid = (grid: Grid): void => {
  grid.forEach(row => {
    console.log(row.map(c => c.value).join(' | '));
  });
};

const generateRandomPuzzle = (): Grid => {
  const puzzle: Puzzle = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));
  const grid = generateCells(puzzle);
  solve(grid, false, true);
  return grid;
};

export const sudoku = {
  load: (puzzle: Puzzle): Grid => generateCells(puzzle),
  solve: (grid: Grid): boolean => solve(grid),
  unsolve: (grid: Grid): [Grid, number] => unsolve(grid),
  generate: (): Grid => generateRandomPuzzle(),
  print: (grid: Grid): void => printGrid(grid),
};

export default sudoku;

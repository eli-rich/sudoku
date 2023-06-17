import { Grid } from './types';
import { generateCandidates } from './candidates';

const isValidCandidate = (grid: Grid, pos: number[], candidate: number): boolean => {
  const [row, column] = pos;
  const cellRow = grid[row];
  const cellColumn = grid.map(row => row[column]);
  const cellBox = grid
    .slice(3 * Math.floor(row / 3), 3 * Math.floor(row / 3) + 3)
    .map(row => row.slice(3 * Math.floor(column / 3), 3 * Math.floor(column / 3) + 3))
    .flat();
  return (
    !cellRow.some(cell => cell.value === candidate) &&
    !cellColumn.some(cell => cell.value === candidate) &&
    !cellBox.some(cell => cell.value === candidate)
  );
};

export const solve = (
  grid: Grid,
  verify: boolean = false,
  generating: boolean = false,
): boolean => {
  const emptyCells = grid
    .map((row, i) => row.map((cell, j) => ({ cell, pos: [i, j] })))
    .flat()
    .filter(({ cell }) => cell.value === 0);
  let index = 0;
  let solutions = 0;
  // generate initial candidates
  generateCandidates(grid, generating);
  const shouldTry = new Map<number, number[]>();
  const initials = new Map<number, number[]>();
  for (let i = 0; i < emptyCells.length; i++) {
    shouldTry.set(i, emptyCells[i].cell.candidates);
    initials.set(i, [...emptyCells[i].cell.candidates]);
  }
  while (index < emptyCells.length) {
    if (verify && index < 0) return solutions === 1;
    const { cell, pos } = emptyCells[index];
    const candidates = shouldTry.get(index)!;
    const candidate = candidates.shift();
    if (candidate === undefined) {
      // backtrack
      cell.value = 0;
      shouldTry.set(index, [...initials.get(index)!]);
      index--;
      generateCandidates(grid, generating);
    } else {
      if (!isValidCandidate(grid, pos, candidate)) continue;
      cell.value = candidate;
      generateCandidates(grid, generating);
      index++;
      if (!verify) continue;
      if (index === emptyCells.length) {
        solutions++;
        if (solutions > 1) return false;
        shouldTry.set(index, [...initials.get(index - 1)!]);
        index--;
      }
    }
  }
  return solutions === 1;
};

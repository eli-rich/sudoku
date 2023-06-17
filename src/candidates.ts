import { generateSubsections } from './load';
import { Grid, Position, SubSections } from './types';
import { shuffleArray } from './shuffle';

const getCandidates = (pos: Position, subs: SubSections, generating: boolean = false): number[] => {
  const [row, column] = pos;

  const cellRow = subs.rows[row];
  const cellColumn = subs.columns[column];
  const cellBox = subs.boxes[3 * Math.floor(row / 3) + Math.floor(column / 3)];

  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(candidate => {
    return (
      !cellRow.some(cell => cell.value === candidate) &&
      !cellColumn.some(cell => cell.value === candidate) &&
      !cellBox.some(cell => cell.value === candidate)
    );
  });
  if (generating) shuffleArray(candidates);
  return candidates;
};

export const generateCandidates = (grid: Grid, generating: boolean = false): void => {
  const subs = generateSubsections(grid);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = grid[i][j];
      if (cell.value === 0) cell.candidates = getCandidates([i, j], subs, generating);
    }
  }
};

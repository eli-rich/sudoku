import { Cell, Puzzle, Grid, Box, Row, Column, SubSections } from './types';
export const generateCells = (puzzle: Puzzle): Grid => {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    const row = puzzle[i];
    const gridRow: Row = [];
    for (let j = 0; j < 9; j++) {
      const cell: Cell = { value: row[j], candidates: [] };
      gridRow.push(cell);
    }
    grid.push(gridRow);
  }
  return grid;
};

export const generateSubsections = (grid: Grid): SubSections => {
  const rows: Row[] = [];
  const columns: Column[] = [];
  const boxes: Box[] = [];
  for (let i = 0; i < 9; i++) {
    const row: Row = [];
    const column: Column = [];
    const box: Box = [];
    for (let j = 0; j < 9; j++) {
      row.push(grid[i][j]);
      column.push(grid[j][i]);
      box.push(grid[3 * Math.floor(i / 3) + Math.floor(j / 3)][3 * (i % 3) + (j % 3)]);
    }
    rows.push(row);
    columns.push(column);
    boxes.push(box);
  }
  return { rows, columns, boxes };
};

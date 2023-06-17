import sudoku from './index';

const puzzle = `
800000000
003600000
070090200
050007000
000045700
000100030
001000068
008500010
090000400
`
  .trim()
  .split('\n')
  .map(row => row.split('').map(cell => parseInt(cell, 10)));

const grid = sudoku.load(puzzle);
// sudoku.print(grid);
console.log(sudoku.solve(grid));
sudoku.print(grid);

// const grid = sudoku.generate();
// sudoku.print(grid);
// const [unsolved, removed] = sudoku.unsolve(grid);
// console.log(removed);
// sudoku.print(unsolved);

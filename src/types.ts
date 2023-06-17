export type Position = [number, number];

export type Cell = {
  value: number;
  candidates: number[];
};

export type Puzzle = number[][];

export type Row = Cell[];
export type Column = Cell[];

export type Box = Cell[];

export type Grid = Cell[][];

export type SubSections = {
  rows: Row[];
  columns: Column[];
  boxes: Box[];
};

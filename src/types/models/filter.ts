export interface IFilterRange {
  type: 'range';
  rangeMin: number;
  rangeMax: number;
  valueMin: number;
  valueMax: number;
}

export type Filters = IFilterRange;

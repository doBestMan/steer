const zIndexBase = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
  6: 600,
  7: 700,
  8: 800,
  9: 900,
  10: 1000,
  behind: -1,
  betweenZeroTop: 1,
};

export enum Z_INDEX {
  // common
  BEHIND = zIndexBase.behind,
  ZERO = zIndexBase['0'],
  FRONT = zIndexBase['1'],
  TOP = zIndexBase['2'],
  BETWEEN_ZERO_TOP = zIndexBase.betweenZeroTop,
  // custom
  NAV = zIndexBase['5'],
  MODAL = zIndexBase['9'],
  GLOBAL_TOAST = zIndexBase['10'],
  GRID_HELPER = zIndexBase['10'],
  LOADING_BAR = zIndexBase['10'],
  SKIP_LINK = zIndexBase['10'],
}

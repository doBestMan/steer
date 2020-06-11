import { CSSObject } from '@emotion/core';

import {
  COLORS,
  GAP_COLUMNS,
  GRID_MARGIN,
  MQ,
  NB_COLUMNS,
  RADIUS,
  SPACING,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const BUTTON_SIZE_S = 90;
const BUTTON_SIZE_M = 120;
const BUTTON_SIZE_L = 140;

// To find paddingLeft:
// Width of one grid column + left grid margin + one gutter.
//
// To calculate column width:
// 100%
// - 60px * 2 (outside margins)
// - 30px * 11 (gutters)
// / 12 (number of columns)
const PADDING_LEFT_L = `(100% - (${GRID_MARGIN.L}px * 2) - (${
  GAP_COLUMNS.L
}px * ${NB_COLUMNS.L - 1})) / ${NB_COLUMNS.L} + ${GRID_MARGIN.L}px + ${
  GAP_COLUMNS.L
}px`;

const styles: CSSObject = {
  carouselButton: {
    '&:focus:not(:active)': {
      backgroundColor: COLORS.ORANGE.SHADE_30,
      borderColor: COLORS.GLOBAL.BLACK,
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: COLORS.ORANGE.SHADE_30,
    },
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE.SHADE_15,
    border: '3px inset transparent',
    borderRadius: RADIUS.CIRCLE,
    display: 'flex',
    height: BUTTON_SIZE_S,
    justifyContent: 'center',
    transition: `background-color ${TIME.MS100}ms ease, border-color ${TIME.MS100}ms ease`,
    width: BUTTON_SIZE_S,
    [MQ.M]: {
      height: BUTTON_SIZE_M,
      width: BUTTON_SIZE_M,
    },
    [MQ.M]: {
      height: BUTTON_SIZE_L,
      width: BUTTON_SIZE_L,
    },
  },
  carouselItem: {
    '&.swiper-slide': {
      width: 'initial',
    },
    '&:first-child': {
      marginLeft: GRID_MARGIN.S,
    },
    paddingRight: SPACING.SIZE_15,
    [MQ.M]: {
      '&:first-child': {
        marginLeft: GRID_MARGIN.M,
      },
      paddingRight: SPACING.SIZE_20,
    },
    [MQ.L]: {
      '&:first-child': {
        marginLeft: `calc(${PADDING_LEFT_L})`,
      },
      paddingRight: SPACING.SIZE_30,
    },
  },
  eyebrow: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
      },
    },
  ],
  resultsGrid: {
    width: '100%',
  },
};

export default styles;

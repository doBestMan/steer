import {
  BORDERS,
  COLORS,
  MQ,
  SPACING,
  StylesMap,
  THEME,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const SIDE_MARGIN = {
  S: SPACING.SIZE_20,
  M: SPACING.SIZE_40,
  L: SPACING.SIZE_60,
};

export const STICKY_BAR_HEIGHT = {
  S: 90,
  M: 90,
  L: 100,
};

export const primaryColumnStyles: StylesMap = {
  primaryButton: {
    justifyContent: 'center',

    ':not(:first-of-type):not(:only-child)': {
      flex: 1,
    },

    ':only-child': {
      flex: 'inherit',
      width: '100%',

      [MQ.L]: {
        width: '90%',
      },
    },

    [MQ.M]: {
      flex: 1,
    },
  },
  primaryLabel: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      marginRight: SPACING.SIZE_10,
      minWidth: '25%',

      [MQ.M]: {
        marginRight: SPACING.SIZE_20,
        minWidth: '33.333%',
      },
      [MQ.L]: {
        textAlign: 'center',
      },
    },
  ],
  primaryLink: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      justifyContent: 'space-between',
      width: '100%',

      [MQ.L]: {
        justifyContent: 'inherit',
        width: '90%',
      },
    },
  ],
  rightAlign: {
    marginLeft: 'auto',
  },
  secondaryButton: {
    justifyContent: 'center',
    marginRight: SPACING.SIZE_10,
    minWidth: '25%',

    [MQ.M]: {
      minWidth: '33.333%',
      marginRight: SPACING.SIZE_20,
    },
  },
};

const styles: StylesMap = {
  container: {
    borderTop: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    height: STICKY_BAR_HEIGHT.S,
    justifyContent: 'space-between',
    paddingBottom: `calc(${SIDE_MARGIN.S}px + env(safe-area-inset-bottom) / 2)`,
    paddingLeft: SIDE_MARGIN.S,
    paddingRight: SIDE_MARGIN.S,
    paddingTop: SIDE_MARGIN.S,
    transition: `background-color ${TIME.MS400}ms ease`,
    zIndex: Z_INDEX.FRONT,

    [MQ.M]: {
      alignItems: 'center',
      height: STICKY_BAR_HEIGHT.M,
      padding: `0 ${SIDE_MARGIN.M}px 0`,
    },
    [MQ.L]: {
      height: STICKY_BAR_HEIGHT.L,
      padding: `0 ${SIDE_MARGIN.L}px 0`,
    },
  },
  icon: {
    color: COLORS.GLOBAL.WHITE,
    marginRight: SPACING.SIZE_25,

    [MQ.M]: {
      marginRight: SPACING.SIZE_40,
    },

    [MQ.L]: {
      display: 'none',
    },
  },
  logo: {
    height: 16,
    marginRight: SPACING.SIZE_40,
    width: 'auto',
  },
  primaryColumn: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',

    [MQ.L]: {
      justifyContent: 'flex-end',
      width: '40%',
    },
  },
  secondaryColumn: {
    display: 'none',

    [MQ.L]: {
      alignItems: 'center',
      display: 'flex',
      width: '50%',
    },
  },
  secondaryLabel: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  stickyBottom: {
    bottom: 0,
    position: 'fixed',
    width: '100%',
  },
  stickyTop: {
    position: 'fixed',
    top: 0,
    width: '100%',
  },
  [THEME.DARK]: {
    background: COLORS.GLOBAL.BLACK,
    borderTopColor: COLORS.DARK.GRAY_95,
  },
  [THEME.ORANGE]: {
    background: COLORS.GLOBAL.ORANGE,
    borderTopColor: COLORS.ORANGE.SHADE_15,
  },
};

export default styles;

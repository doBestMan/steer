import { COLORS, MQ, SPACING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const NAV_OFFSET = {
  S: 85,
  M: 120,
  L: 150,
};
const transition = `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`;

const styles: StylesMap = {
  action: {
    alignItems: 'baseline',
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_10,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
    },
  },
  back: {
    alignItems: 'center',
    marginLeft: -SPACING.SIZE_05,
    marginTop: -SPACING.SIZE_05,
    [MQ.L]: {
      position: 'absolute',
      right: SPACING.SIZE_60,
    },
  },
  borderless: {
    borderBottomColor: 'transparent',
  },
  darkHighlighted: {
    '&:active': {
      borderColor: COLORS.DARK.GRAY_40,
      color: COLORS.DARK.GRAY_40,
    },

    '&:hover:not(:active), &:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.WHITE,
      color: COLORS.GLOBAL.WHITE,
    },

    color: COLORS.GLOBAL.WHITE,
    marginBottom: `${SPACING.SIZE_30}px`,
    transition,
  },
  decorator: {
    ':after': {
      content: '"•"',
      fontSize: 10,
      padding: '0 8px',
    },
    alignItems: 'center',
    display: 'flex',
  },
  headerContainer: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.BEHIND,
  },
  info: [
    typography.primarySubhead,
    {
      alignItems: 'baseline',
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
    },
  ],
  label: [
    typography.labelHeadline,
    {
      marginRight: SPACING.SIZE_15,
    },
  ],
  link: {
    color: COLORS.DARK.GRAY_40,
    marginLeft: SPACING.SIZE_05,
  },
  navOffset: {
    paddingTop: NAV_OFFSET.S,
    [MQ.M]: {
      paddingTop: NAV_OFFSET.M,
    },
    [MQ.L]: {
      paddingTop: NAV_OFFSET.L,
    },
  },
  root: {
    color: COLORS.GLOBAL.WHITE,
    padding: SPACING.SIZE_20,
    paddingBottom: 0,
    position: 'relative',
    transition: `all ${TIME.MS300}ms ease`,
    width: '100%',
    zIndex: Z_INDEX.TOP,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_40}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px ${SPACING.SIZE_60}px ${SPACING.SIZE_20}px`,
    },
  },
  sizeWrapper: {
    display: 'flex',
  },
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_10,
      textTransform: 'capitalize',
    },
  ],
};

export default styles;

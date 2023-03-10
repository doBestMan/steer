import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { borderTopWithGap } from '~/styles/borders.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  bordered: [
    borderTopWithGap,
    {
      // No border into gutter for the last column
      ':last-of-type': {
        marginRight: 0,
      },
    },
  ],
  buttonContainer: {
    textAlign: 'center',
  },
  column: {
    alignItems: 'center',
    display: 'flex',
    padding: `${SPACING.SIZE_20}px 0`,
  },
  container: {
    paddingBottom: `${SPACING.SIZE_40}px`,
    width: '100%',
    [MQ.S]: {
      paddingTop: SPACING.SIZE_20,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_60,
    },
  },
  headingText: typography.labelHeadline,
  lastColumn: [
    {
      marginRight: 0,
      justifyContent: 'flex-end',
    },
  ],
  link: {
    display: 'block',
    '&:after': {
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  root: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
  row: {
    color: COLORS.LIGHT.GRAY_70,
    position: 'relative',
    ':hover': {
      color: COLORS.GLOBAL.BLACK,
      td: {
        borderColor: COLORS.GLOBAL.BLACK,
      },
    },
  },
  text: [
    typography.smallCopyTight,
    {
      [MQ.M]: typography.bodyCopy,
    },
  ],
};

export default styles;

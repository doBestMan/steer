import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  description: {
    color: COLORS.DARK.GRAY_40,
    marginBottom: SPACING.SIZE_40,

    [MQ.M]: {
      marginBottom: 0,
    },
  },
  link: {
    marginTop: SPACING.SIZE_40,

    span: { borderBottomColor: 'currentColor' },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
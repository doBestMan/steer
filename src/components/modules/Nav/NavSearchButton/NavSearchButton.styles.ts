import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    display: 'flex',
    [MQ.L]: {
      height: NAV_CONTENT_HEIGHT,
      paddingBottom: SPACING.SIZE_20,
      textAlign: 'left',
      width: '100%',
    },
    [MQ.XL]: {
      marginTop: SPACING.SIZE_01,
    },
  },
  icon: {
    color: COLORS.GLOBAL.BLACK,
    [MQ.L]: {
      marginRight: SPACING.SIZE_10,
    },
  },
};

export default styles;

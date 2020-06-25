import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  container: {
    textAlign: 'center',
  },
  copy: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      [MQ.L]: {
        br: {
          display: 'none',
        },
      },
    },
  ],
  icon: {
    color: COLORS.GLOBAL.ORANGE,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_10,
  },
  subtitle: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,

      [MQ.L]: {
        br: {
          display: 'none',
        },
      },

      span: {
        display: 'block',
      },
    },
  ],
  title: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_30,
    },
  ],
};

export default styles;

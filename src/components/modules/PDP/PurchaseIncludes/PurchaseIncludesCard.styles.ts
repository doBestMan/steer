import { CSSObject } from '@emotion/core';

import { COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  cardContainer: {
    '&.swiper-slide': {
      '&:not(:last-of-type)': {
        marginRight: SPACING.SIZE_15,

        [MQ.L]: {
          marginRight: SPACING.SIZE_30,
        },
      },
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
      borderRadius: RADIUS.RADIUS_15,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: 240,
      padding: SPACING.SIZE_25,
      width: 250,

      [MQ.L]: {
        minHeight: 270,
        width: 300,
        padding: SPACING.SIZE_40,
      },
    },
  },
  cardIcon: {
    alignItems: 'flex-start',
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    height: 34,
  },
  cardLink: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      span: {
        borderColor: COLORS.LIGHT.GRAY_70,
      },

      ':hover, :focus': {
        span: {
          borderColor: COLORS.GLOBAL.BLACK,
        },
      },
    },
  ],
  cardTitle: [
    typography.primarySubhead,
    {
      marginBottom: SPACING.SIZE_10,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
      [MQ.L]: {
        marginBottom: SPACING.SIZE_30,
      },
    },
  ],
};

export default styles;

import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

export const containerSpacing = {
  spacingBottomS50XL60: {
    marginBottom: SPACING.SIZE_50,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  spacingBottomS60XL80: {
    marginBottom: SPACING.SIZE_60,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_80,
    },
  },
  spacingTopS20XL40: {
    marginTop: SPACING.SIZE_20,
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  spacingTopS40XL60: {
    marginTop: SPACING.SIZE_40,
    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  spacingTopS60XL80: {
    marginTop: SPACING.SIZE_60,
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export const styles: StylesMap = {
  bottomBorder: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
  },
  breadcrumbContainer: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
  },
  carouselHeader: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  carouselItem: {
    ':first-of-type': {
      marginLeft: 0,
    },
  },
  reviewContainer: [
    containerSpacing.spacingTopS40XL60,
    {
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  ],
  spacingBottom20: {
    marginBottom: SPACING.SIZE_20,
  },
  spacingBottomS50XL60: [containerSpacing.spacingBottomS50XL60],
  spacingBottomS60XL80: [containerSpacing.spacingBottomS60XL80],
  spacingTop20: {
    marginTop: SPACING.SIZE_20,
  },
  spacingTop40: {
    marginTop: SPACING.SIZE_40,
  },
  spacingTop60: {
    marginTop: SPACING.SIZE_60,
  },
  spacingTopS20XL40: [containerSpacing.spacingTopS20XL40],
  spacingTopS40XL60: [containerSpacing.spacingTopS40XL60],
  spacingTopS60XL80: [containerSpacing.spacingTopS60XL80],
};

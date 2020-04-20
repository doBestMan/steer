import { css } from '@emotion/core';

import { colors, backgroundColors } from '~/styles/global/colors.styles';
import { typography } from '~/styles/global/typography.styles';

import {
  LinkIconPosition,
  LinkSize,
  LinkTheme,
  LinkWeight,
  MQ,
  RADIUS,
  SPACING,
  TIME,
} from '~/lib/constants';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const styles = {
  link: css({
    borderBottom: '2px dotted transparent',
    transition: `border-color ${TIME.MS100}ms ease`,
  }),
  root: css({
    '&:hover span, &:focus span': {
      borderColor: 'inherit',
    },

    alignItems: 'center',
    display: 'flex',
  }),

  // conditional styles
  [LinkIconPosition.LEFT]: css({
    paddingRight: 5,
  }),
  [LinkIconPosition.RIGHT]: css({
    paddingLeft: 5,
  }),
  [LinkTheme.DARK]: [
    colors.DARK.GRAY_40,
    css({
      '&:hover:not(:active)': colors.GLOBAL.WHITE,
    }),
  ],
  [LinkTheme.LIGHT]: [
    colors.GLOBAL.BLACK,
    css({
      '&:active span, &:focus span': colors.LIGHT.GRAY_70,
    }),
  ],
  [LinkSize.REG]: typography.bodyCopy,
  [LinkSize.SM]: typography.smallCopy,
  [LinkWeight.BOLD]: css({
    fontWeight: 'bold',
  }),
  [LinkWeight.NORMAL]: css({
    fontWeight: 'normal',
  }),
};

export const iconCTA = {
  icon: [
    backgroundColors.GLOBAL.ORANGE,
    css({
      alignItems: 'center',
      borderRadius: RADIUS.CIRCLE,
      display: 'flex',
      height: CONSTANTS.SIZE,
      justifyContent: 'center',
      marginRight: SPACING.SIZE_15,
      width: CONSTANTS.SIZE,
    }),
  ],
  root: css({
    display: 'flex',
  }),
};

export const footerLink = [
  colors.LIGHT.GRAY_70,
  typography.bodyCopy,
  css({
    '&:hover': colors.GLOBAL.BLACK,
    display: 'inline-block',
    [MQ.XL]: typography.smallCopy,
  }),
];

export const navLink = [
  colors.LIGHT.GRAY_70,
  typography.tertiaryHeadline,
  css({
    '&:hover span': colors.GLOBAL.BLACK,

    // eslint-disable-next-line sort-keys
    '&:active span, &:focus span': colors.GLOBAL.ORANGE,
    [MQ.XL]: typography.tertiaryHeadline,
  }),
];

export default styles;

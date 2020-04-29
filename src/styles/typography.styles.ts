import { css } from '@emotion/core';

import { MQ } from '~/lib/constants';

export const typography = {
  bodyCopy: css({
    fontFamily: 'Circular Std',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 22 / 15, //'22px',

    [MQ.XL]: {
      fontSize: '1.8rem',
      lineHeight: 25 / 18, //'25px',
    },
  }),
  eyebrow: css({
    fontFamily: 'Circular Std',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 15 / 12, // '15px',
    textTransform: 'uppercase',

    [MQ.XL]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 20 / 15, // 20px',
    },
  }),
  headlineReduced: css({
    fontFamily: 'Circular Std',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    lineHeight: 15 / 12, // '15px',
  }),
  jumboHeadline: css({
    fontFamily: 'Circular Std',
    fontSize: '4.0rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.03em',
    lineHeight: 40 / 40, // '40px',

    [MQ.M]: {
      fontSize: '6.0rem',
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60, // '60px',
    },

    [MQ.XL]: {
      fontSize: '8.0rem',
      lineHeight: 75 / 80, // '75px',
    },
  }),
  primaryHeadline: css({
    fontFamily: 'Circular Std',
    fontSize: '2.5rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.02em',
    lineHeight: 30 / 25, // 30px',

    [MQ.M]: {
      fontSize: '3.5rem',
      lineHeight: 40 / 35, // 40px',
    },

    [MQ.XL]: {
      fontSize: '4.0rem',
      lineHeight: 45 / 40, // '45px',
    },
  }),
  secondaryHeadline: css({
    fontFamily: 'Circular Std',
    fontSize: '2.0rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.02em',
    lineHeight: 25 / 20, // '25px',

    [MQ.M]: {
      fontSize: '2.5rem',
      lineHeight: 30 / 25, // '30px',
    },

    [MQ.XL]: {
      fontSize: '2.8rem',
      lineHeight: 30 / 28, // '30px',
    },
  }),
  smallCopy: css({
    fontFamily: 'Circular Std',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 15 / 12, // '15px',

    [MQ.XL]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 20 / 15, // '20px',
    },
  }),
  smallCopyReduced: css({
    fontFamily: 'Circular Std',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: '-0.01em',
    lineHeight: 15 / 12, // '15px',
  }),
  subhead: css({
    fontFamily: 'Circular Std',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 15 / 12, // '15px',

    [MQ.XL]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.01em',
      lineHeight: 20 / 15, // '20px',
    },
  }),
  tertiaryHeadline: css({
    fontFamily: 'Circular Std',
    fontSize: '1.5rem',
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: '-0.01em',
    lineHeight: 20 / 15, // '20px',

    [MQ.XL]: {
      fontSize: '1.8rem',
      lineHeight: 25 / 18, // '25px',
    },
  }),
};
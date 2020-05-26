import { css } from '@emotion/core';

import { COLORS, EASING, MQ, SPACING, TIME, Z_INDEX } from '~/lib/constants';

export const CONTENT_PADDING = {
  S: SPACING.SIZE_80,
  M: SPACING.SIZE_100,
  XL: SPACING.SIZE_120,
};

const styles = {
  content: css({
    opacity: 0,
    paddingBottom: CONTENT_PADDING.S,

    [MQ.M]: {
      paddingBottom: CONTENT_PADDING.M,
    },

    [MQ.XL]: {
      paddingBottom: CONTENT_PADDING.XL,
    },
  }),
  contentSpacer: css({
    display: 'block',
    paddingBottom: 40,
    position: 'relative',

    [MQ.M]: {
      paddingBottom: 60,
    },
  }),
  contentVisible: {
    opacity: 1,
    transition: `opacity ${TIME.MS600}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  root: css({
    background: COLORS.LIGHT.OFF_WHITE,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '66.666vh',
    overflow: 'hidden',
  }),
  scrollColorContainer: css({
    position: 'relative',
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
  }),
  searchButtonContainer: css({
    position: 'sticky',
    top: 0,
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
    width: '100%',
    zIndex: Z_INDEX.TOP,
  }),
  searchButtonStickyFallback: css({
    position: 'absolute',
  }),
  searchButtonStickyFallbackFixed: css({
    position: 'fixed',
  }),
  searchButtonStickySupport: css({
    position: 'sticky',
  }),
};

export default styles;

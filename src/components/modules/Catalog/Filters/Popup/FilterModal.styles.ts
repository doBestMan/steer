import { css, SerializedStyles } from '@emotion/core';

import {
  Breakpoint,
  COLORS,
  EASING,
  MODAL_ANIMATION,
  MQ,
  RADIUS,
  SPACING,
  TIME,
} from '~/lib/constants';
import {
  fadeIn,
  fadeInUp,
  fadeOut,
  fadeOutDown,
  slideFadeInLeft,
  slideFadeOutLeft,
} from '~/styles/animations.styles';

const OVERLAY_BOX_SHADOW = '0px 4px 4px rgba(0, 0, 0, 0.25)';
const OVERLAY_PANEL_WIDTH = 425;

const FADE = {
  default: css({
    animation: `${fadeOut} ${TIME.MS350}ms ease-in`,
  }),
  open: css({
    animation: `${fadeIn} ${TIME.MS350}ms ${EASING.CUBIC_EASE_IN}`,
  }),
};

const SLIDE_DOWN = {
  default: css({
    animation: `${fadeOutDown} ${TIME.MS350}ms ease-in`,
  }),
  open: css({
    animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
  }),
};

const SLIDE_LEFT = {
  default: css({
    animation: `${slideFadeOutLeft} ${TIME.MS350}ms ease-in`,
  }),
  open: css({
    animation: `${slideFadeInLeft} ${TIME.MS350}ms ease-in`,
  }),
};

interface AnimationStyles {
  default: SerializedStyles;
  open: SerializedStyles;
}
export const overlayBkStyles: Record<Breakpoint, AnimationStyles> = {
  /* eslint-disable sort-keys */
  S: SLIDE_DOWN,
  M: FADE,
  L: SLIDE_LEFT,
  XL: SLIDE_LEFT,
  /* eslint-enable sort-keys */
};

const styles = {
  [MODAL_ANIMATION.FADE]: FADE,
  actions: css({
    display: 'flex',
    justifyContent: 'space-between',
    margin: `0 ${-SPACING.SIZE_10}px`,
  }),
  close: css({
    position: 'absolute',
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_10,
  }),
  root: css({
    background: COLORS.GLOBAL.WHITE,
    boxShadow: OVERLAY_BOX_SHADOW,
    color: COLORS.GLOBAL.BLACK,
    [MQ.S]: {
      borderRadius: `${RADIUS.RADIUS_15} ${RADIUS.RADIUS_15} 0 0`,
      bottom: 0,
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
      position: 'absolute',
      width: '100%',
    },
    [MQ.M]: {
      borderRadius: RADIUS.RADIUS_15,
      margin: 'auto',
      padding: SPACING.SIZE_40,
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 'fit-content',
    },
    [MQ.L]: {
      borderRadius: 0,
      bottom: 0,
      height: '100%',
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_60}px`,
      position: 'absolute',
      right: 0,
      top: 0,
      transform: 'unset',
      width: OVERLAY_PANEL_WIDTH,
    },
  }),
};

export default styles;
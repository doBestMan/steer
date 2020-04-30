import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  clearSearch: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
    }),
  ],
  comboboxWrapper: css({
    width: '100%',
  }),
  container: css({
    alignItems: 'baseline',
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    paddingBottom: SPACING.SIZE_15,
    position: 'relative',
  }),
  errorMessage: typography.primaryHeadline,
  input: [
    typography.primaryHeadline,
    css({
      border: 'none',
      width: '100%',
    }),
  ],
  label: [
    typography.primaryHeadline,
    css({
      color: COLORS.LIGHT.GRAY_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    }),
  ],
  labelHidden: css({
    opacity: 0,
  }),
  listbox: css({
    listStyle: 'none',
    position: 'absolute',
    top: 90,
    zIndex: 1,
  }),
  listboxItem: [
    typography.primaryHeadline,

    css({
      border: BORDERS.DOTTED_TRANSPARENT_2PX,
      lineHeight: 1.68,
      position: 'relative',
      [MQ.M]: { lineHeight: 1.68 },
    }),
  ],
  listboxItemHighlight: css({
    background: COLORS.GLOBAL.WHITE,
    color: COLORS.LIGHT.GRAY_70,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
  }),
  listboxItemSecondary: [
    typography.bodyCopy,
    css({ marginLeft: SPACING.SIZE_10 }),
  ],
  listboxItemSelected: css({
    borderColor: COLORS.GLOBAL.ORANGE,
  }),
  searchIcon: css({
    svg: {
      display: 'block',
      height: SPACING.SIZE_20,
      width: SPACING.SIZE_20,
    },
  }),
};

export default styles;

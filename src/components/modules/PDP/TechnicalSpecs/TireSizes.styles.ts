import { css, CSSObject } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  label: typography.primarySubhead,
  option: css({
    '&:not(:first-child)': {
      marginTop: SPACING.SIZE_30,
    },
  }),
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  screenReadersVisibleOnly: {
    display: 'block',
    height: 0,
    lineHeight: 0,
    opacity: 0,
    overflow: 'hidden',
  },
  specHeaderCell: {
    minWidth: SPACING.SIZE_90,
    paddingRight: SPACING.SIZE_20,
  },
  specsTableHeader: {
    minHeight: 0,
    visibility: 'hidden',
  },
};

export default styles;
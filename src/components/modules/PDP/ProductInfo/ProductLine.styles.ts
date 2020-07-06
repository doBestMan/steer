import { CSSObject } from '@emotion/core';

import { SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  HEADER_MAX_WIDTH: 140,
};

const styles: CSSObject = {
  brand: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: SPACING.SIZE_05,
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,
    span: typography.tertiaryHeadline,
  },
  productName: typography.primaryHeadline,
  productNameLong: typography.secondaryHeadline,
};

export default styles;
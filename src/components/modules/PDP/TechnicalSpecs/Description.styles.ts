import { COLORS, EASING, SPACING, StylesMap, TIME } from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  markdown: [
    typography.bodyCopy,
    {
      a: links.dark,
      ['ol, ul']: {
        ['li']: {
          ['&::marker']: [
            {
              color: COLORS.DARK.GRAY_40,
            },
          ],
          paddingLeft: SPACING.SIZE_05,
        },
      },
    },
  ],
  moreDescription: {
    display: 'none',
    marginTop: SPACING.SIZE_20,

    '&[aria-hidden="false"]': {
      display: 'block',
    },
  },
  secondaryDescription: {
    marginTop: SPACING.SIZE_20,
    a: links.dark,
  },
  showFullDescription: [
    typography.primarySubhead,
    {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.WHITE,
      },

      alignItems: 'center',
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      marginTop: SPACING.SIZE_05,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
  ],
  showFullDescriptionIcon: {
    marginTop: 2,

    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
};

export default styles;

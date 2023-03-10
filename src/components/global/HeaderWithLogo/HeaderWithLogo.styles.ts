import {
  COLORS,
  EASING,
  HEADER_SIZE,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  body: {
    a: links.light,
    '& > div': {
      '& > p:not(:first-child)': {
        display: 'none',
      },
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
      display: '-webkit-box',
      overflow: 'hidden',
    },
  },
  container: [typography.bodyCopy],
  fullBody: {
    a: links.light,
    display: 'block',
  },
  imageContainer: {
    marginBottom: SPACING.SIZE_20,
    ['img[type="SiteImage"]']: {
      maxWidth: 180,
      maxHeight: 45,
    },
  },
  showFullBody: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      display: 'flex',
      marginTop: SPACING.SIZE_05,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
  ],
  showFullBodyIcon: {
    marginTop: SPACING.SIZE_02,
    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
  subTitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_40,
    },
  ],
};

export const sizeStyles = {
  [HEADER_SIZE.JUMBO]: {
    title: [
      typography.jumboHeadline,
      {
        marginBottom: SPACING.SIZE_15,
      },
    ],
  },
  [HEADER_SIZE.PRIMARY]: {
    title: [
      typography.primaryHeadline,
      {
        marginBottom: SPACING.SIZE_10,
      },
    ],
  },
};

export const themeStyles = {
  [THEME.LIGHT]: {
    container: {
      color: COLORS.LIGHT.GRAY_70,
    },
    title: {
      color: COLORS.GLOBAL.BLACK,
    },
    subTitle: {
      color: COLORS.GLOBAL.BLACK,
    },
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.BLACK,
      },
    },
  },
  [THEME.DARK]: {
    container: {
      color: COLORS.DARK.GRAY_40,
    },
    title: {
      color: COLORS.GLOBAL.WHITE,
    },
    subTitle: {
      color: COLORS.GLOBAL.WHITE,
    },
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.WHITE,
      },
    },
  },
  [THEME.ORANGE]: {
    container: {
      color: COLORS.ORANGE.SHADE_85,
    },
    title: {
      color: COLORS.GLOBAL.WHITE,
    },
    subTitle: {
      color: COLORS.GLOBAL.BLACK,
    },
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.BLACK,
      },
    },
  },
};

export default styles;

import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import {
  SIZES,
  STICKER_SIZES,
} from '~/components/global/Sticker/Sticker.styles';
import {
  COLORS,
  EASING,
  MQ,
  PRODUCT,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import {
  TOP_CONTAINER_MIN_HEIGHT,
  TOP_CONTENT_HEIGHT,
} from '../TopPicks.styles';

const HEIGHT_BUTTON = 50;

const BRAND_LABEL_FONT_SIZE = `${18 / 10}rem`;

export const styles: StylesMap = {
  addVehicleContainer: {
    color: COLORS.GLOBAL.WHITE,
    fontWeight: 'normal',
    maxWidth: 295,
    textAlign: 'center',

    // Based on design, 295/375
    width: '78.66666667%',

    [MQ.M]: {
      maxWidth: 350,
      width: '55.33854167%',
    },

    [MQ.L]: {
      opacity: 0,
      width: '100%',
    },
  },
  asset: {
    display: 'block',
    opacity: 0,
    transform: 'translate3d(50px, 0, 0) rotate(45deg)',
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  assetContainer: {
    bottom: 0,
    display: 'block',
    height: WHEEL_WIDTH.S,
    left: '50%',
    position: 'absolute',
    transform: 'translate3d(-50%, 0, 0)',
    width: WHEEL_WIDTH.S,

    [MQ.M]: {
      height: WHEEL_WIDTH.M,
      width: WHEEL_WIDTH.M,
    },

    [MQ.L]: {
      height: WHEEL_WIDTH.L,
      width: WHEEL_WIDTH.L,
    },
  },
  assetHovered: {
    cursor: 'pointer',
  },
  assetShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  },
  bottomContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40%',
    paddingBottom: SPACING.SIZE_25,
    paddingTop: SPACING.SIZE_25,

    [MQ.M]: {
      minHeight: '35%',
      paddingBottom: SPACING.SIZE_40,
      paddingTop: SPACING.SIZE_40,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_25,
      minHeight: '33.333333%',
      paddingBottom: SPACING.SIZE_25,
      paddingTop: SPACING.SIZE_25,
      transition: `margin-top ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    },
  },
  bottomContentCurrent: {
    [MQ.L]: {
      marginTop: 0,
    },
  },
  brand: {
    color: COLORS.GLOBAL.WHITE,
  },
  brandLabel: {
    fontSize: BRAND_LABEL_FONT_SIZE,
    fontWeight: 'bold',
    lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,
    [MQ.M]: {
      fontSize: BRAND_LABEL_FONT_SIZE,
    },
    [MQ.L]: {
      fontSize: BRAND_LABEL_FONT_SIZE,
    },
    [MQ.XL]: {
      fontSize: `${22 / 10}rem`,
    },
  },
  cta: {
    display: 'block',
    marginTop: SPACING.SIZE_15,
    opacity: 0,
    transition: `all ${TIME.MS350}ms ${EASING.CUBIC_EASE_OUT}`,
    visibility: 'hidden',
  },
  ctaItem: {
    pointerEvents: 'all',
  },
  ctaShow: {
    opacity: 1,
    visibility: 'visible',
  },
  currentItem: {
    '& *': {
      visibility: 'hidden',
    },
  },
  customOriginalStyles: {
    color: COLORS.ORANGE.TINT_70,
    fontSize: 15,
  },
  infoContainer: {
    color: COLORS.ORANGE.SHADE_85,
    display: 'block',
    marginTop: SPACING.SIZE_10,
    textAlign: 'center',
  },
  linkContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    pointerEvents: 'all',
    transform: `translate3d(0, calc(50% - ${HEIGHT_BUTTON / 2}px), 0)`,
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    visibility: 'hidden',

    [MQ.L]: {
      opacity: 0,
      visibility: 'visible',
    },
  },
  linkContainerIsCurrent: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    visibility: 'visible',

    [MQ.L]: {
      opacity: 1,
    },
  },
  linkContainerShow: {
    [MQ.L]: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      visibility: 'visible',
    },
  },
  modalButton: [
    typography.primaryHeadline,
    {
      display: 'inline-block',
      fontSize: '15px',
      verticalAlign: 'text-bottom',
      [MQ.M]: {
        fontSize: '22px',
      },
      [MQ.L]: {
        fontSize: '22px',
        verticalAlign: 'inherit',
      },
    },
  ],
  price: [
    typography.topPicksPrice,
    {
      [MQ.XL]: typography.topPicksPrice,
    },
  ],
  pricesContainer: {
    display: 'block',
    marginTop: 8,
    textAlign: 'center',
  },
  productIcon: {
    display: 'inline-flex',
    height: 10,
    marginRight: 8,

    svg: {
      height: '100%',
      width: 'auto',
    },
  },
  productNameContainer: {
    display: 'block',
    marginTop: SPACING.SIZE_02,
  },
  productPerk: {
    fontWeight: 'bold',
  },
  productPerkContainer: {
    display: 'block',
  },
  promotionIcon: {
    color: COLORS.GLOBAL.WHITE,
    width: SPACING.SIZE_10,
    height: SPACING.SIZE_10,
    marginLeft: SPACING.SIZE_05,
  },
  promotionInfo: [
    {
      '& > div': {
        color: COLORS.GLOBAL.WHITE,
        marginBottom: 0,
      },
      alignItems: 'center',
      display: 'flex',
      paddingBottom: SPACING.SIZE_10,
      paddingTop: SPACING.SIZE_10,
    },
  ],
  promotionSpacing: {
    height: SPACING.SIZE_35,
  },
  rating: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_02,
  },
  root: {
    boxSizing: 'border-box',
    height: '100%',
    margin: '0 auto',
    position: 'relative',
    width: 300,

    [MQ.M]: {
      width: 478,
    },
    [MQ.L]: {
      width: '100%',
    },
  },
  rootHovered: {
    opacity: 1,
  },
  rootNotHovered: {
    opacity: '0.3 !important',
  },
  sticker: {
    left: -SPACING.SIZE_15,
    opacity: 0,
    position: 'absolute',
    top: -SPACING.SIZE_15,
    transform: 'scale3d(1.1, 1.1, 1.1)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    zIndex: Z_INDEX.BEHIND,

    [MQ.XL]: {
      left: -SPACING.SIZE_10,
      top: -SPACING.SIZE_10,
    },
  },
  stickerCustom: {
    [MQ.M]: {
      height: 75,
      width: 75,
    },
    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.LARGE].XL,
      width: SIZES[STICKER_SIZES.LARGE].XL,
    },
  },
  stickerShow: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transitionDelay: '100ms',
  },
  subcopy: {
    color: COLORS.LIGHT.GRAY_70,
  },
  topContent: {
    display: 'block',
    height: TOP_CONTENT_HEIGHT.S,
    minHeight: TOP_CONTAINER_MIN_HEIGHT.S,
    position: 'relative',
    width: '100%',

    [MQ.M]: {
      height: TOP_CONTENT_HEIGHT.M,
      minHeight: TOP_CONTAINER_MIN_HEIGHT.M,
    },

    [MQ.L]: {
      height: TOP_CONTENT_HEIGHT.L,
      minHeight: TOP_CONTAINER_MIN_HEIGHT.L,
    },
  },
  topContentInner: {
    height: '100%',
    width: '100%',
  },
  unclickable: {
    pointerEvents: 'none',
  },
  viewMoreContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.BLACK,
    borderRadius: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  viewMoreContentContainer: {
    marginTop: SPACING.SIZE_20,

    [MQ.L]: {
      marginTop: SPACING.SIZE_25,
    },

    [MQ.L]: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  viewMoreContentSubtitle: {
    color: COLORS.ORANGE.SHADE_85,
    display: 'block',
  },
  viewMoreContentTitle: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    marginBottom: SPACING.SIZE_10,
  },
  viewMoreSubtitle: {
    color: COLORS.DARK.GRAY_40,
    display: 'block',
  },
  viewMoreTitle: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
  },
};

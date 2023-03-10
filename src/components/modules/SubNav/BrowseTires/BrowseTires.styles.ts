import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ITEM_HEIGHT = 60;
const MAX_IMAGE_HEIGHT = 45;
const ICON_OFFSET = -8;
const DECORATOR_CONTENT = {
  content: '"•"',
};

const styles: StylesMap = {
  alignList: {
    [MQ.M]: {
      marginTop: -SPACING.SIZE_20, // align content with links label
    },
  },
  categoryContent: {
    height: '100%',
    width: '100%',
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_50}px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `0 0 ${SPACING.SIZE_50}px 0`,
    },
  },
  categoryList: {
    [MQ.S]: {
      marginBottom: SPACING.SIZE_40,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  container: {
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    marginBottom: SPACING.SIZE_10,
    position: 'relative',
  },
  dealsLink: {
    '&:hover:not(:active)': {
      color: COLORS.ORANGE.SHADE_15_SOLID,
    },
    color: COLORS.GLOBAL.ORANGE,

    svg: {
      marginLeft: SPACING.SIZE_05,
    },

    span: {
      borderBottom: 'none !important',
    },
  },
  decoration: {
    [MQ.M]: {
      ':before': {
        ...DECORATOR_CONTENT,
        fontSize: 20,
      },
      left: -SPACING.SIZE_20,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  flair: {
    color: COLORS.GLOBAL.ORANGE,
    paddingLeft: SPACING.SIZE_10,
  },
  flairIcon: {
    maxWidth: 20,
    paddingLeft: 5,

    svg: {
      // aligning items in flex container will misalign text flair
      paddingBottom: 8,
    },
  },
  flairSeparator: {
    ':before': {
      ...DECORATOR_CONTENT,
      fontSize: 6,
    },
    alignItems: 'center',
    display: 'flex',
    paddingLeft: SPACING.SIZE_10,
  },
  header: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_10,
    [MQ.S]: [
      typography.tertiaryHeadline,
      {
        paddingTop: SPACING.SIZE_30,
      },
    ],
    [MQ.M]: [
      typography.eyebrow,
      {
        paddingTop: 'unset',
      },
    ],
    [MQ.L]: {
      marginBottom: SPACING.SIZE_15,
    },
  },
  hide: {
    [MQ.M]: {
      display: 'none',
    },
  },
  iconOffset: {
    [MQ.M]: {
      ':first-of-type': {
        marginTop: ICON_OFFSET,
      },
    },
  },
  image: {
    alignItems: 'center',
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    height: '100%',

    // eslint-disable-next-line sort-keys
    div: {
      maxHeight: MAX_IMAGE_HEIGHT,

      img: {
        objectFit: 'contain',
        maxHeight: '100%',
      },
    },
    span: {
      maxWidth: 30, // targets svg icon
    },
  },
  imageContainer: {
    alignItems: 'flex-end',
    bottom: 0,
    display: 'flex',
    height: '100%',
    right: 0,
  },
  imageVehicle: {
    span: {
      bottom: 0,
      display: 'inline-flex',
      maxWidth: 'unset',
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
    },
  },
  info: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: SPACING.SIZE_05,
  },
  label: {
    alignItems: 'center',
    display: 'flex',
    [MQ.S]: typography.jumboHeadline,
    [MQ.M]: [
      typography.primaryHeadline,
      {
        '&:hover': {
          color: COLORS.GLOBAL.ORANGE,
        },
      },
    ],
  },
  link: typography.bodyCopy,
  linkLabel: {
    display: 'flex',
  },
  list: {
    // enables the entire list item to be clickable while only triggering focus styles on link label
    'a:after': {
      content: '""',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    width: '100%',
  },
  listItem: {
    ':not(:last-of-type)': {
      borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    },
    display: 'flex',
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_25}px 0`,
    position: 'relative',
    span: {
      borderColor: 'transparent',
    },
    width: '100%',
  },
  listTitle: {
    alignItems: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
    marginTop: SPACING.SIZE_20,
    [MQ.M]: {
      marginTop: 0,
    },
  },
  mainLinks: {
    [MQ.M]: {
      paddingLeft: SPACING.SIZE_40,
    },
    [MQ.L]: {
      paddingLeft: SPACING.SIZE_60,
    },
  },
  mobileHeader: {
    [MQ.S]: {
      marginBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_30,
    },
    [MQ.M]: {
      display: 'none',
      marginBottom: 0,
      paddingTop: 0,
    },
  },
  selected: {
    color: COLORS.GLOBAL.ORANGE,
  },
  smallHide: {
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'initial',
    },
  },
  smallShow: {
    [MQ.M]: {
      display: 'none',
    },
  },
};

export default styles;

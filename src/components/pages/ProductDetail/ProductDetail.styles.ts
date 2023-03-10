import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { typography } from '~/styles/typography.styles';

function defaultSpacing(rule: string, offset = 0) {
  return {
    [rule]: SPACING.SIZE_60 + offset,

    [MQ.M]: {
      [rule]: SPACING.SIZE_80 + offset,
    },

    [MQ.L]: {
      [rule]: SPACING.SIZE_120 + offset,
    },
  };
}
const TABLE_BG_COLOR = '#F4F4F4';

const paddingForBK = {
  [MQ.M]: {
    paddingLeft: getColumnsCalc({
      breakpoint: 'M',
      columns: 0,
      includeExtraGutter: true,
    }),
    paddingRight: getColumnsCalc({
      breakpoint: 'M',
      columns: 0,
      includeExtraGutter: true,
    }),
  },
  [MQ.L]: {
    paddingLeft: getColumnsCalc({
      breakpoint: 'L',
      columns: 1,
      includeExtraGutter: true,
    }),
    paddingRight: getColumnsCalc({
      breakpoint: 'L',
      columns: 1,
      includeExtraGutter: true,
    }),
  },
  [MQ.XL]: {
    paddingLeft: getColumnsCalc({
      breakpoint: 'XL',
      columns: 2,
      includeExtraGutter: true,
    }),
    paddingRight: getColumnsCalc({
      breakpoint: 'XL',
      columns: 2,
      includeExtraGutter: true,
    }),
  },
};

const styles: StylesMap = {
  anchorBar: {
    marginTop: SPACING.SIZE_20,

    [MQ.M]: {
      marginTop: SPACING.SIZE_25,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  breadcrumbs: {
    marginTop: SPACING.SIZE_10,
    marginBottom: SPACING.SIZE_20,

    [MQ.M]: {
      marginTop: 'unset',
      marginBottom: SPACING.SIZE_40,
    },

    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  caption: [
    typography.eyebrow,
    {
      background: '#cccccc',
      padding: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_20,
      position: 'sticky',
      top: 271,
      width: '100%',
      zIndex: Z_INDEX.FRONT - 1,
    },
    paddingForBK,
  ],
  compareTableRoot: paddingForBK,
  confirmFitContainer: {
    [MQ.L]: {
      borderTopLeftRadius: RADIUS.RADIUS_15,
      borderTopRightRadius: RADIUS.RADIUS_15,
      overflow: 'hidden',
    },
  },
  confirmFitItem: {
    '&:not(:first-of-type):before': {
      [MQ.M]: {
        left: GAP_COLUMNS.M,
        right: GAP_COLUMNS.M,
      },
      [MQ.L]: {
        left: GAP_COLUMNS.S,
        right: GAP_COLUMNS.S,
      },
      borderBottom: BORDERS.SOLID_ORANGE_SHADE_15_1PX,
      content: '""',
      display: 'block',
      left: GAP_COLUMNS.S,
      position: 'absolute',
      right: GAP_COLUMNS.S,
      top: 0,
      zIndex: Z_INDEX.FRONT,
    },
    '> button': {
      textAlign: 'left',
      width: '100%',
    },
    position: 'relative',
  },
  ctaListRoot: paddingForBK,
  ctaListWrapper: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    overflowX: 'scroll',
  },
  detailsSection: [
    defaultSpacing('marginTop'),
    defaultSpacing('paddingBottom', -SPACING.SIZE_20),
    defaultSpacing('paddingTop'),
    {
      backgroundColor: COLORS.GLOBAL.BLACK,

      // eslint-disable-next-line sort-keys
      '> div:not(:first-of-type):not(:last-of-type)': defaultSpacing(
        'marginTop',
      ),
    },
  ],
  featuredRecirculation: defaultSpacing('marginTop'),
  header: [
    {
      padding: `${SPACING.SIZE_45}px ${SPACING.SIZE_20}px 0 ${SPACING.SIZE_20}px`,
      [MQ.M]: {
        paddingTop: SPACING.SIZE_80,
      },
      [MQ.XL]: {
        paddingTop: SPACING.SIZE_120,
      },
    },
    paddingForBK,
  ],
  insights: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  insightStickyBar: {
    top: 0,
    position: 'sticky',
    zIndex: Z_INDEX.FRONT,
  },
  installation: [
    defaultSpacing('marginTop'),
    {
      [MQ.L]: {
        marginTop: SPACING.SIZE_120,
      },
    },
  ],
  lastTable: {
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_60,
    },
  },
  plaTechSpecs: [
    defaultSpacing('paddingTop'),
    defaultSpacing('paddingBottom', -SPACING.SIZE_20),

    {
      background: COLORS.GLOBAL.BLACK,
    },
    {
      [MQ.L]: [defaultSpacing('marginTop')],
    },
  ],
  productInfo: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_05,
    },
  },
  purchaseIncludes: [
    defaultSpacing('marginTop'),
    {
      [MQ.L]: {
        marginTop: SPACING.SIZE_80,
      },
    },
  ],
  recirculation: defaultSpacing('marginTop'),
  recirculationContainer: defaultSpacing('marginBottom'),
  recirculationHeader: {
    [MQ.L]: {
      marginLeft: getColumnsCalc({
        breakpoint: 'L',
        columns: 1,
        includeExtraGutter: true,
      }),
    },

    [MQ.XL]: {
      marginLeft: getColumnsCalc({
        breakpoint: 'XL',
        columns: 1,
        includeExtraGutter: true,
      }),
    },
  },
  recirculationItem: {
    ':first-of-type': {
      [MQ.L]: {
        marginLeft: getColumnsCalc({
          breakpoint: 'L',
          columns: 1,
          includeExtraGutter: true,
          includeContainerMargin: true,
        }),
      },

      [MQ.XL]: {
        marginLeft: getColumnsCalc({
          breakpoint: 'XL',
          columns: 1,
          includeExtraGutter: true,
          includeContainerMargin: true,
        }),
      },
    },

    ':last-of-type': {
      [MQ.L]: {
        marginRight: getColumnsCalc({
          breakpoint: 'L',
          columns: 1,
          includeExtraGutter: true,
          includeContainerMargin: true,
        }),
      },

      [MQ.XL]: {
        marginRight: getColumnsCalc({
          breakpoint: 'XL',
          columns: 1,
          includeExtraGutter: true,
          includeContainerMargin: true,
        }),
      },
    },
  },
  recirculationSize: {
    marginTop: SPACING.SIZE_40,

    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  recirculationSizeLink: typography.primarySubhead,
  root: {
    opacity: 1,
    transition: `opacity ${TIME.MS300}ms ease`,
  },
  rootLoading: {
    opacity: 1,
  },
  shopTiresBySpace: {
    paddingTop: SPACING.SIZE_160 - 10,
  },
  shopWithConfidence: defaultSpacing('marginTop'),
  stickyBar: {
    bottom: 0,
    position: 'sticky',
    zIndex: Z_INDEX.FRONT,
  },
  subTitle: {
    color: COLORS.LIGHT.GRAY_70,
    fontSize: 12,
    [MQ.M]: {
      fontSize: 15,
    },
    [MQ.XL]: {
      fontSize: 18,
    },
  },
  tableHeader: {
    [MQ.M]: {
      '& > div': {
        width: `min(calc(100vw - ${SPACING.SIZE_80}px), 760px)`, //760px is the width of 5 items of 152 px tires
      },
      left: getColumnsCalc({
        breakpoint: 'M',
        columns: 0,
        includeExtraGutter: true,
      }),
    },
    [MQ.L]: {
      left: getColumnsCalc({
        breakpoint: 'L',
        columns: 1,
        includeExtraGutter: true,
      }),
    },
    [MQ.XL]: {
      left: getColumnsCalc({
        breakpoint: 'XL',
        columns: 2,
        includeExtraGutter: true,
      }),
    },
  },
  tableListWrapper: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: TABLE_BG_COLOR,
    display: 'flex',
    overflowX: 'scroll',
    paddingBottom: SPACING.SIZE_20,
  },
  tireImage: {
    height: 238,
    marginBottom: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
      height: 393,
    },

    [MQ.L]: {
      marginBottom: 0,
      height: 510,
    },
  },
  tireWithInfoList: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: `linear-gradient(360deg, ${COLORS.GLOBAL.ORANGE} 30%, hsla(18, 16%, 53%, 0) 30%)`,
    display: 'flex',
    overflowX: 'scroll',
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.FRONT,
  },
  tireWithInfoListRootStyle: paddingForBK,
  title: [typography.primaryHeadline],
};

export default styles;

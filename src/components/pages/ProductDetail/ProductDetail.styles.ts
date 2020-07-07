import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';

const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_20,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
    },

    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  featuredRecirculation: {
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginTop: SPACING.SIZE_80,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_120,
    },
  },
  insights: {
    marginTop: SPACING.SIZE_10,

    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  installation: {
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginTop: SPACING.SIZE_80,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_90,
    },
  },
  productInfo: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_05,
    },
  },
  purchaseIncludes: {
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginTop: SPACING.SIZE_80,
    },
  },
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
  root: {
    [MQ.L]: {
      paddingTop: SPACING.SIZE_80,
    },
  },
  shopWithConfidence: {
    marginTop: SPACING.SIZE_60,

    [MQ.M]: {
      marginTop: SPACING.SIZE_80,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_120,
    },
  },
  tireImage: {
    marginBottom: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_05,
    },

    [MQ.L]: {
      marginBottom: 0,
    },
  },
};

export default styles;

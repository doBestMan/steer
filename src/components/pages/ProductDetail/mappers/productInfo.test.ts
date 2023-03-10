import { SiteProductLineSizeDetail } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductLineSizeDetailRoadHazard } from '~/data/models/SiteProductLineSizeDetailRoadHazard';

import {
  routerMock,
  siteProductMock,
  siteProductReviewsMock,
} from './ProductDetail.mock';
import { mapDataToProductInfo } from './productInfo';

describe('pages/ProductDetails/mappers/breadcrumbs', () => {
  it('returns parsed product info props', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 4 },
        rearSize: '100-40r17',
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      availableSizes: 4,
      brand: {
        image: {
          altText: 'Achilles',
          height: 20,
          src:
            'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
          type: 'SiteImage',
          width: 120,
        },
        label: 'Achilles',
      },
      brandURL: '/brands/continental-tires',
      callForPricing: false,
      loadSpeedRating: '89H',
      price: {
        estimatedRetailPriceInCents: '15975',
        salePriceInCents: '13296',
      },
      priceLabel: '60% off',
      productName: 'DH2',
      promoTags: [
        {
          label: '100% Risk-Free',
          icon: { type: 'SiteIcon', svgId: 'fire' },
          style: 'SitePromotionItemOrangePill',
        },
      ],
      rating: { quantity: 187, value: 4.9 },
      rearLoadSpeedRating: '89H',
      rearPrice: {
        estimatedRetailPriceInCents: '12099',
        salePriceInCents: '12099',
      },
      rearSize: '100/40R17',
      sameSizeSearchResults: null,
      sameSizeSearchURL: '/tire-sizes/200-40r17',
      size: '200/40R17',
      startingPrice: '5999',
      volatileAvailability: false,
    });
  });

  it('returns road hazard information for single available size', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 4 },
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: {
        durationLabel: '3 years',
        price: '5208',
      },
    });
  });

  it('returns null road hazard for single unavailable size', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 4 },
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: null,
    });
  });

  it('returns road hazard for front + rear available sizes', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: {
        durationLabel: '3 years',
        price: '6404',
      },
    });
  });

  it('returns null road hazard for front available + rear unavailable sizes', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineRearSizeDetail: {
            ...(siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: null,
    });
  });

  it('returns null road hazard for front unavailable + rear available sizes', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: null,
    });
  });

  it('returns null road hazard for front + rear available sizes with different durations', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        rearSize: '100-40r17',
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: {
              ...((siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail)
                .roadHazard as SiteProductLineSizeDetailRoadHazard),
              durationLabel: '3 years',
            },
          },
          siteProductLineRearSizeDetail: {
            ...(siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail),
            roadHazard: {
              ...((siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail)
                .roadHazard as SiteProductLineSizeDetailRoadHazard),
              durationLabel: '2 years',
            },
          },
        },
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-40r17',
      }),
    ).toMatchObject({
      roadHazard: null,
    });
  });

  it('returns tire line false in case of defined tireSize', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        tireSize: '200-r14',
      }),
    ).toMatchObject({
      isTireLine: false,
    });
  });

  it('returns tire line in case of missing tireSize', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
      }),
    ).toMatchObject({
      isTireLine: true,
    });
  });

  it('returns error in case of fetching issues', () => {
    expect(
      mapDataToProductInfo({
        currentSizeIndex: -1,
        error: new Error(),
        quantity: { front: 2, rear: 2 },
        router: routerMock,
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
      }),
    ).toMatchObject({
      hasError: true,
    });
  });
});

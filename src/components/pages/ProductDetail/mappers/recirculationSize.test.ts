import { siteProductMock } from './ProductDetail.mock';
import { mapDataToRecirculationSize } from './recirculationSize';

describe('pages/ProductDetails/mappers/recirculationSize', () => {
  it('returns null in case of product line page (no size)', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
      }),
    ).toBeNull();
  });

  it('returns parsed recirculation size props', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
        tireSize: 'p195-45r16',
      }),
    ).toStrictEqual({
      label: 'See all tires in the size 215/50 R17',
      url: '/tire-sizes/p195-45r16',
    });
  });

  it('returns parsed recirculation size and rear props', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
        rearSize: 'p195-45r19',
        tireSize: 'p195-45r16',
      }),
    ).toStrictEqual({
      label: 'See all tires in front 215/50 R17 and rear 215/50 R19',
      url: '/tire-sizes/p195-45r16?rear=p195-45r19',
    });
  });
});

import { ROUTES } from '../constants';
import { mapArrayToBreadcrumbs, mapPathnameToBreadcrumbs } from './breadcrumbs';

describe('breadcrumbs', () => {
  describe('mapPathnameToBreadcrumbs', () => {
    it('should return a list of breadcrumbs based on path', () => {
      expect(
        mapPathnameToBreadcrumbs({
          asPath: '/brands/continental-tires/surecontact-rx',
          labels: {
            brand: 'Continental',
            productLine: 'Surecontact RX',
          },
          pathname: '/brands/[brand]/[productLine]',
          query: {
            brand: 'continental-tires',
            productLine: 'surecontact-rx',
          },
        }),
      ).toStrictEqual([
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'All brands',
          url: '/brands',
        },
        {
          label: 'Continental',
          url: '/brands/continental-tires',
        },
        {
          currentPath: true,
          label: 'Surecontact RX',
          url: '/brands/continental-tires/surecontact-rx',
        },
      ]);
    });

    it('should include hashstring current path', () => {
      expect(
        mapPathnameToBreadcrumbs({
          asPath: '/brands/continental-tires/surecontact-rx#tireSize=100R1891W',
          labels: {
            brand: 'Continental',
            productLine: 'Surecontact RX',
            tireSize: '100/50 R18 91H',
          },
          pathname: '/brands/[brand]/[productLine]',
          query: {
            brand: 'continental-tires',
            productLine: 'surecontact-rx',
            tireSize: '100R1891W,',
          },
          querystringNodeLabel: '100/50 R18 91H',
        }),
      ).toStrictEqual([
        {
          label: 'Home',
          url: '/',
        },
        {
          label: 'All brands',
          url: '/brands',
        },
        {
          label: 'Continental',
          url: '/brands/continental-tires',
        },
        {
          label: 'Surecontact RX',
          url: '/brands/continental-tires/surecontact-rx',
        },
        {
          currentPath: true,
          label: '100/50 R18 91H',
          url: '/brands/continental-tires/surecontact-rx#tireSize=100R1891W',
        },
      ]);
    });
  });

  describe('mapArrayToBreadcrumbs', () => {
    it('should return breadcrumbs based on array', () => {
      const query = {
        brand: 'continental-tires',
        productLine: 'surecontact-rx',
      };

      expect(
        mapArrayToBreadcrumbs(
          [
            {
              type: ROUTES.HOME,
            },
            {
              type: ROUTES.BRAND_LANDING,
            },
            {
              type: ROUTES.BRAND_DETAIL,
              label: 'Continental',
            },
            {
              type: ROUTES.PRODUCT_DETAIL,
              label: 'Surecontact RX',
            },
            {
              label: 'Static',
              url: '/static',
            },
          ],
          query,
        ),
      ).toStrictEqual([
        {
          currentPath: false,
          label: 'Home',
          url: '/',
        },
        {
          currentPath: false,
          label: 'All brands',
          url: '/brands',
        },
        {
          currentPath: false,
          label: 'Continental',
          url: '/brands/continental-tires',
        },
        {
          currentPath: false,
          label: 'Surecontact RX',
          url: '/brands/continental-tires/surecontact-rx',
        },
        {
          currentPath: true,
          label: 'Static',
          url: '/static',
        },
      ]);
    });
  });
});

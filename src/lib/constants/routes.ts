// TODO Finalize routes
// https://simpletire.atlassian.net/browse/WCS-9

import { ui } from '../utils/ui-dictionary';

export enum ROUTES {
  BRAND_CATEGORY = 'brandCategory',
  BRAND_DETAIL = 'brandDetail',
  BRAND_LANDING = 'brandLanding',
  BRAND_REVIEWS = 'brandReviews',
  BRAND_TYPE = 'brandType',
  CATEGORY_REVIEWS = 'categoryReviews',
  HOME = 'home',
  ORDER_TRACKING = 'orderTracking',
  ORDER_TRACKING_RESULT = 'orderTrackingResult',
  PRODUCT_DETAIL = 'productDetail',
  PRODUCT_REVIEWS = 'productReviews',
  TIRE_CATEGORY = 'tireCategory',
  TIRE_REVIEWS = 'tireReviews',
  TYPE_REVIEWS = 'typeReviews',
  VEHICLES_CATEGORY = 'vehiclesCategory',
}

// Order is important here
export const ROUTE_MAP: Record<ROUTES, string> = {
  [ROUTES.HOME]: '/',
  [ROUTES.BRAND_LANDING]: '/brands',
  [ROUTES.BRAND_DETAIL]: '/brands/[brandName]',
  [ROUTES.BRAND_REVIEWS]: '/brands/[brandName]/reviews',
  [ROUTES.CATEGORY_REVIEWS]: '/categories/[category]/reviews',
  [ROUTES.ORDER_TRACKING]: '/track-your-order',
  [ROUTES.ORDER_TRACKING_RESULT]: '/track-your-order/result',
  [ROUTES.PRODUCT_DETAIL]: '/brands/[brandName]/[productLine]',
  [ROUTES.PRODUCT_REVIEWS]: '/brands/[brandName]/[productLine]/reviews',
  [ROUTES.TIRE_REVIEWS]: '/tire-reviews',
  [ROUTES.TYPE_REVIEWS]: '/types/[type]/reviews',
  [ROUTES.VEHICLES_CATEGORY]: '/vehicles/[make]/[model]/[year]',
  [ROUTES.BRAND_TYPE]: '/brands/[brandName]/types/[categoryOrType]',
  [ROUTES.BRAND_CATEGORY]: '/brands/[brandName]/categories/[categoryOrType]',
  [ROUTES.TIRE_CATEGORY]: '/tire-sizes/[size]',
};

// null for dynamic labels
export const ROUTE_LABELS: Record<string, string | null> = {
  [ROUTE_MAP[ROUTES.HOME]]: ui('breadcrumbs.home'),
  [ROUTE_MAP[ROUTES.BRAND_LANDING]]: ui('breadcrumbs.brands'),
  [ROUTE_MAP[ROUTES.BRAND_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.BRAND_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.PRODUCT_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.PRODUCT_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.BRAND_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.TIRE_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.VEHICLES_CATEGORY]]: null,
};

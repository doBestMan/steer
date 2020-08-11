import isStrictEqual from 'fast-deep-equal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Product as ProductLinkingData } from 'schema-dts';

import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { MetaProps } from '~/components/global/Meta/Meta';
import { FAQProps } from '~/components/modules/PDP/FAQ/FAQ';
import { InsightsProps } from '~/components/modules/PDP/Insights/Insights';
import { InstallationProps } from '~/components/modules/PDP/Installation/Installation';
import { ProductInfoProps } from '~/components/modules/PDP/ProductInfo/ProductInfo';
import { ReviewsProps } from '~/components/modules/PDP/Reviews/Reviews';
import { SizeFinderProps } from '~/components/modules/PDP/SizeFinder/SizeFinder';
import { PDPStickyBarProps } from '~/components/modules/PDP/StickyBar/StickyBar';
import { TechnicalSpecsProps } from '~/components/modules/PDP/TechnicalSpecs/TechnicalSpecs';
import { useGlobalsContext } from '~/context/Globals.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import { useApiDataWithDefault } from '~/hooks/useApiDataWithDefault';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { eventEmitters } from '~/lib/events/emitters';
import { interpolateRoute } from '~/lib/utils/routes';

import { mapDataToBreadcrumbs } from './mappers/breadcrumbs';
import { mapDataToFAQ } from './mappers/faq';
import { mapDataToInsights } from './mappers/insights';
import { mapDataToInstallation } from './mappers/installation';
import { mapDataToLinkingData } from './mappers/linkingData';
import { mapDataToMeta } from './mappers/meta';
import { mapDataToProductInfo } from './mappers/productInfo';
import { mapDataToRecirculation } from './mappers/recirculation';
import {
  mapDataToRecirculationSize,
  RecirculationSize,
} from './mappers/recirculationSize';
import { mapDataToReviews } from './mappers/reviews';
import { mapDataToSizeFinder } from './mappers/sizeFinder';
import { mapDataToStickyBar } from './mappers/stickyBar';
import { mapDataToTechnicalSpecs } from './mappers/technicalSpecs';
import { useProductDetailContext } from './ProductDetail.context';
import { ProductDetailData } from './ProductDetail.types';

export type QueryParams = Record<string, string>;

export type ParsedProductInfoProps = Omit<ProductInfoProps, 'sizeFinder'>;

export type ParsedSizeFinderProps = Omit<SizeFinderProps, 'onChange'>;

export type ParsedStickyBarProps = Omit<
  PDPStickyBarProps,
  'avoidSection' | 'darkSection'
>;

interface ResponseProps extends Pick<SiteProductLine, 'assetList'> {
  breadcrumbs: BreadcrumbsItem[];
  currentPath: string;
  faq: FAQProps;
  insights: Omit<InsightsProps, 'handleChangeLocation'>;
  installation: InstallationProps | null;
  isLoading: boolean;
  isPLA: boolean;
  linkingData: ProductLinkingData | null;
  meta: MetaProps;
  productInfo: ParsedProductInfoProps;
  recirculation: SiteCatalogProductGroupList | null;
  recirculationSize: RecirculationSize | null;
  reviews: ReviewsProps;
  reviewsAnchor: string;
  sizeFinder: ParsedSizeFinderProps | null;
  stickyBar: ParsedStickyBarProps | null;
  technicalSpecs: TechnicalSpecsProps | null;
  technicalSpecsAnchor: string;
}

export const CONSTANTS = {
  DEFAULT_QUANTITY: 4,
  DEFAULT_FRONT_AND_REAR_QUANTITY: 2,
  REVIEWS_ANCHOR: 'SiteProductReviews',
  TECH_SPECS_ANCHOR: 'SiteProductSpecs',
};

function useProductDetail({ serverData }: ProductDetailData): ResponseProps {
  const productDetail = useProductDetailContext();
  const {
    data: contextData,
    quantity,
    queryParams,
    isLoading,
    setData,
    setQuantity,
    setIsLoading,
  } = productDetail;
  const router = useRouter();
  const { asPath } = router;
  const userPersonalization = useUserPersonalizationContext();
  const globals = useSiteGlobalsContext();

  const { hostUrl } = useGlobalsContext();
  const isPLA = !!router.pathname.match(ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]);

  const { data: siteProduct, error, isValidating } = useApiDataWithDefault<
    SiteProduct
  >({
    defaultData: contextData?.siteProduct || serverData.siteProduct,
    endpoint: '/product-detail',
    includeUserRegion: true,
    includeUserZip: true,
    query: queryParams,
    revalidateEmitter: eventEmitters.userPersonalizationLocationUpdate,
  });

  if (error) {
    console.error(error);
  }

  const { siteProductReviews } = serverData;

  const { siteProductLine } = siteProduct;

  const assetList = siteProductLine.assetList;

  useEffect(() => {
    if (!queryParams.tireSize || quantity.front) {
      return;
    }

    if (queryParams.rearSize) {
      setQuantity({
        front: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
        rear: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
      });
      return;
    }

    setQuantity({
      front: CONSTANTS.DEFAULT_QUANTITY,
    });
  }, [quantity, queryParams, setQuantity]);

  useEffect(() => {
    if (isValidating) {
      return;
    }

    if (isStrictEqual({ siteProduct, siteProductReviews }, contextData)) {
      return;
    }

    setData({ siteProduct, siteProductReviews });
  }, [isValidating, siteProduct, siteProductReviews, contextData, setData]);

  useEffect(() => {
    setIsLoading(isValidating);
  }, [isValidating, setIsLoading]);

  /**
   * Reroute query parameters to hash parameters on the client
   * `?tireSize=235-40r15` => `#tireSize=235-40r15`
   */
  useEffect(() => {
    if (isPLA || !asPath.includes('?')) {
      return;
    }
    const interpolatedRoute = interpolateRoute(router.pathname, queryParams);
    const [queryFromPath] = asPath.match(/[^?]*$/g) || [];

    router.replace(
      `${router.pathname}#${queryFromPath}`,
      `${interpolatedRoute}#${queryFromPath}`,
      {
        shallow: true,
      },
    );
  }, [asPath, isPLA, router, queryParams]);

  const productInfo = mapDataToProductInfo({
    quantity,
    rearSize: queryParams.rearSize,
    router,
    siteProduct,
    siteProductReviews,
    tireSize: queryParams.tireSize,
  });

  return {
    assetList,
    breadcrumbs: mapDataToBreadcrumbs({
      siteProduct,
      router,
    }),
    currentPath: asPath,
    faq: mapDataToFAQ({ siteProduct, globals }),
    insights: mapDataToInsights({
      isLoadingData: isValidating,
      productDetail,
      rearSize: queryParams.rearSize,
      router,
      siteProduct,
      tireSize: queryParams.tireSize,
      userPersonalization,
    }),
    installation: mapDataToInstallation({ siteProduct }),
    isLoading,
    isPLA,
    linkingData: mapDataToLinkingData({
      hostUrl,
      router,
      siteProduct,
      siteProductReviews,
    }),
    meta: mapDataToMeta({
      brand: productInfo.brand.label,
      productLine: productInfo.productName,
      tireSize: productInfo.size,
    }),
    productInfo,
    recirculation: mapDataToRecirculation({ siteProduct }),
    recirculationSize: mapDataToRecirculationSize({
      siteProduct,
      rearSize: queryParams.rearSize,
      tireSize: queryParams.tireSize,
    }),
    reviews: mapDataToReviews({ siteProductReviews, router }),
    reviewsAnchor: CONSTANTS.REVIEWS_ANCHOR,
    sizeFinder: mapDataToSizeFinder({
      siteProduct,
      rearSize: queryParams.rearSize,
      tireSize: queryParams.tireSize,
    }),
    stickyBar: mapDataToStickyBar({ quantity, siteProduct }),
    technicalSpecs: mapDataToTechnicalSpecs({ siteProduct, router }),
    technicalSpecsAnchor: CONSTANTS.TECH_SPECS_ANCHOR,
  };
}

export default useProductDetail;

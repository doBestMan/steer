import Router, { useRouter } from 'next/router';
import queryString, { ParsedQuery } from 'query-string';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SitePrice } from '~/data/models/SitePrice';
import { VehicleMetadata } from '~/data/models/VehicleMetadata';
import { apiBootstrap } from '~/lib/api/bootstrap';
import { apiGetSiteBrandProductCount } from '~/lib/api/product-count';
import { apiGetSiteProductPrice } from '~/lib/api/single-product-price';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { createContext } from '~/lib/utils/context';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import {
  getParsedHash,
  getStringifiedParams,
  interpolateRoute,
} from '~/lib/utils/routes';
import { appendTiresToString } from '~/lib/utils/string';

import { ProductDetailResponse } from './ProductDetail.types';

const CONSTANTS = {
  DEFAULT_QUANTITY: 4,
  DEFAULT_FRONT_AND_REAR_QUANTITY: 2,
  PRODUCT_DETAIL_ROUTE: ROUTE_MAP[ROUTES.PRODUCT_DETAIL],
  PLA_ROUTE: ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA],
};

interface Props {
  children: ReactNode;
  serverData: ProductDetailResponse;
}

export interface Quantity {
  front: number;
  rear?: number;
}

export function getDefaultQuantity({
  queryParams,
}: {
  queryParams: Record<string, string>;
}): { front: number; rear?: number } {
  if (queryParams.rearSize) {
    return {
      front: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
      rear: CONSTANTS.DEFAULT_FRONT_AND_REAR_QUANTITY,
    };
  }

  return {
    front: CONSTANTS.DEFAULT_QUANTITY,
    rear: 0,
  };
}

export interface ProductDetailContextProps {
  addToCart: ({
    product,
    quantity,
    shouldAddCoverage,
  }: {
    product?: SiteCatalogProductItem;
    quantity?: Quantity;
    shouldAddCoverage: boolean;
  }) => void;
  changeSize: (index: number) => void;
  currentSizeIndex: number;
  data: ProductDetailResponse | null;
  getPriceOnLoad: (id: string) => void;
  getProductCount: (brand: string) => void;
  isAddingToCart: boolean;
  isLoading: boolean;
  productCount: number | null;
  productPrice: SitePrice | null;
  quantity: Quantity;
  queryParams: Record<string, string>;
  searchForVehicle: () => void;
  setData: (_: ProductDetailResponse) => void;
  setIsAddingToCart: (_: boolean) => void;
  setIsLoading: (_: boolean) => void;
  setQuantity: (_: Quantity) => void;
  setShowSelectError: (_: boolean) => void;
  showSelectError: boolean;
}

const ProductDetailContext = createContext<ProductDetailContextProps>();

export function getQueryParams({
  hashParams,
  queryParams,
  vehicle,
}: {
  hashParams: ParsedQuery | null;
  queryParams: ParsedUrlQuery;
  vehicle: VehicleMetadata | null;
}) {
  return getStringifiedParams({
    ...queryParams,
    ...hashParams,
    ...vehicle,
  });
}

function useContextSetup({
  serverData,
}: {
  serverData: ProductDetailResponse;
}): ProductDetailContextProps {
  const router = useRouter();
  const isPLA = !!router.pathname.match(CONSTANTS.PLA_ROUTE);
  const { userPersonalizationData } = useUserPersonalizationContext();
  const [data, setData] = useState<ProductDetailResponse | null>(serverData);
  const { vehicle } = useUserPersonalizationContext();
  const { query, asPath } = router;
  const [isLoading, setIsLoading] = useState(!isPLA);
  const [showSelectError, setShowSelectError] = useState(false);
  const [hashParams, setHashParams] = useState(getParsedHash(asPath));
  const queryParams = getQueryParams({
    hashParams,
    queryParams: query,
    vehicle,
  });
  const { itemId } = queryParams;
  const [quantity, setQuantity] = useState<{ front: number; rear?: number }>(
    getDefaultQuantity({ queryParams }),
  );
  // It's necessary to add an individual state in order to show the selected option while loading data
  const [currentSizeIndex, setCurrentSizeIndex] = useState(-1);

  // To add a loading indicator while redirecting to cart
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [productPrice, setPriceOnLoad] = useState<SitePrice | null>(null);
  const {
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();

  const searchForVehicle = useCallback(() => {
    lockSearchStateToVehicle();
    setShouldPreventLinkNavigation(true);
    setIsSearchOpen(true);
  }, [
    lockSearchStateToVehicle,
    setShouldPreventLinkNavigation,
    setIsSearchOpen,
  ]);
  const getProductCount = useCallback(async function (brand: string) {
    await apiBootstrap();
    const result = await apiGetSiteBrandProductCount(brand);
    if (result.isSuccess) {
      setProductCount(result.data.productCount);
      return;
    }
  }, []);

  const getPriceOnLoad = useCallback(async function (id: string) {
    await apiBootstrap();
    const result = await apiGetSiteProductPrice(id);
    if (result.isSuccess) {
      setPriceOnLoad(result.data.sitePrice);
    }
  }, []);

  useEffect(() => {
    if (!itemId) {
      return;
    }
    getPriceOnLoad(itemId);
  }, [getPriceOnLoad, itemId]);

  const onHashChange = useCallback(
    (url) => {
      const newHashParams = getParsedHash(url);
      setHashParams(newHashParams);

      window.scrollTo({
        top: 0,
      });
    },
    [setHashParams],
  );

  useEffect(() => {
    Router.events.on('hashChangeComplete', onHashChange);

    return () => {
      Router.events.off('hashChangeComplete', onHashChange);
    };
  }, [onHashChange]);

  useEffect(() => {
    setHashParams(getParsedHash(asPath));
  }, [asPath]);

  useEffect(() => {
    if (!queryParams.tireSize || quantity.front) {
      return;
    }

    setQuantity(getDefaultQuantity({ queryParams }));
  }, [quantity, queryParams, setQuantity]);

  const addToCart = useCallback(
    ({
      shouldAddCoverage,
    }: {
      product?: SiteCatalogProductItem;
      quantity?: Quantity;
      shouldAddCoverage: boolean;
    }) => {
      if (!data || !data.siteProduct.siteProductLineSizeDetail) {
        return;
      }

      const {
        siteProductLineSizeDetail,
        siteProductLineRearSizeDetail,
      } = data.siteProduct;

      const checkoutURL = getLegacyCheckoutURL({
        front: siteProductLineSizeDetail.id,
        quantity,
        rear: siteProductLineRearSizeDetail
          ? siteProductLineRearSizeDetail.id
          : undefined,
        roadHazard: shouldAddCoverage,
        userZip: userPersonalizationData?.userLocation?.zip || undefined,
      });

      window.location.href = checkoutURL;

      setIsAddingToCart(true);
    },
    [data, quantity, userPersonalizationData, setIsAddingToCart],
  );

  const changeSize = useCallback(
    (index) => {
      setIsLoading(true);
      setCurrentSizeIndex(index);
      const currentSize =
        data?.siteProduct.siteProductLineAvailableSizeList[index];
      const id =
        data?.siteProduct.siteProductLineAvailableSizeList[index]
          .siteQueryParams.itemId;
      if (id) {
        setPriceOnLoad(null);
      }
      if (!currentSize) {
        return;
      }

      const interpolatedRoute = interpolateRoute(
        CONSTANTS.PRODUCT_DETAIL_ROUTE,
        {
          ...queryParams,
          ...(isPLA && { brand: appendTiresToString(router.query.brand) }),
        },
      );
      const querystring = queryString.stringify({
        ...hashParams,
        ...currentSize.siteQueryParams,
        rearSize: undefined,
      });

      router.push(
        `${CONSTANTS.PRODUCT_DETAIL_ROUTE}#${querystring}`,
        `${interpolatedRoute}#${querystring}`,
      );
    },
    [
      isPLA,
      queryParams,
      router,
      hashParams,
      setIsLoading,
      setCurrentSizeIndex,
      data,
    ],
  );

  return {
    addToCart,
    changeSize,
    currentSizeIndex,
    data,
    getPriceOnLoad,
    getProductCount,
    isAddingToCart,
    isLoading,
    productCount,
    productPrice,
    quantity,
    queryParams,
    searchForVehicle,
    setData,
    setIsAddingToCart,
    setIsLoading,
    setQuantity,
    setShowSelectError,
    showSelectError,
  };
}

export function ProductDetailContextProvider({ children, serverData }: Props) {
  const value = useContextSetup({ serverData });

  return (
    <ProductDetailContext.Provider value={value}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export const useProductDetailContext = ProductDetailContext.useContext;

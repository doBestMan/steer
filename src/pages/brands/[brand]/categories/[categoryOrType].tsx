import { GetServerSideProps } from 'next';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { shouldReturnServerError } from '~/components/pages/CatalogPage/CatalogPage.utils';
import { SearchBy } from '~/components/pages/CatalogPage/mapppers/meta';
import WithErrorPageHandling, {
  PageResponse,
} from '~/hocs/WithPageErrorHandling';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetBrandProducts,
  backendGetBrandSummary,
} from '~/lib/backend/catalog/brand';
import { validBrandQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

interface Props extends CatalogPageData {
  brand: string;
  categoryOrType: string;
}

// MVP solution for differentiating between category v type pages
const PAGE_TYPE = 'categories';

function BrandCategory({ brand, categoryOrType, serverData }: Props) {
  const searchBy = SearchBy.brandAndCategoryOrType;
  const searchByParams = {
    brand,
    categoryOrType,
  };

  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: '/summary-brand',
        products: '/products-brand',
      }}
      pageParams={{
        brand,
        categoryOrType,
        pageType: PAGE_TYPE,
      }}
      searchBy={searchBy}
      searchByParams={searchByParams}
    />
  );
}

export const getServerSideProps: GetServerSideProps<PageResponse<
  CatalogPageData
>> = async (context) => {
  backendBootstrap({ request: context.req });
  const { brand, categoryOrType, ...vehicleParams } = context.query;

  validateOrRedirectToNotFound({
    param: brand,
    pattern: validBrandQuery,
    response: context.res,
  });

  const brandName = removeTireFromQueryParam(brand);
  const apiArgs = {
    brand: brandName,
    category: categoryOrType,
    query: getStringifiedParams(vehicleParams),
  };
  const [{ siteCatalogSummary }, productsRes] = await Promise.all([
    backendGetBrandSummary(apiArgs),
    backendGetBrandProducts(apiArgs),
  ]);

  if (shouldReturnServerError(productsRes, siteCatalogSummary)) {
    const errorStatusCode = !productsRes.isSuccess
      ? productsRes.error.statusCode
      : 500;
    context.res.statusCode = errorStatusCode;
    return { props: { errorStatusCode } };
  }

  return {
    props: {
      brand: brandName,
      categoryOrType,
      pageType: PAGE_TYPE,
      serverData: {
        siteCatalogSummary,
        siteCatalogProducts:
          productsRes.isSuccess && productsRes.data
            ? productsRes.data.siteCatalogProducts
            : null,
      },
    },
  };
};

export default WithErrorPageHandling(BrandCategory);

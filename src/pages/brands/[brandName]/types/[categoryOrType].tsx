import { GetServerSideProps } from 'next';

import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetBrandProducts,
  backendGetBrandSummary,
} from '~/lib/backend/catalog/brand';
import { getParam, getStringifiedParams } from '~/lib/utils/routes';

interface Props extends CatalogPageData {
  brand: string;
  categoryOrType: string;
}

function BrandTypeCatalog({ brand, categoryOrType, serverData }: Props) {
  return (
    <CatalogPageContainer
      serverData={serverData}
      endpoints={{
        summary: '/summary-brand',
        products: '/products-brand',
      }}
      hasTopPicks={false}
      pageParams={{
        brandName: brand,
        categoryOrType,
      }}
    />
  );
}

export const getServerSideProps: GetServerSideProps<CatalogPageData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { brandName, categoryOrType, ...vehicleParams } = context.query;
  const formattedBrand = getParam(brandName).replace('-tires', '');
  const apiArgs = {
    brand: formattedBrand,
    category: categoryOrType,
    query: getStringifiedParams(vehicleParams),
  };
  const { siteCatalogSummary } = await backendGetBrandSummary(apiArgs);
  const { siteCatalogProducts } = await backendGetBrandProducts(apiArgs);

  return {
    props: {
      brand: formattedBrand,
      categoryOrType,
      serverData: { siteCatalogSummary, siteCatalogProducts },
    },
  };
};

export default BrandTypeCatalog;
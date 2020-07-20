import { GetServerSideProps } from 'next';

import Meta from '~/components/global/Meta/Meta';
import CatalogPageContainer, {
  CatalogPageData,
} from '~/components/pages/CatalogPage/CatalogPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import {
  backendGetVehicleProducts,
  backendGetVehicleSummary,
} from '~/lib/backend/catalog/vehicle';
import { getStringifiedParams } from '~/lib/utils/routes';
import { capitalize, removeTireFromQueryParam } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

interface Props extends CatalogPageData {
  make: string;
  model: string;
  year: string;
}

function VehicleCatalog({ serverData, make, model, year }: Props) {
  const meta = {
    make: capitalize(make),
    model: capitalize(model),
    year: capitalize(year),
  };
  const title = ui('meta.vehicles.make.model.year.title', meta);
  const description = ui('meta.vehicles.make.model.year.description', meta);

  return (
    <>
      <Meta title={title} description={description} />
      <CatalogPageContainer
        serverData={serverData}
        endpoints={{
          summary: '/summary-vehicle',
          products: '/products-vehicle',
        }}
        hasTopPicks={
          !!serverData.siteCatalogSummary.siteCatalogSummaryTopPicksList.length
        }
        pageParams={{
          make,
          model,
          year,
        }}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<CatalogPageData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { make, model, year, ...vehicleParams } = context.query;
  const formattedMake = removeTireFromQueryParam(make);

  const apiArgs = {
    make: formattedMake,
    model,
    year,
    query: getStringifiedParams(vehicleParams),
  };
  const { siteCatalogSummary } = await backendGetVehicleSummary(apiArgs);
  const { siteCatalogProducts } = await backendGetVehicleProducts(apiArgs);

  return {
    props: {
      make: formattedMake,
      model,
      serverData: { siteCatalogSummary, siteCatalogProducts },
      year,
    },
  };
};

export default VehicleCatalog;

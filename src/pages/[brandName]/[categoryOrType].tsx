// final structure should be something like `/firestone-tires/winter`

import CatalogPageContainer from '~/components/pages/CatalogPage/CatalogPage.container';
import {
  emptyCatalogProducts,
  emptyHandleUpdateFilters,
} from '~/components/pages/CatalogPage/CatalogPage.mocks';
import { vehiclesNoOeWithSize } from '~/components/pages/CatalogPage/CatalogSummary/CatalogSummary.mocks';

function BrandCategory() {
  // TODO: update results function add prop handleUpdateFilters

  return (
    <CatalogPageContainer
      handleUpdateFilters={emptyHandleUpdateFilters}
      hasTopPicks={false}
      siteCatalogProducts={emptyCatalogProducts}
      siteCatalogSummary={vehiclesNoOeWithSize}
    />
  );
}

export default BrandCategory;

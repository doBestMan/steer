import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetBrandSummary } from '~/lib/backend/catalog/brand';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
  }>,
) => {
  backendBootstrap({ request });
  const { brand, categoryOrType, ...rest } = request.query;

  if (!brand || !categoryOrType) {
    console.warn('Brand name and category or type are required');
  }

  const siteCatalogSummary = await backendGetBrandSummary({
    brand,
    category: categoryOrType,
    query: getStringifiedParams(rest),
  });
  response.json(siteCatalogSummary);
};
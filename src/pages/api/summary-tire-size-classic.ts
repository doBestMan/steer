import { NextApiRequest, NextApiResponse } from 'next';

import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetTireSizeClassicSummary } from '~/lib/backend/catalog/size-classic';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<{
    siteCatalogSummary: SiteCatalogSummary;
  }>,
) => {
  backendBootstrap({ request });

  const { size, ...rest } = request.query;

  if (!size) {
    console.warn('Tire size is required');
    return;
  }

  const summaryRes = await backendGetTireSizeClassicSummary({
    query: getStringifiedParams(rest),
    size,
  });
  response.json(summaryRes);
};

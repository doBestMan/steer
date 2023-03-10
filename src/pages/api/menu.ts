import { NextApiRequest, NextApiResponse } from 'next';

import { SiteMenu } from '~/data/models/SiteMenu';
import { backendGetSiteMenu } from '~/lib/backend';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { isProductionDeploy } from '~/lib/utils/deploy';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteMenu>,
) => {
  backendBootstrap({ request });

  if (isProductionDeploy()) {
    response.setHeader('Cache-control', 's-maxage=60, stale-while-revalidate');
  }

  const res = await backendGetSiteMenu();

  if (res.isSuccess) {
    response.json(res.data);
    return;
  }

  response.status(res.error.statusCode).end();
};

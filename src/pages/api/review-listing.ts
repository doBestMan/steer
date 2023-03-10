import { NextApiRequest, NextApiResponse } from 'next';

import { SiteProductReviewsListing } from '~/data/models/SiteProductReviewsListing';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { isProductionDeploy } from '~/lib/utils/deploy';
import { getStringifiedParams } from '~/lib/utils/routes';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<SiteProductReviewsListing>,
) => {
  backendBootstrap({ request });

  const res = await backendGetReviewListing({
    query: getStringifiedParams(request.query),
  });

  if (res.isSuccess) {
    if (isProductionDeploy()) {
      response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
    }
    response.json(res.data);
    return;
  }

  response.status(res.error.statusCode).end();
};

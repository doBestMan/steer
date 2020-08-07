import { GetServerSideProps } from 'next';

import ReviewListingPage, {
  ReviewListingServerData,
} from '~/components/pages/ReviewListingPage/ReviewListingPage.container';
import { backendBootstrap } from '~/lib/backend/bootstrap';
import { backendGetReviewListing } from '~/lib/backend/review-listing';
import { validBrandQuery as validTiresQuery } from '~/lib/utils/regex';
import {
  getStringifiedParams,
  redirectToNotFound,
  validateOrRedirectToNotFound,
} from '~/lib/utils/routes';
import { removeTireFromQueryParam } from '~/lib/utils/string';

function Reviews(props: ReviewListingServerData) {
  return <ReviewListingPage {...props} />;
}

export const getServerSideProps: GetServerSideProps<ReviewListingServerData> = async (
  context,
) => {
  backendBootstrap({ request: context.req });
  const { type, ...params } = context.query;

  validateOrRedirectToNotFound({
    param: type,
    pattern: validTiresQuery,
    response: context.res,
  });

  // Type tire reviews accept params for sort, order and page
  const queryParams = getStringifiedParams(params);

  // tireType acts as a query param for the tire reviews end point so add it to the query params
  queryParams.tireType = removeTireFromQueryParam(type);

  const tireReviews = await backendGetReviewListing({ query: queryParams });

  if (!tireReviews.reviewsList.length) {
    redirectToNotFound(context.res);
  }

  const props: ReviewListingServerData = {
    serverData: {
      tireReviews,
    },
    type: queryParams.tireType,
  };

  return {
    props,
  };
};

export default Reviews;

import { SiteProductLineReviewItemInput } from '~/data/models/SiteProductLineReviewItemInput';
import { fetchWithErrorHandling } from '~/lib/fetch';

export async function apiPostReview(
  brand: string,
  productLine: string,
  input: SiteProductLineReviewItemInput,
) {
  return await fetchWithErrorHandling<null, SiteProductLineReviewItemInput>({
    endpoint: '/write-review',
    jsonBody: input,
    query: { brand, productLine },
    method: 'post',
  });
}

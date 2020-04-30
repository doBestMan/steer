import { number } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import { COLORS } from '~/lib/constants';

import Reviews from './Reviews';
import { mockReviews } from './Reviews.mocks';

export default {
  component: Reviews,
  title: 'Reviews',
};

const ratingOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

export function ReviewsWithKnobs() {
  return (
    <Grid css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <Reviews
        {...mockReviews}
        ratingStars={number('Rating', mockReviews.ratingStars, ratingOptions)}
      />
    </Grid>
  );
}

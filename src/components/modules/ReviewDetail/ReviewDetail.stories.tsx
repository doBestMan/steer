import React from 'react';

import Button from '~/components/global/Button/Button';
import { reviewDetailMock } from '~/components/modules/ReviewDetail/ReviewDetail.mock';
import Reviews from '~/components/modules/ReviewDetail/Reviews/Reviews';
import ReviewsHeader from '~/components/modules/ReviewDetail/ReviewsHeader/ReviewsHeader';
import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { primaryColumnStyles } from '~/components/modules/StickyBar/StickyBar.styles';
import { SPACING, StylesMap, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export default {
  component: Reviews,
  title: 'SEO Landing/Review Detail',
};

const styles: StylesMap = {
  container: {
    paddingBottom: SPACING.SIZE_100,
  },
};

export function FullPage() {
  const {
    brand,
    brandUrl,
    breadcrumbs,
    ratingStars,
    ratings,
    reviews,
    sources,
    stats,
    tire,
    title,
  } = reviewDetailMock;

  return (
    <div css={styles.container}>
      <ReviewsHeader
        brand={brand}
        brandUrl={brandUrl}
        breadcrumbs={breadcrumbs}
        ratings={ratings}
        stats={stats}
        ratingStars={ratingStars}
        tire={tire}
      />
      <Reviews reviews={reviews} sources={sources} title={title} />
      <StickyBar
        isStickyBottom
        theme={THEME.ORANGE}
        customPrimaryColStyles={primaryColumnStyles.rightAlign}
      >
        <>
          <Button css={primaryColumnStyles.secondaryButton}>
            {ui('reviews.writeReview')}
          </Button>
          <Button css={primaryColumnStyles.primaryButton} theme={THEME.ORANGE}>
            {ui('reviews.viewTire')}
          </Button>
        </>
      </StickyBar>
    </div>
  );
}

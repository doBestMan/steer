import React from 'react';

import BreadcrumbsComponent, {
  BreadcrumbsItem,
} from '~/components/global/Breadcrumbs/Breadcrumbs';
import CircularIllustrationCarousel from '~/components/global/CircularIllustration/CircularIllustrationCarousel/CircularIllustrationCarousel';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import HeaderLandingPage, {
  HeaderLandingPageProps,
} from '~/components/global/HeaderLandingPage/HeaderLandingPage';
import Link from '~/components/global/Link/Link';
import LinkList, { LinkListProps } from '~/components/global/LinkList/LinkList';
import Markdown from '~/components/global/Markdown/Markdown';
import Meta from '~/components/global/Meta/Meta';
import ProductGroupList, {
  ProductGroupListProps,
} from '~/components/global/ProductGroupList/ProductGroupList';
import TireSizeBoardContainer from '~/components/global/TireSizeBoard/TireSizeBoard.container';
import { SiteGraphicTile } from '~/data/models/SiteGraphicTile';
import { SiteLinkWithLabel } from '~/data/models/SiteLinkWithLabel';
import { ROUTES, THEME } from '~/lib/constants';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { capitalize } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './CategoryPage.styles';

interface CategoryPageData {
  categoryData: CategoryPageProps;
}
export interface CategoryPageProps {
  curatedProducts: Array<ProductGroupListProps>;
  header: HeaderLandingPageProps;
  links?: LinkListProps | null;
  name: string;
  popularBrands: Array<SiteGraphicTile>;
  reviewsLink: SiteLinkWithLabel | null;
}
function CategoryPage({ categoryData }: CategoryPageData) {
  const categoryName = categoryData.name.replace('-', ' ');
  const categoryBreadCrumbData: BreadcrumbsItem[] = mapArrayToBreadcrumbs([
    {
      type: ROUTES.HOME,
    },
    {
      type: ROUTES.CATEGORY_LANDING,
    },
    {
      label: capitalize(categoryName) + ' tires',
      url: `/categories/${categoryData.name}-tires`,
    },
  ]);

  const meta = {
    title: ui('meta.categoryPages.title', {
      category: capitalize(categoryName),
    }),
    description: ui('meta.categoryPages.description', {
      category: capitalize(categoryName),
    }),
  };
  const tireSizeBoardTitle = ui('categoryPage.tireSizeBoardTitle', {
    category: categoryName,
  });

  return (
    <div css={[styles.root]}>
      <div css={styles.pageHeader}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Meta {...meta} />
            <div css={styles.breadCrumbs}>
              <BreadcrumbsComponent navigationItems={categoryBreadCrumbData} />
            </div>
            <div>
              <HeaderLandingPage
                {...categoryData.header}
                title={capitalize(categoryName) + ' tires'}
              />
            </div>

            {categoryData.reviewsLink && (
              <Link
                css={styles.reviewText}
                href={
                  categoryData.reviewsLink.link &&
                  categoryData.reviewsLink.link.href
                }
                theme={THEME.LIGHT}
              >
                {categoryData.reviewsLink.label}
              </Link>
            )}
          </GridItem>
        </Grid>
      </div>
      <div css={styles.mostPopularBrandsContainer}>
        <Grid>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <Markdown isEditorial>
              {ui('categoryPage.mostPopularBrandsHeadlineCopy')}
            </Markdown>
            <Markdown isEditorial>
              {ui('categoryPage.mostPopularTextCopy', {
                category: categoryName,
              })}
            </Markdown>
          </GridItem>
        </Grid>
      </div>
      <CircularIllustrationCarousel dataItems={categoryData.popularBrands} />
      {categoryData.curatedProducts.map((obj: any) => {
        return (
          <div key={obj.id} css={styles.curatedProductsContainer}>
            <ProductGroupList {...obj} />
          </div>
        );
      })}
      <TireSizeBoardContainer title={tireSizeBoardTitle} />
      {categoryData.links ? (
        <Grid css={styles.alsoInterestedContainer}>
          <GridItem
            gridColumn={'2/6'}
            gridColumnM={'2/8'}
            gridColumnL={'2/14'}
            gridColumnXL={'4/12'}
          >
            <LinkList {...categoryData.links} />
          </GridItem>
        </Grid>
      ) : null}
    </div>
  );
}
export default CategoryPage;
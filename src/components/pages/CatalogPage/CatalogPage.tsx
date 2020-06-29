import { ThemeProvider } from 'emotion-theming';
import { useRouter } from 'next/router';
import { useRef } from 'react';

import { useCatalogPageContext } from '~/context/CatalogPage.context';
import { CatalogSummaryContextProvider } from '~/context/CatalogSummary.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogGrid from './CatalogGrid/CatalogGrid';
import styles from './CatalogPage.styles';
import { defaultTheme, headerAdvanced } from './CatalogPage.theme';
import CatalogSummary from './CatalogSummary/CatalogSummary';
import {
  vehiclesDisambiguation,
  vehiclesNoOeWithSize,
  vehiclesNoResultWithTrim,
} from './CatalogSummary/CatalogSummary.mocks';

interface Props {
  comesFromSearch: boolean;
  hasTopPicks: boolean;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogPage({
  hasTopPicks,
  comesFromSearch,
  siteCatalogSummary,
}: Props) {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const catalogGrid = useRef<HTMLDivElement | null>(null);

  const { isAdvancedView, showCatalogGrid } = useCatalogPageContext();

  const { flow } = router.query;

  // TODO: Fake data waiting for mock data: SiteCatalogSummary response
  let catalogSummaryResponse = vehiclesNoOeWithSize;

  if (flow === 'disambiguation') {
    catalogSummaryResponse = vehiclesDisambiguation;
  } else if (flow === 'noResults') {
    catalogSummaryResponse = vehiclesNoResultWithTrim;
  }

  const totalResult =
    catalogSummaryResponse.siteCatalogSummaryMeta?.totalResults || 0;
  const hasResults = totalResult > 0;

  const exploreMore = () => {
    if (catalogGrid && catalogGrid.current) {
      catalogGrid.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ThemeProvider
      theme={{ ...defaultTheme, ...(isAdvancedView && headerAdvanced) }}
    >
      <div css={styles.root}>
        {hasTopPicks && (
          <CatalogSummaryContextProvider
            catalogSummaryResponse={
              siteCatalogSummary || catalogSummaryResponse
            }
            isSearch={comesFromSearch}
          >
            <CatalogSummary exploreMore={exploreMore} />
          </CatalogSummaryContextProvider>
        )}
        {/* Render when there's result, and not coming from search */}
        {hasResults && showCatalogGrid && (
          <div ref={catalogGrid}>
            <CatalogGrid
              hasTopPicks={hasTopPicks}
              siteCatalogSummary={siteCatalogSummary}
            />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CatalogPage;

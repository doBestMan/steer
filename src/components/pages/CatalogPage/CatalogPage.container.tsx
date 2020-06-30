import { useRouter } from 'next/router';

import { CatalogPageContextProvider } from '~/context/CatalogPage.context';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';

import CatalogPage from './CatalogPage';

interface Props {
  handleUpdateResults?: (filters: Record<string, string>) => void;
  hasTopPicks?: boolean;
  siteCatalogProducts?: any;
  siteCatalogSummary?: SiteCatalogSummary;
}

function CatalogPageContainer({
  hasTopPicks = true,
  handleUpdateResults,
  siteCatalogSummary,
  siteCatalogProducts,
}: Props) {
  // TEMP: use route params for testing flows
  const router = useRouter();
  const { isSearch } = router.query;

  return (
    <CatalogPageContextProvider showCatalogGridInit={isSearch !== 'true'}>
      <CatalogPage
        // later will be an context state
        handleUpdateResults={handleUpdateResults}
        comesFromSearch={isSearch === 'true'}
        hasTopPicks={hasTopPicks}
        siteCatalogProducts={siteCatalogProducts}
        siteCatalogSummary={siteCatalogSummary}
      />
    </CatalogPageContextProvider>
  );
}

export default CatalogPageContainer;

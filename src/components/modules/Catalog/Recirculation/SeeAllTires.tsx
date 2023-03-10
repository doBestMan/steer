import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SeeAllTires.styles';

interface Props {
  handleUpdateResults: (filters: Record<string, string>) => void;
  totalResults?: number;
}

function SeeAllTires({ handleUpdateResults, totalResults = 0 }: Props) {
  const { setIsAdvancedView, scrollToGrid } = useCatalogProductsContext();

  function handleSeeMore() {
    setIsAdvancedView(true);
    handleUpdateResults({ skipGroups: 'true' });
    setTimeout(scrollToGrid, TIME.MS100);
  }

  return (
    <div css={styles.root}>
      <button
        type="button"
        onClick={handleSeeMore}
        data-testid="catalog-see-all-button"
      >
        <h3 css={styles.title}>
          <span>
            {ui('catalog.recirculation.seeAllTires', { number: totalResults })}
          </span>
          <Icon css={styles.chevron} name={ICONS.CHEVRON_RIGHT} />
        </h3>
      </button>
      <p css={styles.description}>{ui('catalog.recirculation.allOfCatalog')}</p>
    </div>
  );
}

export default SeeAllTires;

import { FiltersContextProvider } from '~/components/modules/Catalog/Filters/Filters.context';
import { useUserPersonalizationContext } from '~/context/UserPersonalization.context';

import Header from './Header';

interface Props {
  hasTopPicks: boolean;
  isAdvancedView: boolean;
  isInternal?: boolean;
  toggleView: () => void;
}

function onSearchWithFilters(_filters: object) {
  // TODO: run search with new filters
}

const titlePlaceholder = (
  <>
    232 tires fit your
    <br />
    Lamborghini Aventador Roadster 2018
  </>
);

export default function HeaderContainer({
  hasTopPicks,
  isAdvancedView,
  toggleView,
}: Props) {
  const { locationString } = useUserPersonalizationContext();

  // TODO: hook up metadata

  return (
    <FiltersContextProvider onApplyFilters={onSearchWithFilters}>
      <Header
        hasTopPicks={hasTopPicks}
        isAdvancedView={isAdvancedView}
        isInternal={false}
        title={titlePlaceholder}
        tireSize="255/30 R20"
        rearTireSize="355/25 R21"
        resultsCount={232}
        onToggleView={toggleView}
        location={locationString}
      />
    </FiltersContextProvider>
  );
}

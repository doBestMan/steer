import Range from '~/components/global/Range/Range';
import { SiteCatalogFilterRange } from '~/data/models/SiteCatalogFilterRange';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  mapUnitToAriaFormatter,
  mapUnitToLabelFormatter,
} from '../Filters.constants';
import { ChildProps } from '../Popup/FilterPopup.utils';
import FilterHeader from './FilterHeader';
import { useFilterRangeManager } from './FilterRange.hooks';
import styles from './FilterRange.styles';

export default function FilterRange({
  filtersToApply,
  header,
  id,
  isLarge,
  maxValue,
  minValue,
  onChange,
  openStaticModal,
  step,
  isPreviewLoading,
  unit,
}: SiteCatalogFilterRange &
  Pick<
    ChildProps,
    | 'isPreviewLoading'
    | 'isLarge'
    | 'onChange'
    | 'filtersToApply'
    | 'openStaticModal'
  >) {
  const {
    handleMaxChange,
    handleMinChange,
    handleUpdateFilters,
    maxCurrent,
    minCurrent,
    refreshValues,
    shouldReset,
  } = useFilterRangeManager({
    filterGroup: filtersToApply[id],
    id,
    isLoading: isPreviewLoading,
    maxValue,
    minValue,
    onChange,
  });
  return (
    <div css={styles.root}>
      <FilterHeader
        customHeaderStyles={styles.header}
        header={header}
        title={<h2 css={styles.title}>{header?.title}</h2>}
        isLarge={isLarge}
        openStaticModal={openStaticModal}
      />
      <Range
        refreshValues={refreshValues}
        formatLabel={mapUnitToLabelFormatter[unit]}
        getAriaText={mapUnitToAriaFormatter[unit]}
        name={ui('catalog.filters.slider', { name: id })}
        interval={step}
        onUpdate={handleUpdateFilters}
        max={maxValue}
        shouldReset={shouldReset}
        min={minValue}
        minCurrent={minCurrent}
        maxCurrent={maxCurrent}
        onMaxChange={handleMaxChange}
        onMinChange={handleMinChange}
      />
    </div>
  );
}

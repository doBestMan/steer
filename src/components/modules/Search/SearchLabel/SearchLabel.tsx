import React, { useMemo } from 'react';

import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { Breakpoint, BREAKPOINT_SIZES, CSSStylesProp } from '~/lib/constants';
import { searchCTACarExclusion } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './SearchLabel.styles';

interface Props {
  customContainerStyles?: CSSStylesProp;
  fullLabelAt?: Breakpoint;
  hideOnSmallMedium?: boolean;
}

function SearchLabel({
  customContainerStyles,
  fullLabelAt = BREAKPOINT_SIZES.L,
  hideOnSmallMedium = false,
}: Props) {
  const { lessThan } = useBreakpoints();
  const { filterPills } = useSearchContext();

  const shouldNotVehicleOptionPresent = useMemo(() => {
    return filterPills.some(
      (filterPill) =>
        filterPill.type === 'tireType' &&
        searchCTACarExclusion.test(filterPill.label),
    );
  }, [filterPills]);

  if (lessThan[fullLabelAt]) {
    return (
      <span
        css={[styles.label, hideOnSmallMedium && styles.hideOnSmallMedium]}
        aria-label={ui('search.searchAutocompleteLabel')}
      >
        {ui('search.searchBy')}
        <span
          css={[styles.scrollContainer, customContainerStyles]}
          aria-hidden="true"
        >
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.vehicle').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.tireSize').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.brand').toLocaleLowerCase()}
          </span>
          <span css={styles.scrollItem}>
            {ui('search.searchCategories.vehicle').toLocaleLowerCase()}
          </span>
        </span>
      </span>
    );
  }

  return (
    <span css={styles.label}>
      {shouldNotVehicleOptionPresent
        ? ui('search.searchByTireSize')
        : ui('search.searchAutocompleteLabel')}
    </span>
  );
}

export default SearchLabel;

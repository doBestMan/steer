import { useEffect, useRef } from 'react';

import BottomCardModal from '~/components/global/Modal/BottomCardModal';
import FilterContent from '~/components/modules/ReviewListing/Filters/FilterContent';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { ui } from '~/lib/utils/ui-dictionary';

import FilterDropdown from './FilterDropdown';
import { FilterGroup } from './Filters.types';

interface Props {
  filterGroups: FilterGroup[];
  isOpen: boolean;
  label: string;
  onClose: () => void;
}

export default function FilterPopup({
  filterGroups,
  isOpen,
  onClose,
  label,
}: Props) {
  const { greaterThan } = useBreakpoints();
  const contentLabel = ui('reviews.chooseFilter', { filter: label });
  const isLarge = greaterThan.M;
  const prevIsLarge = useRef(isLarge);

  useEffect(() => {
    if (isOpen && !prevIsLarge.current && isLarge) {
      onClose();
    }
    prevIsLarge.current = isLarge;
  }, [isOpen, onClose, isLarge]);

  if (isLarge) {
    return (
      <FilterDropdown isOpen={isOpen} onClose={onClose}>
        <FilterContent filterGroups={filterGroups} />
      </FilterDropdown>
    );
  }

  return (
    <BottomCardModal
      contentLabel={contentLabel}
      isOpen={isOpen}
      onClose={onClose}
    >
      <FilterContent filterGroups={filterGroups} contentLabel={contentLabel} />
    </BottomCardModal>
  );
}

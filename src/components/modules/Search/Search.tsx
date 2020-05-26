import { RefObject, useState } from 'react';

import { TIME } from '~/lib/constants';
import { scrollTo } from '~/lib/helpers/scroll';

import InitialSearch from './InitialSearch';
import {
  SearchResultListEnum,
  SearchState,
  SearchStateType,
} from './Search.constants';
import styles from './Search.styles';
import SearchAutocomplete from './SearchAutocomplete';

export interface Results {
  siteSearchGroupList: SearchGroup[];
}

export interface SearchGroup {
  label?: string;
  labelFragments?: Array<{ highlighted: boolean; value: string }>;
  siteSearchResultList: SearchResult[];
  type: SearchResultListEnum;
}

export interface SearchResult {
  additionalDisplayValue?: string;
  displayImage?: string;
  displayValue: string;
  type: string;
  value: string;
}

interface Props {
  forwardedRef?: RefObject<HTMLDivElement>;
  onClearSearchesClick: () => void;
  onCloseSearchClick: () => void;
  onSetSearchCategory: (category: SearchStateType) => void;
  pastSearches: SearchResult[];
  results: Results;
}

function Search({
  onClearSearchesClick,
  onCloseSearchClick,
  onSetSearchCategory,
  pastSearches,
  forwardedRef,
  results,
}: Props) {
  const [query, setQuery] = useState('');
  const [searchState, setSearchState] = useState(SearchState.FREE_SEARCH);

  const handleClearSearchesClick = () => {
    onClearSearchesClick();

    setTimeout(() => {
      scrollTo(0, TIME.MS400 / 1000);
    }, TIME.MS200);
  };

  const onChange = (input: string) => {
    setQuery(input);
  };

  const onCancelSelection = () => {
    // Reset the search category when search cleared with no query.
    if (!query) {
      setSearchState(SearchState.FREE_SEARCH);
      onSetSearchCategory(SearchState.FREE_SEARCH);
    }
  };

  const handleValueSelection = (searchResult: SearchResult) => {
    setQuery(searchResult.displayValue);
  };

  // We need to set the search state internally for UI purposes, but also
  // externally in order to update the search results.
  const handleSearchCategoryClick = (searchResult: SearchResult) => {
    const category = SearchState[searchResult.value];
    setSearchState(category);
    onSetSearchCategory(category);
  };

  const handlePastSearchClick = () => {};

  const shouldShowInitialSearch =
    query.length === 0 && searchState === SearchState.FREE_SEARCH;

  return (
    <div css={styles.container} ref={forwardedRef}>
      <SearchAutocomplete
        focusOnMount
        onCancelSelection={onCancelSelection}
        onChange={onChange}
        onCloseSearchClick={onCloseSearchClick}
        onValueSelection={handleValueSelection}
        results={results.siteSearchGroupList}
        query={query}
        searchState={searchState}
      />
      {shouldShowInitialSearch && (
        <InitialSearch
          onClearSearchesClick={handleClearSearchesClick}
          onPastSearchClick={handlePastSearchClick}
          onSearchCategoryClick={handleSearchCategoryClick}
          pastSearches={pastSearches}
        />
      )}
    </div>
  );
}

export default Search;

import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { SiteSearchResultGroup } from '~/data/models/SiteSearchResultGroup';
import { SiteSearchResultImageItem } from '~/data/models/SiteSearchResultImageItem';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';
import { ui } from '~/lib/utils/ui-dictionary';

export interface Results {
  resultMetadata: ListResultMetadata;
  siteSearchResultGroupList: SiteSearchResultGroup[];
}

export type SearchResult = SiteSearchResultImageItem | SiteSearchResultTextItem;

export enum SearchResultEnum {
  IMAGE = 'SiteSearchResultImageItem',
  TEXT = 'SiteSearchResultTextItem',
}

export enum SearchTypeEnum {
  FILTER = 'filter',
  FUNNEL = 'funnel',
}

export type SearchResultType =
  | 'SiteSearchResultImageItem'
  | 'SiteSearchResultTextItem';

export enum SearchActionType {
  LINK = 'SiteSearchResultActionLink',
  QUERY = 'SiteSearchResultActionQuery',
}

export enum SearchStateEnum {
  BRAND = 'brand',
  FREE_SEARCH = '',
  FRONT_TIRE = 'frontTireSize',
  POPULAR = 'mostPopularProductLine',
  REAR_TIRE = 'rearTireSize',
  REAR_TIRE_WIDTH = 'rearWidthRatio',
  TIRE_SIZE = 'tireSize',
  TIRE_TYPE = 'tireType',
  VEHICLE = 'vehicle',
}

export const SearchStateCopy: Record<string, string> = {
  [SearchStateEnum.BRAND]: ui('search.searchCategories.brand'),
  [SearchStateEnum.TIRE_SIZE]: ui('search.searchCategories.tireSize'),
  [SearchStateEnum.VEHICLE]: ui('search.searchCategories.vehicle'),
  [SearchStateEnum.TIRE_TYPE]: ui('search.searchCategories.tireType'),
};

export const SearchStateQueryType: Record<string, string> = {
  [SearchStateEnum.BRAND]: 'brand',
  [SearchStateEnum.FRONT_TIRE]: 'frontTireSize',
  [SearchStateEnum.REAR_TIRE]: 'rearTireSize',
  [SearchStateEnum.REAR_TIRE_WIDTH]: 'rearWidthRatio',
  [SearchStateEnum.TIRE_SIZE]: 'tireSize',
  [SearchStateEnum.VEHICLE]: 'vehicle',
  [SearchStateEnum.TIRE_TYPE]: 'tireType',
};

export enum SearchInputEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export type SearchInputType = 'primary' | 'secondary';

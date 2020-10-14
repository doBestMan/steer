import ProductGroupList from '~/components/global/ProductGroupList/ProductGroupList';
import ProductGroupListPlaceholder from '~/components/global/ProductGroupList/ProductGroupListPlaceholder';
import { addHashForScroll } from '~/components/pages/CatalogPage/CatalogPage.helpers';
import { useCatalogProductsContext } from '~/context/CatalogProducts.context';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';

import styles from './CatalogProductGroups.styles';

interface Props {
  isLoading?: boolean;
  productGroupList: SiteCatalogProductGroupList;
}

function CatalogProductGroups({ productGroupList, isLoading }: Props) {
  const { handleUpdateResults } = useCatalogProductsContext();
  const handleClick = (groupId: string) => () => {
    addHashForScroll(groupId);
  };

  return (
    <div css={styles.root}>
      {isLoading
        ? Array(3)
            .fill({})
            .map((_, i) => (
              <div css={styles.group} key={i}>
                <ProductGroupListPlaceholder />
              </div>
            ))
        : productGroupList.map((group) => (
            <div
              data-scroll-id={`${group.id}`}
              key={group.id}
              css={styles.group}
              onClick={handleClick(group.id)}
            >
              <ProductGroupList onClick={handleUpdateResults} {...group} />
            </div>
          ))}
    </div>
  );
}

export default CatalogProductGroups;

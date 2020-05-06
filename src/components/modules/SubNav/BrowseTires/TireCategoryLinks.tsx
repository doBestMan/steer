import GridItem from '~/components/global/Grid/GridItem';
import IconOrImage from '~/components/global/IconOrImage/IconOrImage';
import { useNavState } from '~/components/global/Nav/Nav.container';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import styles from './BrowseTires.styles';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
}

function TireCategoryLinks({ siteMenuBrowseList }: Props) {
  const { activeCategory, createSelectCategoryHandler } = useNavState();
  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;
  return (
    <GridItem gridColumnM="1/3" gridColumnL="1/4">
      <div css={styles.header}>{isMobile ? 'Browse tires by' : 'Shop by'}</div>
      {siteMenuBrowseList.map(({ title, icon }) => {
        const isSelected = activeCategory === title;
        return (
          <span
            key={title}
            css={[styles.container, isSelected && styles.selected]}
          >
            <div css={!isMobile && isSelected && styles.decoration} />
            <button
              css={styles.label}
              onClick={createSelectCategoryHandler(title)}
            >
              {title}
              {icon && <IconOrImage css={styles.flair} {...icon} />}
            </button>
          </span>
        );
      })}
    </GridItem>
  );
}

export default TireCategoryLinks;
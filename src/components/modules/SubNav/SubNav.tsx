import { useEffect, useRef } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { useNavState } from '~/components/global/Nav/Nav.container';
import { NAV_TARGETS } from '~/components/global/Nav/Nav.data';
import BrowseTires from '~/components/modules/SubNav/BrowseTires/BrowseTires';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';

import Learn from './Learn';
import styles from './SubNav.styles';
import SubNavLinks from './SubNavLinks';
import SubNavModal from './SubNavModal';

interface Props {
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
}

function SubNav({ siteMenuBrowseList, siteMenuLearn }: Props) {
  const {
    activeCategory,
    handleCloseSubNav,
    createSelectCategoryHandler,
    isSubNavOpen,
    activeLink,
  } = useNavState();

  const breakpoint = useBreakpoints();
  const isMobile = breakpoint === BREAKPOINT_SIZES.S;

  const prevLink = useRef(activeLink);
  useEffect(() => {
    if (!activeCategory && !isMobile) {
      createSelectCategoryHandler(siteMenuBrowseList[0].title)();
    }
    // don't set focus on first list item if opening subnav
    prevLink.current = activeLink;
  }, [
    activeCategory,
    createSelectCategoryHandler,
    activeLink,
    isMobile,
    siteMenuBrowseList,
  ]);

  return (
    <SubNavModal
      contentLabel={`Navigation - ${activeLink}`}
      onClose={handleCloseSubNav}
      isOpen={isSubNavOpen}
    >
      <Grid css={styles.root}>
        <Button
          aria-label="Close navigation modal"
          css={[styles.action, styles.close]}
          onClick={handleCloseSubNav}
        >
          <Icon name={ICONS.CLOSE} />
        </Button>
        <GridItem fullbleedS fullbleedM gridColumnL="8/15" css={styles.subnav}>
          <div css={styles.border} />
          <SubNavLinks siteMenuBrowseList={siteMenuBrowseList} />
          <GridItem isGrid fullbleedS fullbleedM gridColumnL="8/15">
            {activeLink === NAV_TARGETS.BROWSE_TIRES && (
              <BrowseTires
                shouldSetFocus={!!(prevLink.current === activeLink)}
                siteMenuBrowseList={siteMenuBrowseList}
              />
            )}
            {activeLink === NAV_TARGETS.LEARN && (
              <Learn siteMenuLearn={siteMenuLearn} />
            )}
          </GridItem>
        </GridItem>
      </Grid>
    </SubNavModal>
  );
}

export default SubNav;

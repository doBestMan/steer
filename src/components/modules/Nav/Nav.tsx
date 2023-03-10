import { useTheme } from '@emotion/react';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import BaseLink from '~/components/global/Link/BaseLink';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useNavContext } from '~/context/Nav.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { LOADING_OPTIONS, TIME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { layout } from '~/styles/layout.styles';

import { useSearchModalContext } from '../Search/SearchModal.context';
import { animations, styles } from './Nav.styles';
import NavBar from './NavBar';
import ShopTiresBy from './ShopTiresBy/ShopTiresBy';

export const NAV_ID = 'main-navigation';

interface Props {
  isHomepage?: boolean;
  isPLA?: boolean;
}

function Nav({ isHomepage, isPLA }: Props) {
  const { isVisible, toggleSubNav, createSelectLinkHandler } = useNavContext();

  const { toggleIsSearchOpen } = useSearchModalContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme: any = useTheme();
  const { searchQuery, setSearchState } = useSearchContext();
  const { isMobile } = useSiteGlobalsContext();

  return (
    <Transition appear={false} in={isVisible} timeout={TIME.MS400}>
      {(containerTransitionState: TransitionStatus) => {
        const rootStyles = [
          styles.root,
          theme.textColor,
          animations[`root_${containerTransitionState}`],
        ];

        return (
          <div id={NAV_ID} tabIndex={0} css={disableGlobalFocus}>
            <Grid as="nav" css={rootStyles}>
              <GridItem
                css={[layout.container, styles.container]}
                gridColumn="2/4"
              >
                <BaseLink
                  href="/"
                  css={[layout.container, layout.centeredVertical]}
                >
                  <Image
                    altText={ui('logo.alt')}
                    css={isHomepage ? styles.logoHome : styles.logo}
                    loading={LOADING_OPTIONS.EAGER}
                    src={
                      isMobile
                        ? theme.logoUrlMobile
                        : isHomepage
                        ? theme.logoUrlHome
                        : theme.logoUrl
                    }
                  />
                </BaseLink>
              </GridItem>
              {!isMobile && isPLA && (
                <GridItem
                  gridColumnM="4/7"
                  gridColumnL="5/8"
                  css={styles.shopTiresInNav}
                >
                  <ShopTiresBy
                    onSearchQuery={searchQuery}
                    onSetSearchState={setSearchState}
                  />
                </GridItem>
              )}
              <NavBar
                handleOnNavLinkClick={createSelectLinkHandler}
                handleOnSearchClick={toggleIsSearchOpen}
                handleOnSubNavClick={toggleSubNav}
                isHomepage={isHomepage}
                isPLA={isPLA}
                theme={theme}
              />
              {isMobile && isPLA && (
                <GridItem fullbleed css={styles.shopByTiresWrapper}>
                  <ShopTiresBy
                    onSearchQuery={searchQuery}
                    onSetSearchState={setSearchState}
                  />
                </GridItem>
              )}
            </Grid>
          </div>
        );
      }}
    </Transition>
  );
}

export default Nav;

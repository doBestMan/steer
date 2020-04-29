import styles from './Nav.styles';

import Image from '~/components/global/Image/Image';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import NavLink from '~/components/global/Link/NavLink';
import BaseLink from '~/components/global/Link/BaseLink';

import { Icon as IconType } from '~/components/global/Icon/Icon.types';

import { layout } from '~/styles/layout.styles';
import { ICONS } from '~/components/global/Icon/Icon.constants';

interface LinkType {
  action: string;
  icon?: IconType;
  label?: string;
  text?: string;
}

interface Props {
  links: LinkType[];
}

const CONSTANTS = {
  LOGO_ALT_TEXT: 'Simple Tire',
  MOBILE_MENU_ARIA_LABEL: 'Mobile menu',
};

function Nav({ links }: Props) {
  return (
    <Grid as="nav" css={styles.root}>
      <GridItem css={layout.container} gridColumn="2/4">
        <BaseLink href="/" css={[layout.container, layout.centeredVertical]}>
          <Image
            altText={CONSTANTS.LOGO_ALT_TEXT}
            css={styles.logo}
            srcSet="/static/assets/logo.svg"
          />
        </BaseLink>
      </GridItem>
      <GridItem
        as="ul"
        css={styles.links}
        gridColumn="4/6"
        gridColumnM="4/8"
        gridColumnL="6/14"
      >
        {links.map(({ action, icon, label, text }: LinkType) => {
          return (
            <li css={styles.listItem} key={`${text}${icon}`}>
              <NavLink aria-label={label} href={action} icon={icon}>
                {text}
              </NavLink>
            </li>
          );
        })}
        <li css={[styles.listItem, styles.hamburger]}>
          <NavLink
            aria-label={CONSTANTS.MOBILE_MENU_ARIA_LABEL}
            as="button"
            icon={ICONS.MENU}
          />
        </li>
      </GridItem>
    </Grid>
  );
}

export default Nav;
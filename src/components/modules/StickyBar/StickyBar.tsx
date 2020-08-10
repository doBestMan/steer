import { ReactNode } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Image from '~/components/global/Image/Image';
import { SiteImage } from '~/data/models/SiteImage';
import { CSSStylesProp, THEME } from '~/lib/constants';
import { transformSrcLogoToWhite } from '~/lib/utils/cloudinary/cloudinary';

import styles from './StickyBar.styles';

interface Props {
  children: ReactNode;
  customPrimaryColStyles?: CSSStylesProp;
  icon?: IconType;
  isStickyBottom?: boolean;
  isStickyTop?: boolean;
  logo?: SiteImage | null;
  secondaryLabel?: string;
  theme: THEME;
}

const BRAND_LOGO_SIZES = [200];

function StickyBar({
  children,
  icon,
  isStickyBottom,
  isStickyTop,
  logo,
  customPrimaryColStyles,
  secondaryLabel,
  theme,
}: Props) {
  if (logo && logo.src) {
    logo.src = transformSrcLogoToWhite(logo.src);
  }

  return (
    <div
      css={[
        styles.container,
        styles[theme],
        isStickyBottom && styles.stickyBottom,
        isStickyTop && styles.stickyTop,
      ]}
    >
      {(logo || secondaryLabel || icon) && (
        <>
          {icon && <Icon name={icon} css={styles.icon} />}
          <div css={styles.secondaryColumn}>
            {logo && (
              <div>
                <Image
                  css={styles.logo}
                  altText={logo.altText}
                  src={logo.src}
                  widths={BRAND_LOGO_SIZES}
                />
              </div>
            )}

            {secondaryLabel && (
              <p css={styles.secondaryLabel}>{secondaryLabel}</p>
            )}
          </div>
        </>
      )}

      <div css={[styles.primaryColumn, customPrimaryColStyles]}>{children}</div>
    </div>
  );
}

export default StickyBar;

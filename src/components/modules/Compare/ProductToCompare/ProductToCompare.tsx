import React, { useMemo, useState } from 'react';

import BrandLogoOrLabel from '~/components/global/BrandLogoOrLabel/BrandLogoOrLabel';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Image from '~/components/global/Image/Image';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { PRODUCT, TIME } from '~/lib/constants';
import { SHADOW_SRC } from '~/lib/constants/image';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { getSquareImageTransformations } from '~/lib/utils/cloudinary/cloudinary';

import styles from './ProductToCompare.styles';

export interface Props {
  hasBackground?: boolean;
  hasCTAs?: boolean;
  href?: string;
  index: number;
  isBig?: boolean;
  onClose: (productId: string) => void;
  product: SiteCatalogProductItem;
  setRemovingProductIndex: (index: number) => void;
}

function ProductToCompare({
  index,
  product,
  onClose,
  isBig = false,
  hasBackground = false,
  setRemovingProductIndex,
}: Props) {
  const { brand, name, loadSpeedRating } = product;
  const imageList = product?.imageList || [];
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [hasImageLoaded, setHasImageLoaded] = useState<boolean>(false);
  const [shouldDisplayAsset, setShouldDisplayAsset] = useState(true);

  const displayedImage =
    imageList.find(
      (image) => image.productImageType === PRODUCT_IMAGE_TYPES.SIDETREAD,
    ) || imageList[0];

  const imageWidths = useMemo(() => [70], []);

  const imageTransformations = useMemo(
    () => getSquareImageTransformations(imageWidths),
    [imageWidths],
  );

  const handleImageLoad = () => {
    setHasImageLoaded(true);
  };

  const onImageError = () => {
    setShouldDisplayAsset(false);
  };

  const handleClose = () => {
    setIsRemoving(true);
    setRemovingProductIndex(index);
    setTimeout(() => {
      onClose && onClose(product.productId as string);
    }, TIME.MS750);
  };

  return (
    <div
      css={[
        styles.root,
        isBig && styles.bigRoot,
        isRemoving && styles.isRemoving,
      ]}
    >
      <span
        css={[styles.closeButton, styles.blackButton]}
        onClick={handleClose}
        aria-label="close"
        role="button"
        tabIndex={-1}
      >
        <Icon name={ICONS.CLOSE} />
      </span>
      <div css={[styles.image, isBig && styles.bigImage]}>
        {shouldDisplayAsset && (
          <>
            <Image
              widths={imageWidths}
              altText={displayedImage.image.altText}
              src={displayedImage.image.src}
              srcTransformationArgs={imageTransformations}
              noPlaceholder
              onError={onImageError}
              onLoad={handleImageLoad}
            />

            <div css={[styles.shadow, hasImageLoaded && styles.shadowLoaded]}>
              <Image
                width={1400}
                height={800}
                widths={imageWidths}
                altText={''}
                responsive
                aria-hidden
                src={SHADOW_SRC}
                noPlaceholder
              />
            </div>
          </>
        )}
      </div>
      <div css={styles.info}>
        {brand && (
          <span css={styles.brand}>
            <BrandLogoOrLabel
              brand={brand}
              widths={PRODUCT.BRAND_IMAGE_WIDTHS}
              isCentered
              customLabelStyles={styles.brandLabel}
              customContainerStyles={styles.brandContainer}
            />
          </span>
        )}
        <h3 css={[styles.subcopy, !hasBackground && styles.name]}>
          {name} {loadSpeedRating}
        </h3>
      </div>
    </div>
  );
}

export default ProductToCompare;

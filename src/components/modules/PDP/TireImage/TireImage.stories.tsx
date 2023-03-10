import {
  SiteCatalogProductImage,
  SiteCatalogProductImageProductImageTypeEnum,
  SiteCatalogProductImageTypeEnum,
} from '~/data/models/SiteCatalogProductImage';
import { SiteImage } from '~/data/models/SiteImage';
import { SiteProductLine } from '~/data/models/SiteProductLine';
import {
  SiteYouTubeVideo,
  SiteYouTubeVideoTypeEnum,
} from '~/data/models/SiteYouTubeVideo';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import TireImage from './TireImage';

export default {
  component: TireImage,
  title: 'PDP/Tire Image',
};

const video = {
  poster: {
    altText: 'Video poster',
    height: 1080,
    src: 'https://picsum.photos/1920/1080',
    type: 'SiteImage',
    width: 1920,
  },
  type: SiteYouTubeVideoTypeEnum.SiteYouTubeVideo,
  videoId: 'iQdV2fDR9RY',
};

const assetList: SiteProductLine['assetList'] = [
  {
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
      type: 'SiteImage',
      width: 800,
    },
    productImageType: 'sidewall',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire sidetread',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
      type: 'SiteImage',
      width: 543,
    },
    productImageType: 'sidetread',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire treadfull',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-treadfull_xpitvf.png',
      type: 'SiteImage',
      width: 272,
    },
    productImageType: 'treadfull',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
  {
    image: {
      altText: 'Tire treadonly',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705546/line-images/1349/1349-treadonly_pa1oew.png',
      type: 'SiteImage',
      width: 800,
    },
    productImageType: 'treadonly',
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  } as SiteCatalogProductImage,
];

const brand = {
  image: {
    altText: 'AG-Dura',
    height: 20,
    src:
      'https://images.simpletire.com/image/upload/v1593195319/manf-logos/417b.svg',
    type: ICON_IMAGE_TYPE.IMAGE,
    width: 120,
  } as SiteImage,
  label: 'AG-Dura',
};

const unavailableAssetList: SiteProductLine['assetList'] = [
  {
    image: {
      altText: 'Image not available',
      height: 986,
      src:
        'https://images.simpletire.com/image/upload/v1593202327/steer/pdp/image-unavailable.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 709,
    },
    productImageType: SiteCatalogProductImageProductImageTypeEnum.Unavailable,
    type: SiteCatalogProductImageTypeEnum.SiteCatalogProductImage,
  },
];
export function TireImageCarousel() {
  return <TireImage assetList={assetList} brand={brand} />;
}

export function UnavailableTireImage() {
  return <TireImage assetList={unavailableAssetList} brand={brand} />;
}

export function TireImagesWithVideo() {
  return (
    <TireImage
      assetList={[...assetList, video as SiteYouTubeVideo]}
      brand={brand}
    />
  );
}

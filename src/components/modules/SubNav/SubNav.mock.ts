import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

const deals: SiteMenuBrowseGroupItem = {
  header: null,
  items: [
    {
      label: '$100 off on Firestone',
      link: { href: '/firestone', isExternal: false },
      flair: { type: 'string', value: 'Best seller' },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$70 off on Goodyear',
      link: { href: '/goodyear', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$70 off on Nexen',
      link: { href: '/nexen', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$80 off on Pirelli',
      link: { href: '/pirelli', isExternal: false },
      flair: { type: ICON_IMAGE_TYPE.ICON, svgId: 'fire' },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$50 off on Michelin',
      link: { href: '/michelin', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '5% off with military discount',
      flair: null,
      link: { href: '/military-discount', isExternal: false },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        src: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
  ],
  more: {
    label: 'See all 10 deals',
    link: { href: '/deals', isExternal: false },
  },
};

const vehicleType = {
  header: { title: 'Vehicle type', icon: null },
  items: [
    {
      label: 'Passenger',
      link: { href: '/vehicle/passenger', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_PASSENGER,
      } as SiteIcon,
    },
    {
      label: 'Light trucks',
      link: { href: '/vehicle/light-trucks', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_LIGHT_TRUCK,
      } as SiteIcon,
    },
    {
      label: 'Commercial',
      link: { href: '/vehicle/commercial', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_COMMERCIAL,
      } as SiteIcon,
    },
  ],
  more: {
    label: 'See all 11 vehicle types',
    link: { href: '/vehicles', isExternal: false },
  },
};

const tireCategory = {
  header: { title: 'Tire category', icon: null },
  items: [
    {
      label: 'Performance',
      link: { href: '/tire-category/performance', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: 'All season',
      link: { href: '/tire-category/all-season', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: 'Winter',
      link: { href: '/tire-category/winter', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.INSIGHTS_WINTER,
      } as SiteIcon,
    },
  ],
  more: {
    label: 'See all 15 tire categories',
    link: { href: '/tire-category', isExternal: false },
  },
};

const wheelSizes = {
  header: {
    title: 'Wheel sizes',
    icon: { type: ICON_IMAGE_TYPE.ICON, svgId: ICONS.WHEEL } as SiteIcon,
  },
  items: [
    {
      label: '15"',
      link: { href: '/sizes/15-in', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: '16"',
      link: { href: '/sizes/16-in', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: '17"',
      link: { href: '/sizes/17-in', isExternal: false },
      flair: null,
      icon: null,
    },
  ],
  more: {
    label: 'All wheel sizes',
    link: { href: '/wheel-sizes', isExternal: false },
  },
};

export const browseTiresGroupItemsMock = {
  deals,
  vehicleType,
  tireCategory,
  wheelSizes,
};

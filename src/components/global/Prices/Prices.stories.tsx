import { boolean, select, text } from '@storybook/addon-knobs';

import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import Prices from './Prices';
import { bestPriceStyle } from './Prices.styles';

export default {
  component: Prices,
  title: 'Global/Prices',
};

const mapPriceTypographyToCSS = {
  Primary: typography.primaryHeadline,
  Secondary: typography.secondaryHeadline,
  Default: null,
};

export function PricesWithKnobs() {
  const isLight = boolean('Light theme?', false);
  const isStartingAtPrice = boolean('Is starting at price?', false);
  const currentPriceTypography = select(
    'Current price typography',
    ['Primary', 'Secondary', 'Default'],
    'Default',
  );
  const showMultiple = boolean('Show multiple prices', false);
  const salePriceInCents = text('Current price (cents)', '15975');
  const estimatedRetailPriceInCents = text('Original price (cents)', '13296');
  const originalPrefix = text('Original price prefix', '');

  const priceList = [
    {
      label: showMultiple ? 'Front' : null,
      price: {
        salePriceInCents,
        estimatedRetailPriceInCents,
      },
    },
  ];

  if (showMultiple) {
    priceList.push({
      label: 'Rear',
      price: {
        salePriceInCents,
        estimatedRetailPriceInCents,
      },
    });
  }

  return (
    <div
      css={{
        backgroundColor: isLight ? COLORS.GLOBAL.ORANGE : 'transparent',
      }}
    >
      <Prices
        isLight={isLight}
        isStartingAtPrice={isStartingAtPrice}
        customPriceStyles={
          mapPriceTypographyToCSS[currentPriceTypography] || undefined
        }
        priceList={priceList}
        originalPrefix={originalPrefix}
      />
    </div>
  );
}

export function MultiplePrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        salePriceInCents: '15975',
        estimatedRetailPriceInCents: '15975',
      },
    },
    {
      label: 'Rear',
      price: {
        salePriceInCents: '11975',
        estimatedRetailPriceInCents: '11975',
      },
    },
  ];

  return <Prices priceList={priceList} />;
}

export function DiscountedPrices() {
  const priceList = [
    {
      label: null,
      price: {
        salePriceInCents: '15975',
        estimatedRetailPriceInCents: '18296',
      },
    },
  ];

  return <Prices priceList={priceList} />;
}

export function LightPrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        salePriceInCents: '15975',
        estimatedRetailPriceInCents: '13295',
      },
    },
    {
      label: 'Rear',
      price: {
        salePriceInCents: '11975',
        estimatedRetailPriceInCents: '15893',
      },
    },
  ];

  return (
    <div
      css={{
        backgroundColor: COLORS.GLOBAL.ORANGE,
      }}
    >
      <Prices isLight priceList={priceList} />
    </div>
  );
}

export function LargePrices() {
  const priceList = [
    {
      label: 'Front',
      price: {
        salePriceInCents: '15975',
        estimatedRetailPriceInCents: '13295',
      },
    },
    {
      label: 'Rear',
      price: {
        salePriceInCents: '11975',
        estimatedRetailPriceInCents: '15893',
      },
    },
  ];

  return (
    <Prices
      customPriceStyles={typography.secondaryHeadline}
      priceList={priceList}
    />
  );
}

export function NoPrices() {
  return (
    <div
      css={{
        backgroundColor: COLORS.GLOBAL.ORANGE,
      }}
    >
      <Prices priceList={null} />
    </div>
  );
}

export function StartAtPrice() {
  const priceList = [
    {
      label: null,
      price: {
        salePriceInCents: '15975',
        estimatedRetailPriceInCents: '',
      },
    },
  ];

  return <Prices priceList={priceList} isStartingAtPrice />;
}

export function PriceWithBestPriceGaurantee() {
  const priceList = [
    {
      label: null,
      price: {
        salePriceInCents: '16499',
        estimatedRetailPriceInCents: '17996',
      },
    },
  ];

  const isSalePrice =
    parseInt(priceList[0].price.salePriceInCents, 10) <
    parseInt(priceList[0].price.estimatedRetailPriceInCents, 10);

  return (
    <Prices
      originalPrefix={ui('common.originalPricePrefix')}
      priceList={priceList}
      customPriceStyles={[
        bestPriceStyle.prices,
        !isSalePrice ? bestPriceStyle.pricesPadded : {},
      ]}
      customOriginalStyles={bestPriceStyle.originalPrice}
      handleClickBestPrice={() => {}}
    />
  );
}

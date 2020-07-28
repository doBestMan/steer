import Prices from '~/components/global/Prices/Prices';
import { formatDollars } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';
import { typography } from '~/styles/typography.styles';

import styles from './Price.styles';
import { ProductInfoProps } from './ProductInfo';

type Props = Pick<
  ProductInfoProps,
  'price' | 'priceLabel' | 'volatileAvailability' | 'startingPrice'
>;

function Price({
  price,
  priceLabel,
  volatileAvailability,
  startingPrice,
}: Props) {
  if (startingPrice) {
    return (
      <p css={styles.startingPrice}>
        {uiJSX('pdp.productInfo.startingAtLabel', {
          value: (
            <span key="starting-price">{formatDollars(startingPrice)}</span>
          ),
        })}
      </p>
    );
  }

  if (!price) {
    return null;
  }

  return (
    <>
      {priceLabel && <p css={styles.priceFeature}>{priceLabel}</p>}
      {volatileAvailability && (
        <p css={styles.priceFeature}>
          {ui('pdp.productInfo.volatileAvailability')}
        </p>
      )}
      <Prices
        originalPrefix={ui('common.originalPricePrefix')}
        priceList={[{ price }]}
        currentPriceCSS={typography.primaryHeadline}
      />
    </>
  );
}

export default Price;

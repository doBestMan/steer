import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import Input from '~/components/global/Input/Input';
import { useOrderTrackingContext } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.context';
import { INPUT_TYPE } from '~/lib/constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants/routes';
import { onlyNumbers } from '~/lib/utils/regex';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderTrackingForm.styles';

function OrderTrackingForm() {
  const router = useRouter();
  const {
    getOrderTracking,
    isLoadingOrder,
    hasError,
    order,
  } = useOrderTrackingContext();
  const [orderId, setOrderId] = useState('');
  const [shippingZip, setShippingZip] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (orderId && shippingZip) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [orderId, shippingZip, hasError]);

  useEffect(() => {
    if (order && !hasError && !isLoadingOrder) {
      router.push({
        pathname: ROUTE_MAP[ROUTES.ORDER_TRACKING_RESULT],
        query: { orderId, zip: shippingZip },
      });
    }
  });

  const handleShippingZipChange = (value: string) => {
    const newValue = value.replace(onlyNumbers, '');
    setShippingZip(newValue);
  };

  const handleSubmit = async () => {
    getOrderTracking({
      orderId,
      zip: shippingZip,
    });
  };

  const handleSubmitBtnClick = (event: React.MouseEvent) => {
    event.preventDefault();

    handleSubmit();
  };

  return (
    <form css={styles.root} onSubmit={handleSubmit}>
      <div css={styles.input}>
        <Input
          error={{ hasError }}
          value={orderId}
          onChange={setOrderId}
          label={ui('common.form.orderId')}
          type={INPUT_TYPE.TEXT}
        />
      </div>
      <div css={styles.input}>
        <Input
          error={{
            hasError,
            errorMessage: ui('tracking.orderTrackingError'),
          }}
          value={shippingZip}
          onChange={handleShippingZipChange}
          label={ui('common.form.shippingZip')}
          type={INPUT_TYPE.TEXT}
        />
      </div>
      <div css={styles.submitButtonWrapper}>
        <Button
          css={styles.submitButton}
          isDisabled={!isFormValid}
          onClick={handleSubmitBtnClick}
          type="submit"
        >
          {ui('tracking.orderTrackingSubmit')}
        </Button>
      </div>
    </form>
  );
}

export default OrderTrackingForm;

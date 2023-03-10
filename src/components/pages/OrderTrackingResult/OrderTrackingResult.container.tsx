import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { hex2a } from '~/lib/utils/string';

import OrderLoading from './OrderLoading/OrderLoading';
import OrderTrackingResult from './OrderTrackingResult';
import { useOrderTrackingContext } from './OrderTrackingResult.context';

function OrderTrackingResultContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

  const router = useRouter();

  let orderId = router.query.orderId ?? router.query.track_order;
  let zip = router.query.zip ?? router.query.track_shipping_zip;
  const isComingFromMyOrders = router.query.fromMyOrder;

  if (orderId && zip && zip.length > 5) {
    orderId = hex2a(orderId.toString());
    zip = hex2a(zip.toString());
  }

  const {
    getOrderTracking,
    hasError,
    isLoadingOrder,
    order,
    isLoadingReturnReasons,
    returnTireData,
    sendEmailReciept,
    isSendingEmail,
    emailSent,
    isSendingReturnOrCancelReq,
    returnOrCancelReqSent,
    returnOrCancelReqError,
    getReturnReasons,
    sendReturnRequest,
    setPDFdownloaded,
    pdfDownloaded,
  } = useOrderTrackingContext();

  useEffect(() => {
    if (returnOrCancelReqSent) {
      window.location.reload();
    }
  }, [isSendingReturnOrCancelReq, returnOrCancelReqSent]);

  // Get the initial order information when the page loads
  useEffect(() => {
    if (!order && !isLoadingOrder && !hasError) {
      getOrderTracking({ orderId, zip } as OrderTrackingInput);
    }
  }, [order, isLoadingOrder, hasError, orderId, zip, getOrderTracking]);

  // If there's an error (no order), redirect to the order tracking form page.
  useEffect(() => {
    hasError && router.push(ROUTE_MAP[ROUTES.ORDER_TRACKING]);
  }, [hasError, router]);

  useEffect(() => {
    if (!isLoadingReturnReasons && returnTireData) {
      router.push({
        pathname: ROUTE_MAP[ROUTES.ORDER_RETURN],
        query: { orderId, zip, id: returnTireData.productId },
      });
    }
  });

  if (isLoadingOrder || !order) {
    return <OrderLoading />;
  }

  return (
    <OrderTrackingResult
      {...order}
      isLoadingReturnReasons={isLoadingReturnReasons}
      getReturnReasons={getReturnReasons}
      sendReturnRequest={sendReturnRequest}
      isSendingReturnOrCancelReq={isSendingReturnOrCancelReq}
      returnOrCancelReqSent={returnOrCancelReqSent}
      sendEmailReciept={sendEmailReciept}
      orderId={String(orderId)}
      zip={String(zip)}
      isSendingEmail={isSendingEmail}
      emailSent={emailSent}
      returnOrCancelReqError={returnOrCancelReqError}
      isCustomerServiceEnabled={customerServiceEnabled}
      customerServiceNumber={customerServiceNumber}
      setPDFdownloaded={setPDFdownloaded}
      pdfDownloaded={pdfDownloaded}
      showBackButton={isComingFromMyOrders ? true : false}
    />
  );
}

export default OrderTrackingResultContainer;

import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { NAV_TARGETS } from '~/components/modules/Nav/Nav.types';
import { useNavContext } from '~/context/Nav.context';
import { LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import OrderTrackingForm from './OrderTrackingForm/OrderTrackingForm';
import styles from './OrderTrackingPage.styles';

function OrderTrackingPage() {
  const { setActiveLink, toggleSubNav } = useNavContext();
  const handleLoginClick = () => {
    toggleSubNav();
    setActiveLink(NAV_TARGETS.ACCOUNT);
  };

  return (
    <Grid css={styles.container}>
      <GridItem css={styles.header}>
        <h1 css={styles.title}>{ui('tracking.orderTrackingTitle')}</h1>
        <p css={styles.description}>
          {uiJSX('tracking.orderTrackingDescription', {
            login: (
              <Link
                as={LINK_TYPES.BUTTON}
                key="login"
                onClick={handleLoginClick}
                theme={THEME.LIGHT}
              >
                Login
              </Link>
            ),
          })}
        </p>
      </GridItem>
      <GridItem>
        <OrderTrackingForm />
      </GridItem>
      <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
    </Grid>
  );
}

export default OrderTrackingPage;

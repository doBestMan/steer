import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { ReactChild, useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { SPACING, StylesMap, THEME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import Toast from './Toast';

export default {
  component: Toast,
  title: 'Global/Toast',
};

const styles: StylesMap = {
  paddingBottom: {
    paddingBottom: SPACING.SIZE_20,
  },
  root: [typography.bodyCopy, { paddingTop: SPACING.SIZE_20 }],
};

function Container({ children }: { children: ReactChild[] }) {
  return (
    <Grid>
      <GridItem gridColumn="2/7" css={styles.root}>
        {children}
      </GridItem>
    </Grid>
  );
}

function toastDisclaimer() {
  return (
    <p css={styles.paddingBottom}>
      Auto dismiss is disabled just for testing purposes. <br />
      All toasts will auto dismiss.
    </p>
  );
}

// Auto dismiss off is just for testing purposes
// There should be no actual use cases with auto dismiss disabled
export function ToastNoAutoDismiss() {
  const [isVisible, setIsVisible] = useState(true);

  function handleDismiss() {
    setIsVisible(false);
  }

  return (
    <Container>
      {toastDisclaimer()}
      <Toast
        autoDismiss={false}
        isOpen={boolean('Visible', isVisible)}
        onDismiss={handleDismiss}
        handleClearMessage={action('clear message')}
      >
        {text('Toast Message', 'Your location has been updated!')}
      </Toast>
    </Container>
  );
}

export function ToastToggleable() {
  const [isVisible, setIsVisible] = useState(false);

  function handleToggleToast() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Container>
      <Link
        as="button"
        css={styles.paddingBottom}
        type="button"
        onClick={handleToggleToast}
        theme={THEME.LIGHT}
      >
        Toggle toast
      </Link>
      <Toast
        handleClearMessage={action('clear message')}
        isOpen={isVisible}
        onDismiss={handleToggleToast}
      >
        <p>
          Thanks for subscribing!
          <br />
          We look forward to being in touch.
        </p>
      </Toast>
    </Container>
  );
}

// Auto dismiss off is just for testing purposes
// There should be no actual use cases with auto dismiss disabled
export function ToastToggleableNoAutoDismiss() {
  const [isVisible, setIsVisible] = useState(false);

  function handleToggleToast() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Container>
      {toastDisclaimer()}
      <Link
        as="button"
        css={styles.paddingBottom}
        type="button"
        onClick={handleToggleToast}
        theme={THEME.LIGHT}
      >
        Toggle toast
      </Link>
      <Toast
        handleClearMessage={action('clear message')}
        isOpen={isVisible}
        autoDismiss={false}
        onDismiss={handleToggleToast}
      >
        <p>
          Thanks for subscribing!
          <br />
          We look forward to being in touch.
        </p>
      </Toast>
    </Container>
  );
}

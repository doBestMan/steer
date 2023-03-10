import React, { useEffect, useState } from 'react';

import Button from '~/components/global/Button/Button';
import {
  COLORS,
  RADIUS,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';

import Loading from './Loading';
import Skeleton from './Skeleton';

const styles: StylesMap = {
  buttonContainer: {
    transition: `all ${TIME.MS350}ms ease-in-out`,
  },
  buttonHidden: {
    opacity: 0,
    visibility: 'hidden',
  },
  container: {
    padding: SPACING.SIZE_20,
    position: 'relative',
    textAlign: 'center',
  },
  interactionContainer: {
    position: 'relative',
    textAlign: 'center',
  },
  loading: {
    left: 0,
    margin: '0 auto',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  orangeContainer: {
    background: COLORS.GLOBAL.ORANGE,
  },
};

export default {
  component: Loading,
  title: 'Global/Loading',
};

export function LoadingDots() {
  return (
    <>
      <div css={styles.container}>
        <Loading />
      </div>
      <div css={[styles.container, styles.orangeContainer]}>
        <Loading theme={THEME.DARK} />
      </div>
    </>
  );
}

export function LoadingHide() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div css={styles.interactionContainer}>
      {isLoading && <Loading customContainerStyles={styles.loading} />}

      <div css={[styles.buttonContainer, isLoading && styles.buttonHidden]}>
        <Button onClick={handleClick}>Click Me</Button>
      </div>
    </div>
  );
}

export function LoadingHideAndShow() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div css={styles.interactionContainer}>
      {isLoading && <Loading customContainerStyles={styles.loading} />}

      <div css={[styles.buttonContainer, isLoading && styles.buttonHidden]}>
        <Button onClick={handleClick}>Click Me</Button>
      </div>
    </div>
  );
}

export function SkeletonLoading() {
  return (
    <div
      css={{
        width: '100%',
        height: '100vh',
        padding: SPACING.SIZE_20,
        backgroundColor: COLORS.GLOBAL.BLACK,
      }}
    >
      <Skeleton theme={THEME.DARK} height="32px" radius={RADIUS.RADIUS_8} />
      <Skeleton
        theme={THEME.DARK}
        width="70%"
        height="24px"
        radius={RADIUS.RADIUS_8}
      />
      <Skeleton
        theme={THEME.DARK}
        width="150%"
        height="24px"
        radius={RADIUS.RADIUS_8}
      />
    </div>
  );
}

import { ReactNode } from 'react';

import Button from '~/components/global/Button/Button';
import { CSSStylesProp } from '~/lib/constants';

import styles from './ActionBar.styles';

export interface ActionBarProps {
  customContainerStyles?: CSSStylesProp;
  isDisabled?: boolean;
  onClickPrimary: () => void;
  onClickSecondary?: () => void;
  primaryLabel: string | ReactNode;
  secondaryLabel?: string;
}

function ActionBar({
  customContainerStyles,
  isDisabled = false,
  primaryLabel,
  onClickPrimary,
  secondaryLabel,
  onClickSecondary,
}: ActionBarProps) {
  return (
    <div css={[styles.root, customContainerStyles]}>
      {secondaryLabel && (
        <button
          data-testid="secondary-button"
          type="button"
          css={[styles.secondary, isDisabled && styles.disabled]}
          onClick={onClickSecondary}
        >
          {secondaryLabel}
        </button>
      )}
      <Button
        data-testid="primary-button"
        isDisabled={isDisabled}
        css={styles.primary}
        onClick={onClickPrimary}
      >
        {primaryLabel}
      </Button>
    </div>
  );
}

export default ActionBar;

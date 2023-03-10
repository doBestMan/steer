import { useRef } from 'react';
import ReactModal from 'react-modal';

import { useBreakpoints } from '~/hooks/useBreakpoints';
import {
  COLORS,
  MODAL_ANIMATION,
  MODAL_THEME,
  MODAL_TYPE,
  THEME,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { bindAppElement } from '~/lib/utils/modal';
import { ui } from '~/lib/utils/ui-dictionary';

import { ICONS } from '../Icon/Icon.constants';
import Link from '../Link/Link';
import styles, { animation } from './Modal.styles';
import { Props } from './Modal.types';

bindAppElement();

const SLIDER_MOVE_OFFSET = 20;

interface Position {
  x: number;
  y: number;
}

function Modal({
  children,
  contentLabel,
  hasCloseButton = true,
  hasDefaultPadding = true,
  useSliderToClose = false,
  isFullscreen = false,
  isHalfscreen,
  isOpen,
  onBack,
  onAfterClose,
  onAfterOpen,
  onClose,
  id,
  theme = MODAL_THEME.LIGHT,
  contentCss,
  customStyle,
}: Props) {
  const linkTheme = theme === MODAL_THEME.LIGHT ? THEME.LIGHT : THEME.DARK;
  const { lessThan, isMobile } = useBreakpoints();
  const fullscreen = lessThan.L || isFullscreen;
  const rootStyles = fullscreen ? MODAL_TYPE.FULLSCREEN : MODAL_TYPE.OVERLAY;
  const animationStyles = fullscreen
    ? animation[MODAL_ANIMATION.FADE]
    : animation[MODAL_ANIMATION.SLIDE_LEFT];

  const position = useRef<Position | null>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    position.current = {
      x: event.clientX,
      y: event.clientY,
    };
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (
      position?.current &&
      event.clientY - position.current.y >= SLIDER_MOVE_OFFSET
    ) {
      onClose();
    }
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <ReactModal
      id={id}
      contentLabel={contentLabel}
      isOpen={isOpen}
      onAfterClose={onAfterClose}
      onAfterOpen={onAfterOpen}
      onRequestClose={onClose}
      closeTimeoutMS={TIME.MS350}
      style={{
        overlay: {
          // react-modal library can't take serialized styles
          backgroundColor:
            (!fullscreen && COLORS.LIGHT.GRAY_70) || 'transparent', // removes overlay flash for fullscreen
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${TIME.MS350}ms ease-in-out ${TIME.MS100}ms`,
          zIndex: Z_INDEX.MODAL,
        },
        content: {
          overflow: 'auto',
          ...contentCss,
        },
      }}
      css={[
        styles[rootStyles],
        styles[theme],
        !fullscreen && isHalfscreen && styles.halfscreen,
        animationStyles.default,
        hasDefaultPadding && fullscreen && styles.fullScreenPadding,
        isOpen && animationStyles.open,
        customStyle,
      ]}
    >
      {(onBack || hasCloseButton) && (
        <div css={styles.actions} className="close-button">
          {onBack && (
            <Link
              as="button"
              aria-label={ui('modal.back')}
              onClick={onBack}
              icon={ICONS.CHEVRON_LEFT}
              theme={linkTheme}
            />
          )}
          {hasCloseButton && (
            <Link
              as="button"
              icon={ICONS.CLOSE}
              aria-label={ui('common.modal.close', { contentLabel })}
              onClick={onClose}
              theme={linkTheme}
              // this will allow modal content to start where padding begins rather than pushed down from actions bar
              css={!onBack && styles.close}
            />
          )}
        </div>
      )}
      {useSliderToClose && isMobile && (
        <div css={styles.closeSlider} onMouseDown={handleMouseDown} />
      )}
      {children}
    </ReactModal>
  );
}

export default Modal;

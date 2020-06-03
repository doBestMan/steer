import { ReactNode, useEffect, useRef, useState } from 'react';

import Button from '~/components/global/Button/Button';
import { useScroll } from '~/hooks/useScroll';
import { KEYCODES } from '~/lib/constants';

import styles from './Dropdown.styles';
import { PopupProps } from './FilterPopup';

interface Props extends PopupProps {
  children: ReactNode;
}

export default function FilterDropdown({
  children,
  isOpen,
  onClose,
  onSelectFilter,
}: Props) {
  const dropdownEl = useRef<HTMLDivElement | null>(null);
  // set left: buttonX and top: buttonTop, dropdown has to be fixed position to overcome list container height and overflow hidden.
  function getParentY() {
    const buttonElBounds = dropdownEl.current?.previousElementSibling?.getBoundingClientRect();
    if (!buttonElBounds) {
      return;
    }
    return buttonElBounds.top + buttonElBounds.height;
  }
  useScroll(() => setYPos(getParentY()));
  const y = getParentY();
  const [yPos, setYPos] = useState(y);
  const xPos = dropdownEl.current?.previousElementSibling?.getBoundingClientRect()
    .x;

  useEffect(() => {
    // click/mouse handlers to close dropdown, click outside + escape
    function onKeypress(e: KeyboardEvent) {
      if (e.keyCode === KEYCODES.ESCAPE) {
        onClose();
      }
    }
    function onClick(e: Event) {
      if (
        isOpen &&
        e.target instanceof HTMLElement &&
        !dropdownEl.current?.contains(e.target)
      ) {
        onClose();
      }
    }

    document.addEventListener('mouseup', onClick);
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('mouseup', onClick);
      document.removeEventListener('keydown', onKeypress);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    // update y position on open
    setYPos(getParentY());
  }, [isOpen]);

  return (
    <div
      ref={dropdownEl}
      aria-hidden={!isOpen}
      css={[styles.root, isOpen && styles.open]}
      style={{ left: xPos, top: yPos }}
    >
      {children}
      <Button onClick={onSelectFilter}>Toggle filter</Button>
    </div>
  );
}
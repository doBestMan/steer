import { MutableRefObject, useEffect, useRef } from 'react';

import { useWindowSize } from '~/hooks/useWindowSize';

import {
  handleKeyDown,
  handleMouseDown,
  initListeners,
  setNodeStyle,
} from './Range.utils';

interface SliderArgs {
  defaultValue: number;
  interval: number;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  onMouseUp?: () => void;
  railEl: MutableRefObject<HTMLDivElement | null>;
  refreshValues?: boolean;
  shouldReset?: boolean;
  sliderEl: MutableRefObject<HTMLDivElement | null>;
  value?: number;
}
function useRangeSliderManager({
  defaultValue = 0,
  max = 5,
  min = 0,
  shouldReset,
  sliderEl,
  value,
  refreshValues,
  ...rest
}: SliderArgs) {
  const minEl = useRef<Element | null>(null);
  const maxEl = useRef<Element | null>(null);
  const railMin = useRef(min);
  const railMax = useRef(max);
  const railWidth = useRef<number>(0);
  const valueNow = useRef<number>(value || defaultValue);
  const { width } = useWindowSize();
  // TODO: The 'handlerProps' object makes the dependencies of useEffect Hook (at line 68) change on every render.
  // To fix this, wrap the initialization of 'handlerProps' in its own useMemo() Hook.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlerProps = {
    ...rest,
    maxEl,
    minEl,
    railMax,
    railMin,
    railWidth,
    sliderEl,
    valueNow,
  };
  useEffect(() => {
    if (!shouldReset) {
      return;
    }
    valueNow.current = defaultValue;
    setNodeStyle(handlerProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldReset]);

  useEffect(() => {
    if (rest.railEl.current) {
      // updates rail width if window is resized
      railWidth.current = rest.railEl.current.clientWidth;
    }
    setNodeStyle(handlerProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerProps, rest.railEl, width]);

  useEffect(() => {
    initListeners(handlerProps);

    () => {
      if (!sliderEl.current) {
        return;
      }
      sliderEl.current.removeEventListener(
        'keydown',
        handleKeyDown.bind(null, handlerProps),
      );
      sliderEl.current.removeEventListener(
        'mousedown',
        handleMouseDown.bind(null, handlerProps),
      );
      sliderEl.current.removeEventListener(
        'touchstart',
        handleMouseDown.bind(null, handlerProps),
      );
    };

    // originally was going to execute onChange on mouse up, but we would still have to
    // set the style for the fill width and margin as the sliders move. for now it is being
    // triggered on mouse move, updating the values will cause use effect to run too often
    // possible TODO: update fill styles via DOM manipulation rather than repaint
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderEl]);

  // if the value failed to save set it to initial value
  useEffect(() => {
    if (value === undefined || !refreshValues || valueNow.current === value) {
      return;
    }
    valueNow.current = value;
    setNodeStyle(handlerProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshValues]);

  return {
    maxCurrent: railMax.current,
    minCurrent: railMin.current,
    value: valueNow.current,
  };
}

export default useRangeSliderManager;

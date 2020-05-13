import { renderHook } from '@testing-library/react-hooks';

import { useBreakpoints } from '~/hooks/useBreakpoints';

import { BREAKPOINT_SIZES } from './breakpoints';

describe('useBreakpoints', () => {
  it('sets correct properties for small breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 400 });
    Object.defineProperty(window, 'innerHeight', { value: 600 });
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.bk).toEqual(BREAKPOINT_SIZES.S);
    expect(result.current.isMobile).toEqual(true);
    /* eslint sort-keys: 0 */
    expect(result.current.is).toStrictEqual({
      S: true,
      M: false,
      L: false,
      XL: false,
    });
    expect(result.current.lessThan).toStrictEqual({
      M: true,
      L: true,
      XL: true,
    });
  });

  it('sets correct properties for medium breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600 });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.bk).toEqual(BREAKPOINT_SIZES.M);
    expect(result.current.isMobile).toEqual(false);
    /* eslint sort-keys: 0 */
    expect(result.current.is).toStrictEqual({
      S: false,
      M: true,
      L: false,
      XL: false,
    });
    expect(result.current.lessThan).toStrictEqual({
      M: false,
      L: true,
      XL: true,
    });
  });

  it('sets correct properties for large breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1000 });
    Object.defineProperty(window, 'innerHeight', { value: 800 });
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.bk).toEqual(BREAKPOINT_SIZES.L);
    expect(result.current.isMobile).toEqual(false);
    /* eslint sort-keys: 0 */
    expect(result.current.is).toStrictEqual({
      S: false,
      M: false,
      L: true,
      XL: false,
    });
    expect(result.current.lessThan).toStrictEqual({
      M: false,
      L: false,
      XL: true,
    });
  });

  it('sets correct properties for extra large breakpoint', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1400 });
    Object.defineProperty(window, 'innerHeight', { value: 1600 });
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current.bk).toEqual(BREAKPOINT_SIZES.XL);
    expect(result.current.isMobile).toEqual(false);
    /* eslint sort-keys: 0 */
    expect(result.current.is).toStrictEqual({
      S: false,
      M: false,
      L: false,
      XL: true,
    });
    expect(result.current.lessThan).toStrictEqual({
      M: false,
      L: false,
      XL: false,
    });
  });
});
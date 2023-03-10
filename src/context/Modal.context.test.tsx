import { renderHook } from '@testing-library/react-hooks';
import preloadAll from 'jest-next-dynamic';
import { act } from 'react-test-renderer';

import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';
import { MODAL_DATA_TYPES } from '~/lib/constants';
import STATIC_MODALS, { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';

import { useModalContextSetup } from './Modal.context';

describe('useModalContextSetup', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  test('initial state', () => {
    const { result } = renderHook(() => useModalContextSetup());

    expect(result.current).toEqual(
      expect.objectContaining({
        currentModalData: null,
        isModalOpen: false,
      }),
    );
  });

  test('dynamic modal flow', () => {
    /* eslint-disable sort-keys */
    const testModal = {
      title: 'Risk-Free Guarantee',
      subtitle: 'Only from SimpleTire',
      content: 'Our goal is your complete satisfaction!',
      image: {
        src: 'https://dummyimage.com/1600x900/000/f00.jpg',
        width: 1600,
        height: 900,
        altText: 'Risk-Free Guarantee',
        type: SiteImageNullableTypeEnum.SiteImage,
      },
      link: {
        label: 'Learn more',
        link: {
          href: '/about-us',
          isExternal: false,
        },
      },
      showSupportSection: true,
      type: 'SiteDynamicModal',
    };
    /* eslint-enable sort-keys */

    const { result } = renderHook(() => useModalContextSetup());

    act(() => {
      result.current.openDynamicModal(testModal);
    });

    // it opens modal with dynamic content
    expect(result.current).toEqual(
      expect.objectContaining({
        currentModalData: {
          props: testModal,
          type: MODAL_DATA_TYPES.CONTENT,
        },
        isModalOpen: true,
      }),
    );

    act(() => {
      result.current.closeModal();
    });

    // it closes modal but keeps content stored
    expect(result.current).toEqual(
      expect.objectContaining({
        currentModalData: {
          props: testModal,
          type: MODAL_DATA_TYPES.CONTENT,
        },
        isModalOpen: false,
      }),
    );

    act(() => {
      result.current.resetModal();
    });

    // it resets modal contnet
    expect(result.current).toEqual(
      expect.objectContaining({
        currentModalData: null,
        isModalOpen: false,
      }),
    );
  });

  it('opens static modal', () => {
    const { result } = renderHook(() => useModalContextSetup());

    act(() => {
      result.current.openStaticModal(STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING);
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        currentModalData: STATIC_MODALS[STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING],
        isModalOpen: true,
      }),
    );
  });
});

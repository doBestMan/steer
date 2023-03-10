import { render } from '@testing-library/react';

import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { ICONS } from '../Icon/Icon.constants';
import IconOrImage from './IconOrImage';

describe('IconOrImage', () => {
  test('icon', () => {
    const { container } = render(
      <IconOrImage svgId={ICONS.ARROW_RIGHT} type={ICON_IMAGE_TYPE.ICON} />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <span
        class="css-70qvj9"
      >
        <svg
          height="12"
          viewBox="0 0 14 12"
          width="14"
        >
          <use
            xlink:href="#steer--arrow-right"
          />
        </svg>
      </span>
    `);
  });

  test('image', () => {
    const { container } = render(
      <IconOrImage
        src="https://via.placeholder.com/150"
        altText="150x150 image"
        type={ICON_IMAGE_TYPE.IMAGE}
      />,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div
        class="Image"
      >
        <img
          alt="150x150 image"
          class="ImageTag"
          height="200"
          loading="lazy"
          src="https://via.placeholder.com/150"
          srcset="https://via.placeholder.com/150 "
          width="200"
        />
      </div>
    `);
  });
});

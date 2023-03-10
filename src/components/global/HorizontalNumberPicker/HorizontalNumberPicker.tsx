import { MouseEvent, useCallback, useEffect, useState } from 'react';

import Carousel from '~/components/global/Carousel/Carousel';
import { CSSStylesProp } from '~/lib/constants';

import styles from './HorizontalNumberPicker.styles';

interface Props {
  customCarouselStyles?: CSSStylesProp;
  customContainerStyles?: CSSStylesProp;
  initialIndex?: number;
  numbers: number[];
  onSelect?: (value: number, index: number) => void;
  subTitle?: string | JSX.Element;
  title: string;
}

function HorizontalNumberPicker({
  customCarouselStyles,
  customContainerStyles,
  numbers,
  initialIndex,
  onSelect,
  subTitle,
  title,
  ...rest
}: Props) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(
    initialIndex === undefined ? -1 : initialIndex,
  );

  useEffect(() => {
    if (initialIndex === undefined) {
      return;
    }

    setSelectedItemIndex(initialIndex === undefined ? -1 : initialIndex);
  }, [numbers, initialIndex]);

  useEffect(() => {
    if (onSelect) {
      onSelect(numbers[selectedItemIndex], selectedItemIndex);
    }
  }, [numbers, onSelect, selectedItemIndex]);

  // Use dataset to retrieve index instead of trusting index from loop (and being able to use useCallback)
  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const buttonEl = e.currentTarget;
    if (buttonEl === null) {
      return;
    }
    const index = parseInt(buttonEl.dataset.index || '0', 10);
    setSelectedItemIndex(index);
  }, []);

  return (
    <div css={customContainerStyles} {...rest}>
      <div css={styles.header}>
        <h3 css={styles.title}>{title}</h3>

        {subTitle && <span css={styles.subTitle}>{subTitle}</span>}
      </div>

      <div css={customCarouselStyles}>
        <Carousel activeSlide={selectedItemIndex} centerActiveSlide>
          {numbers.map((value, index) => (
            <button
              css={styles.numberItem}
              onClick={handleClick}
              data-index={index}
              key={index}
            >
              <span
                css={[
                  styles.innerItem,
                  selectedItemIndex === index && styles.selectedItem,
                ]}
              >
                {value}
              </span>
            </button>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default HorizontalNumberPicker;

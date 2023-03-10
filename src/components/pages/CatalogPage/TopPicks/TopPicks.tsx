import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SwiperInstance } from 'react-id-swiper';

import Carousel from '~/components/global/Carousel/Carousel';
import Icon from '~/components/global/Icon/Icon';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { TIME } from '~/lib/constants';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';
import { resetTranslateInstance, setTranslate } from '~/lib/helpers/translate';
import { ui } from '~/lib/utils/ui-dictionary';
import { typography } from '~/styles/typography.styles';

import Frame from './Frame/Frame';
import { CAROUSEL_PARAMS } from './TopPicks.constants';
import { styles } from './TopPicks.styles';
import TopPicksItem from './TopPicksItem/TopPicksItem';
import { TopPickItemsHeader } from './TopPicksItem/TopPicksItems.types';

const OEModal = dynamic(() => import('./OEModal/OEModal'));

interface Props {
  customerServiceNumber: { display: string; value: string };
  exploreMore: () => void;
  location?: string;
  openSearch: () => void;
  picks: Array<SiteCatalogSummaryTopPickItem>;
  showLoadingInterstitial: boolean;
  totalResult: number;
  viewMoreData: SiteCatalogSummaryTopPicksMore | null;
}

function TopPicks({
  customerServiceNumber,
  exploreMore,
  openSearch,
  picks,
  showLoadingInterstitial,
  totalResult,
  location,
  viewMoreData,
}: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [, setRootHeight] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [indexHovered, setIndexHovered] = useState<number | undefined>(
    undefined,
  );
  const rootRef = useRef<HTMLDivElement | null>(null);

  /**
   * If coming from Search, set programmatic focus to the TP title
   */
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (showLoadingInterstitial && titleRef && titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef, showLoadingInterstitial]);

  const slideTo = useCallback(
    (index: number) => {
      if (swiper) {
        swiper.slideTo(index);
      }
    },
    [swiper],
  );

  // Swiper events
  useEffect(() => {
    if (!swiper) {
      return;
    }

    resetTranslateInstance();

    swiper.on('slideChangeTransitionEnd', () => {
      setCurrentIndex(swiper.activeIndex);
    });

    swiper.on('setTranslate', (translate: number) => {
      setTranslate({ x: translate });
    });

    swiper.on('sliderMove', () => {
      setIndexHovered(undefined);
    });

    swiper.on('touchEnd', () => {});

    return () => {
      resetTranslateInstance();
      swiper.off('slideChange');
      swiper.off('setTranslate');
      swiper.off('sliderMove');
      swiper.off('touchEnd');
    };
  }, [swiper]);

  // Show after a little delay
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), TIME.MS600);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Get topPicks offsetTop on resize
  useEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    const resize = () => {
      if (!rootRef || !rootRef.current) {
        return;
      }
      setRootHeight(rootRef.current.clientHeight);
    };
    resize();

    window.addEventListener('resize', resize, false);

    return () => {
      window.removeEventListener('resize', resize, false);
    };
  }, [rootRef]);

  const onItemMouseEnter = useCallback(
    (index: number) => {
      setIndexHovered(index);
    },
    [setIndexHovered],
  );

  const onItemMouseLeave = useCallback(() => {
    setIndexHovered(undefined);
  }, [setIndexHovered]);

  const openModal = useCallback(() => {
    setModalOpened(true);
  }, [setModalOpened]);

  const closeModal = useCallback(() => {
    setModalOpened(false);
  }, [setModalOpened]);

  const currentOeModal = picks[currentIndex]
    ? picks[currentIndex].siteCatalogSummaryTopPickItemAdditionalInfo
    : null;

  const showMoreData = currentIndex === picks.length;

  const carouselItems = picks.map((pick, i) => {
    const {
      product,
      ctaLabel,
      header,
      fallbackImage,
      siteCatalogSummaryTopPickItemAdditionalInfo,
    } = pick;
    const addVehicleInfo = product === null;

    let asset = null,
      brand = null,
      deliveryInfo = null,
      productFeature = null,
      productName = null,
      rating = null,
      url = null,
      priceList = null;

    if (product) {
      asset =
        product.imageList.filter(
          (img) => img.productImageType === PRODUCT_IMAGE_TYPES.SIDEWALL,
        )[0]?.image || product.imageList[0].image;

      brand = product.brand;
      deliveryInfo = product.deliveryInfo;
      priceList = product.priceList;
      productFeature = product.topPicksAttribute;
      productName = product.name;
      rating = product.rating;
      url = product.link.href;
    } else if (fallbackImage) {
      asset = fallbackImage;
    }

    const promotionInfo = pick.product?.siteCatalogPromotionInfo?.list[0];

    const key = `${header.titleLine1}-${product?.name}`;

    return (
      <div css={styles.pick} key={key}>
        <TopPicksItem
          pick={pick}
          currentIndex={i}
          addVehicleInfo={addVehicleInfo}
          brand={brand}
          ctaLabel={ctaLabel}
          customerServiceNumber={customerServiceNumber}
          header={header as TopPickItemsHeader}
          asset={asset}
          deliveryInfo={deliveryInfo}
          index={i}
          activeIndex={currentIndex}
          isCurrent={i === currentIndex}
          location={location}
          oeModal={siteCatalogSummaryTopPickItemAdditionalInfo}
          priceList={priceList}
          productFeature={productFeature}
          productName={productName}
          rating={rating}
          totalResult={totalResult}
          url={url}
          show={show}
          indexHovered={indexHovered}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          openSearch={openSearch}
          slideTo={slideTo}
          openModal={openModal}
          promotionInfo={promotionInfo}
        />
      </div>
    );
  });

  if (viewMoreData) {
    carouselItems.push(
      <div css={styles.pick} key="view-more-pick">
        <TopPicksItem
          activeIndex={currentIndex}
          currentIndex={picks.length}
          customerServiceNumber={customerServiceNumber}
          viewMoreData={viewMoreData}
          totalResult={totalResult}
          exploreMore={exploreMore}
          index={picks.length}
          isCurrent={showMoreData}
          show={show}
          indexHovered={indexHovered}
          onItemMouseEnter={onItemMouseEnter}
          onItemMouseLeave={onItemMouseLeave}
          slideTo={slideTo}
        />
      </div>,
    );
  }

  return (
    <div ref={rootRef} css={styles.root}>
      <Frame
        currentIndex={currentIndex}
        slideTo={slideTo}
        length={picks.length}
      />
      <div css={styles.carousel} id="top-picks-carousel">
        <Carousel params={CAROUSEL_PARAMS} getSwiper={setSwiper}>
          {carouselItems}
        </Carousel>
      </div>
      <button
        type="button"
        css={styles.exploreButton}
        onClick={exploreMore}
        data-testid="catalog-explore-button"
      >
        <span css={typography.primarySubhead}>
          {ui('catalog.topPicks.exploreMoreCTALabel')}
        </span>
        <Icon name="arrow-down" css={styles.exploreButtonIcon} />
      </button>
      {currentOeModal && (
        <OEModal
          isOpen={modalOpened}
          onClose={closeModal}
          content={currentOeModal}
        />
      )}
    </div>
  );
}

export default TopPicks;

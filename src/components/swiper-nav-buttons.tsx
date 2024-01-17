import { useSwiper } from 'swiper/react';

function SwiperNavButtons(): JSX.Element {
  const swiper = useSwiper();
  return (
    <div className="swiper-naw-btns">
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export { SwiperNavButtons };

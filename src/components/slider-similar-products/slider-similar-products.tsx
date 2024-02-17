import { SwiperSlide, Swiper } from 'swiper/react';
import { TypeProduct } from '../../type-data/type';
import { Navigation } from 'swiper/modules';
import { ProductCardInCatalog } from '../product-card/product-card-in-catalog';

import 'swiper/css';
import 'swiper/css/navigation';
import './slider-similar.css';

type Props = {
  similarProducts: TypeProduct[];
  handleActiveModalItem?: () => void;
};

function SliderSimilarProducts({
  similarProducts,
  handleActiveModalItem,
}: Props): JSX.Element {
  return (
    <section
      className="product-similar"
      data-testid="componentSliderSimilarProducts"
    >
      {similarProducts && (
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            <Swiper
              navigation={{
                enabled: true,
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
              modules={[Navigation]}
              watchSlidesProgress
              slidesPerView={3}
              spaceBetween={16}
              slidesPerGroup={3}
              allowTouchMove={false}
              style={{ display: 'flex' }}
              className="product-similar__slider-list"
            >
              {similarProducts.map((slide) => (
                <SwiperSlide key={slide.id} style={{ display: 'flex' }}>
                  <ProductCardInCatalog
                    product={slide}
                    handleActiveModalItem={handleActiveModalItem}
                    fromSlider
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-naw-btns">
              <button
                className="slider-controls slider-controls--prev"
                type="button"
                aria-label="Предыдущий слайд"
              >
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
              <button
                className="slider-controls slider-controls--next"
                type="button"
                aria-label="Следующий слайд"
              >
                <svg width="7" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-arrow"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { SliderSimilarProducts };

import { SwiperSlide, Swiper } from 'swiper/react';
import { TypeProduct } from '../type-data/type';
import 'swiper/css';
// import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ProductCardInCatalog } from './product-card/product-card-in-catalog';

type Props = {
  similarProducts: TypeProduct[];
  handleActiveModalItem: () => void;
};

function SliderSimilarProducts({
  similarProducts,
  handleActiveModalItem,
}: Props): JSX.Element {
  return (
    <section className="product-similar">
      {similarProducts && (
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            <Swiper
              className="mySwiper"
              slidesPerView={3}
              navigation={{
                enabled: true,
                nextEl: '.slider-controls--next',
                prevEl: '.slider-controls--prev',
                disabledClass: 'swiper-button-disabled',
              }}
              slidesPerGroup={3}
              speed={300}
              modules={[Navigation]}
            >
              <div className="product-similar__slider-list">
                {similarProducts.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <ProductCardInCatalog
                      product={slide}
                      handleActiveModalItem={handleActiveModalItem}
                      fromSlider
                    />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
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
      )}
    </section>
  );
}

export { SliderSimilarProducts };

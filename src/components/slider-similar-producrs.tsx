import { SwiperSlide, Swiper } from 'swiper/react';
import { TypeProduct } from '../type-data/type';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { ProductCardInCatalog } from './product-card/product-card-in-catalog';
import { useRef } from 'react';

type Props = {
  similarProducts: TypeProduct[];
  handleActiveModalItem: () => void;
};

function SliderSimilarProducts({
  similarProducts,
  handleActiveModalItem,
}: Props): JSX.Element {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="product-similar">
      {similarProducts && (
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              <Swiper
                className="productCardInCatalog"
                slidesPerView={3}
                spaceBetween={16}
                slidesPerGroup={3}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                modules={[Navigation]}
                style={{ display: 'flex' }}
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
                  className="slider-controls--prev"
                  type="button"
                  aria-label="Предыдущий слайд"
                  ref={prevRef}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    color: '#7575e2',
                    backgroundColor: '#f4f4fc',
                    border: 'none',
                    borderRadius: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <svg width="7" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-arrow"></use>
                  </svg>
                </button>
                <button
                  className="slider-controls--next"
                  type="button"
                  aria-label="Следующий слайд"
                  ref={nextRef}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    padding: '0',
                    color: '#7575e2',
                    backgroundColor: '#f4f4fc',
                    border: 'none',
                    borderRadius: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <svg width="7" height="12" aria-hidden="true">
                    <use xlinkHref="#icon-arrow"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { SliderSimilarProducts };

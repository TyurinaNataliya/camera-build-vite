import { SwiperSlide, Swiper } from 'swiper/react';
import { TypeProduct } from '../type-data/type';
import 'swiper/css';
// import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ProductCardInCatalog } from './product-card/product-card-in-catalog';
import { SwiperNavButtons } from './swiper-nav-buttons';

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
            <div className="product-similar__slider-list">
              <Swiper
                className="mySwiper"
                slidesPerView={3}
                spaceBetween={16}
                navigation={{
                  enabled: true,
                  nextEl: '.slider-controls--next',
                  prevEl: '.slider-controls--prev',
                }}
                slidesPerGroup={3}
                modules={[Navigation]}
              >
                {similarProducts.map((slide) => (
                  <SwiperSlide key={slide.id}>
                    <ProductCardInCatalog
                      product={slide}
                      handleActiveModalItem={handleActiveModalItem}
                      fromSlider
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <SwiperNavButtons />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export { SliderSimilarProducts };

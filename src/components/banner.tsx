import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { TypePromoProduct } from '../type-data/type';

type Props = {
  promoProducts: TypePromoProduct[];
};

function Banner({ promoProducts }: Props): JSX.Element {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3000 }}
      className="mySwiper"
      data-testid="banner"
    >
      {promoProducts.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="banner">
            <picture>
              <source
                type="image/webp"
                srcSet={`${slide.previewImgWebp}, ${slide.previewImgWebp2x} 2x`}
              />
              <img
                src={`${slide.previewImg}`}
                srcSet={`${slide.previewImg2x} 2x`}
                width="1280"
                height="300"
                alt={slide.name}
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">{slide.name}</span>
              <span className="banner__text">
                Профессиональная камера от&nbsp;известного производителя
              </span>
              <Link className="btn" to={`${AppRoute.Product}/${slide.id}`}>
                Подробнее
              </Link>
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export { Banner };

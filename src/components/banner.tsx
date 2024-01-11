import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//добавить к ссылке /${id}
function Banner(): JSX.Element {
  const result = [
    {
      id: 7,
      name: 'Look 54',
      previewImg: 'img/content/promo-look-54.jpg',
      previewImg2x: 'img/content/promo-look-54@2x.jpg',
      previewImgWebp: 'img/content/promo-look-54.webp',
      previewImgWebp2x: 'img/content/promo-look-54@2x.webp',
    },
    {
      id: 35,
      name: 'Click Pro',
      previewImg: 'img/content/promo_click_pro.jpg',
      previewImg2x: 'img/content/promo_click_pro@2x.jpg',
      previewImgWebp: 'img/content/promo_click_pro.webp',
      previewImgWebp2x: 'img/content/promo_click_pro@2x.webp',
    },
    {
      id: 36,
      name: 'Click Lite R',
      previewImg: 'img/content/promo_click-lite-r.jpg',
      previewImg2x: 'img/content/promo_click-lite-r@2x.jpg',
      previewImgWebp: 'img/content/promo_click-lite-r.webp',
      previewImgWebp2x: 'img/content/promo_click-lite-r@2x.webp',
    },
  ];
  return (
    <div className="banner">
      <Swiper
        pagination
        navigation
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000 }}
        className="mySwiper"
      >
        {result.map((slide) => (
          <SwiperSlide key={slide.id}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${slide.previewImgWebp}, ${slide.previewImgWebp2x} 2x`}
              />
              <img
                src={`${slide.previewImg}`}
                srcSet={`${slide.previewImg2x} 2x`}
                width="1280"
                height="280"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export { Banner };

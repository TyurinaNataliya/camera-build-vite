import { Link } from 'react-router-dom';
import { TypeProduct } from '../../type-data/type';
import { AppRoute } from '../../const';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { useAppDispatch } from '../../hooks/store';

type Props = {
  product: TypeProduct;
  handleActiveModalItem: () => void;
  fromSlider?: boolean;
};

function ProductCardInCatalog({
  product,
  handleActiveModalItem,
  fromSlider,
}: Props): JSX.Element {
  const {
    id,
    rating,
    reviewCount,
    price,
    previewImg,
    previewImg2x,
    name,
    previewImgWebp,
    previewImgWebp2x,
  } = product;

  const dispatch = useAppDispatch();
  return (
    <div className={fromSlider ? 'product-card is-active' : 'product-card'}>
      <div className="product-card__img">
        {fromSlider ? (
          <picture>
            <source
              type="image/webp"
              srcSet={`/${previewImgWebp}, ${previewImgWebp2x} 2x`}
            />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x} 2x`}
              width="280"
              height="240"
              alt={name}
            />
          </picture>
        ) : (
          <picture>
            <source
              type="image/webp"
              srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
            />
            <img
              src={previewImg}
              srcSet={`${previewImg2x} 2x`}
              width="280"
              height="240"
              alt={name}
            />
          </picture>
        )}
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {`${price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => {
            dispatch(fetchProductAction(Number(id)));
            handleActiveModalItem();
          }}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export { ProductCardInCatalog };

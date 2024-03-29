import { Link } from 'react-router-dom';
import { TypeProduct } from '../../type-data/type';
import { AppRoute } from '../../const';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { numberWithSpaces } from '../../utils/utils';


type Props = {
  product: TypeProduct;
  handleActiveModalItem?: () => void;
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
    name,
  } = product;

  const stateBasketProduct = useAppSelector((state) => state.postBasketProduct.productsInBasket);


  const dispatch = useAppDispatch();
  return (
    <div
      data-testid="product-card-in-catalog"
      className={fromSlider ? 'product-card is-active' : 'product-card'}
      style={fromSlider ? { width: '100%' } : undefined}
    >
      <div className="product-card__img">
        {fromSlider ? (
          <picture>
            <source
              type="image/webp"
            />
            <img
              src={`/${previewImg}`}
              width="280"
              height="240"
              alt={name}
            />
          </picture>
        ) : (
          <picture>
            <source
              type="image/webp"
            />
            <img
              src={`/${previewImg}`}
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
            <use xlinkHref={rating >= 1 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 2 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 3 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 4 ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref={rating >= 5 ? '#icon-full-star' : '#icon-star'}></use>
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
          {price < 1000 ? `${price} ₽` : numberWithSpaces(price)}
        </p>
      </div>
      {stateBasketProduct.find((element) => element.id === id)?.id === id
        ?
        <div className="product-card__buttons">
          <Link className="btn btn--purple-border" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
            Подробнее
          </Link>
        </div>
        :
        <div className="product-card__buttons">
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={() => {
              dispatch(fetchProductAction(Number(id)));
              handleActiveModalItem?.();
            }}
          >
            Купить
          </button>
          <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>
            Подробнее
          </Link>

        </div>}


    </div>
  );
}

export { ProductCardInCatalog };

import { useAppDispatch } from '../../hooks/store';
import { postBacketProductSlice } from '../../store/slices/post-backet-product-slice';
import { TypeProduct } from '../../type-data/type';
type Props = {
  product: TypeProduct & { cnt?: number };
};

function ProductCardInBasket({ product }: Props): JSX.Element {
  const {
    previewImgWebp,
    previewImgWebp2x,
    name,
    previewImg,
    previewImg2x,
    vendorCode,
    category,
    level,
    price,
    cnt
  } = product;

  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  const dispatch = useAppDispatch();

  return (
    <li className="basket-item" data-testid="product-card-in-basket">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${previewImg2x} 2x`}
            width="140"
            height="120"
            alt={name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>
            <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category}</li>
          <li className="basket-item__list-item">{level}</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {`${numberWithSpaces(price)} ₽`}
      </p>
      <div className="quantity">
        <button
          onClick={() => {
            dispatch(postBacketProductSlice.actions.decProduct(product));
          }}
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          disabled={(cnt || 0) <= 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={cnt}
          min="1"
          max="99"
          aria-label="количество товара"
        />
        <button
          onClick={() => {
            dispatch(postBacketProductSlice.actions.incProduct(product));
          }}
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          disabled={(cnt || 0) >= 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{`${numberWithSpaces(price * (cnt || 1))} ₽`}
      </div>
      <button className="cross-btn" type="button" aria-label="Удалить товар"
        onClick={() => {
          dispatch(postBacketProductSlice.actions.removeProduct(product));
        }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}

export { ProductCardInBasket };

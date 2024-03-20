import { useState } from 'react';
import { useAppDispatch } from '../../hooks/store';
import { postBasketProductSlice } from '../../store/slices/post-basket-product-slice';
import { ProductInBasket } from '../../type-data/type';
import { ModalBasketRemoveItem } from '../modals-components/modal-basket-remove-item/modal-basket-remove-item';
import { numberWithSpaces } from '../../utils/utils';

type Props = {
  product: ProductInBasket;
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


  const dispatch = useAppDispatch();
  const [modalBasketactive, setModalBasketactive] = useState<boolean>(false);

  function showModal() {
    setModalBasketactive(true);
  }
  function hideModal() {
    setModalBasketactive(false);
  }


  return (
    <>
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
              dispatch(postBasketProductSlice.actions.decProduct(product));
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
            onChange={(event) => {
              if (Math.ceil(Number(event.target.value)) > 0 && Math.ceil(Number(event.target.value)) < 100) {
                dispatch(postBasketProductSlice.actions.setCountProduct({ ...product, cnt: Math.ceil(Number(event.target.value)) }));
              }
            }}
            min="1"
            max="99" aria-label="количество товара"
          />
          <button
            onClick={() => {
              dispatch(postBasketProductSlice.actions.incProduct(product));
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
            showModal();
          }}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>
      {modalBasketactive === true && (<ModalBasketRemoveItem hideModal={hideModal} product={product} />)}
    </>
  );
}

export { ProductCardInBasket };

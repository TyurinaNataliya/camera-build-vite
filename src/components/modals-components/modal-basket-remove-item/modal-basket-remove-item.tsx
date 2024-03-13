import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/store';
import { postBasketProductSlice } from '../../../store/slices/post-basket-product-slice';
import { TypeProduct } from '../../../type-data/type';
import { AppRoute } from '../../../const';
import { useEffect, useRef } from 'react';

type Props = {
  hideModal: () => void;
  product: TypeProduct;
}

function ModalBasketRemoveItem({ hideModal, product }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        hideModal?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [hideModal]);

  const { previewImgWebp, previewImgWebp2x, previewImg, previewImg2x, name, vendorCode, level, category, type } = product;
  return (
    <div className="modal is-active"
      onMouseDown={(event) => {
        if (modalRef.current && event.target === modalRef.current) {
          hideModal?.();
        }
      }}
      tabIndex={0}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={modalRef}>
        </div>
        <div className="modal__content">
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, ${previewImgWebp2x} 2x`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
                  width="140" height="120" alt={`Фотоаппарат «${name}»`}
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
                <li className="basket-item__list-item">{category} {type}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              onClick={() => {
                dispatch(postBasketProductSlice.actions.removeProduct(product));
                hideModal();
              }}

              className="btn btn--purple modal__btn modal__btn--half-width" type="button"
            >Удалить
            </button>
            <Link className="btn btn--transparent modal__btn modal__btn--half-width" to={AppRoute.Catalog}>Продолжить покупки
            </Link>
          </div>
          <button
            onClick={() => {
              hideModal();
            }}
            className="cross-btn" type="button" aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export { ModalBasketRemoveItem };

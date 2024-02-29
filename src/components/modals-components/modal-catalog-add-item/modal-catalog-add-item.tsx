import { useEffect, useRef } from 'react';
import { TypeProduct } from '../../../type-data/type';

type Props = {
  product: TypeProduct;
  handleCloseModalItem?: () => void;
  handleActiveModalSuccess?: () => void;
};

function ModalCatalogAddItem({
  product,
  handleCloseModalItem,
  handleActiveModalSuccess,
}: Props): JSX.Element {
  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    vendorCode,
    type,
    level,
    price,
  } = product;
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalItem?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleCloseModalItem]);
  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }


  return (
    <div
      className="modal is-active"
      onMouseDown={(event) => {
        if (modalRef.current && event.target === modalRef.current) {
          handleCloseModalItem?.();
        }
      }}
      tabIndex={0}
    >
      <div className="modal__wrapper" data-testid="modal-catalog-add-item">
        <div className="modal__overlay" ref={modalRef}></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/${previewImgWebp}, ${previewImgWebp2x} 2x"`}
                />
                <img
                  src={`/${previewImg}`}
                  srcSet={`/${previewImg2x} 2x`}
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
                  <span className="basket-item__article">Артикул:</span>{' '}
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type}</li>
                <li className="basket-item__list-item">{level}</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {price < 1000 ? `${price} ₽` : numberWithSpaces(price)}
              </p>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => {
                handleActiveModalSuccess?.();
                handleCloseModalItem?.();
              }}
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>
              Добавить в корзину
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModalItem}
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
export { ModalCatalogAddItem };

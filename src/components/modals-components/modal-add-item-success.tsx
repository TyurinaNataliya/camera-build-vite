import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useRef } from 'react';

type Props = {
  handleCloseModalSuccess: () => void;
  fromCatalog?: boolean;
  fromProduct?: boolean;
  id?: number;
};

function ModalAddItemSuccess({
  handleCloseModalSuccess,
  fromCatalog,
  fromProduct,
  id,
}: Props): JSX.Element {
  const modalRef = useRef(null);

  return (
    <div
      className="modal is-active modal--narrow"
      onMouseDown={(event) => {
        if (modalRef.current && event.target === modalRef.current) {
          handleCloseModalSuccess();
        }
      }}
      onKeyDown={(evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          handleCloseModalSuccess();
        }
      }}
      tabIndex={0}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={modalRef}></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg
            className="modal__icon"
            width="86"
            height="80"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            {fromCatalog && (
              <Link
                onClick={handleCloseModalSuccess}
                className="btn btn--transparent modal__btn"
                to={AppRoute.Catalog}
                autoFocus
              >
                Продолжить покупки
              </Link>
            )}
            {fromProduct && id && (
              <Link
                onClick={handleCloseModalSuccess}
                className="btn btn--transparent modal__btn"
                to={`${AppRoute.Product}/${id}`}
              >
                Продолжить покупки
              </Link>
            )}

            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={AppRoute.Basket}
            >
              Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModalSuccess}
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
export { ModalAddItemSuccess };

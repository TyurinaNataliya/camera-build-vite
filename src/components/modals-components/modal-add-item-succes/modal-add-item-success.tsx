import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';

type Props = {
  handleCloseModalSuccess?: () => void;
};

function ModalAddItemSuccess({
  handleCloseModalSuccess,
}: Props): JSX.Element {
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalSuccess?.();
      }
      // перейти в корзину
      if ((evt.target as HTMLButtonElement)?.className === 'btn btn--purple modal__btn modal__btn--fit-width' && evt.key === 'Enter') {
        evt.preventDefault();
        handleCloseModalSuccess?.();
        navigate(AppRoute.Basket);
      }
      // перейти в каталог
      if ((evt.target as HTMLButtonElement)?.className === 'btn btn--transparent modal__btn' && evt.key === 'Enter') {
        evt.preventDefault();
        handleCloseModalSuccess?.();
        navigate(AppRoute.Catalog);
      }
      // крестик
      if ((evt.target as HTMLButtonElement)?.className === 'cross-btn' && evt.key === 'Enter') {
        evt.preventDefault();
        handleCloseModalSuccess?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleCloseModalSuccess, navigate]);


  return (
    <FocusTrap>
      <div
        className="modal is-active modal--narrow"
        data-testid="modal-add-item-success"
        onMouseDown={(event) => {
          if (modalRef.current && event.target === modalRef.current) {
            handleCloseModalSuccess?.();
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

              <Link
                onClick={handleCloseModalSuccess}
                className="btn btn--transparent modal__btn"
                to={AppRoute.Catalog}
                autoFocus
              >
                Продолжить покупки
              </Link>


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
    </FocusTrap>
  );
}
export { ModalAddItemSuccess };

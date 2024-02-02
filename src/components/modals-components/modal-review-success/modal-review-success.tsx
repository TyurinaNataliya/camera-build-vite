import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useEffect, useRef } from 'react';

type Props = {
  idProduct: number;
  handleCloseModalReviewSucces?: () => void;
};

function ModalReviewSuccess({
  idProduct,
  handleCloseModalReviewSucces,
}: Props): JSX.Element {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalReviewSucces?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleCloseModalReviewSucces]);

  return (
    <div
      className="modal is-active modal--narrow"
      onMouseDown={(event) => {
        if (modalRef.current && event.target === modalRef.current) {
          handleCloseModalReviewSucces?.();
        }
      }}
      tabIndex={0}
    >
      <div className="modal__wrapper" data-testid="modal-review-success">
        <div className="modal__overlay" ref={modalRef}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg
            className="modal__icon"
            width="80"
            height="78"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
              onClick={() => (
                navigate(`${AppRoute.Product}/${idProduct}`),
                handleCloseModalReviewSucces?.()
              )}
            >
              Вернуться к покупкам
            </button>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => (
              navigate(`${AppRoute.Product}/${idProduct}`),
              handleCloseModalReviewSucces?.()
            )}
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
export { ModalReviewSuccess };

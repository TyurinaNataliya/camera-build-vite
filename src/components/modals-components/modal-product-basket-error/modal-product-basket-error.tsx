import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useEffect, useRef } from 'react';
import FocusTrap from 'focus-trap-react';


type Props = {
  handleCloseModalErrorActive?: () => void;
}


function ModalProductBasketError({ handleCloseModalErrorActive }: Props): JSX.Element {
  const navigate = useNavigate();


  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalErrorActive?.();
      }
      // попробовать снова
      if ((evt.target as HTMLButtonElement)?.className === 'btn btn--purple modal__btn modal__btn--fit-width' && evt.key === 'Enter') {
        evt.preventDefault();
        navigate(AppRoute.Basket);
        handleCloseModalErrorActive?.();
      }
      // крестик
      if ((evt.target as HTMLButtonElement)?.className === 'cross-btn' && evt.key === 'Enter') {
        evt.preventDefault();
        handleCloseModalErrorActive?.();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [handleCloseModalErrorActive, navigate]);

  return (
    <FocusTrap>
      <div className="modal is-active modal--narrow" data-testid="modal-product-basket-error"
        onMouseDown={(event) => {
          if (modalRef.current && event.target === modalRef.current) {
            handleCloseModalErrorActive?.();
          }
        }}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" ref={modalRef}></div>
          <div className="modal__content">
            <p className="title title--h4">Упс..Что-то пошло не так.</p>
            <p className="title title--h4">Пожалуйста, проверьте детали заказа и попробуйте снова.</p>
            <div className="modal__buttons">
              <button
                onClick={() => {
                  navigate(AppRoute.Basket);
                  handleCloseModalErrorActive?.();
                }}
                className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
              >Попробовать снова.
              </button>

            </div>
            <button className="cross-btn" type="button" aria-label="Закрыть попап"
              onClick={() => {
                handleCloseModalErrorActive?.();
              }}
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
export { ModalProductBasketError };

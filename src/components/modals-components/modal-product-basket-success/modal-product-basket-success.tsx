
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useCallback, useEffect, useRef } from 'react';
import { removeCoupon, removeProduct } from '../../../services/token';
import { postBasketProductSlice } from '../../../store/slices/post-basket-product-slice';
import { useAppDispatch } from '../../../hooks/store';
import { postBasketCouponSlice } from '../../../store/slices/post-basket-coupon-slice';
import FocusTrap from 'focus-trap-react';

type Props = {
  handleCloseModalSuccessActive?: () => void;
}


function ModalProductBasketSucces({ handleCloseModalSuccessActive }: Props): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cleanBasket = useCallback(() => {
    removeProduct();
    removeCoupon();
    dispatch(postBasketProductSlice.actions.setProducts('[]'));
    dispatch(postBasketCouponSlice.actions.changeCoupon());
  }, [dispatch]);


  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalSuccessActive?.();
        cleanBasket();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [cleanBasket, handleCloseModalSuccessActive]);

  return (
    <FocusTrap>
      <div className="modal is-active modal--narrow" data-testid="modal-product-basket-success"
        onMouseDown={(event) => {
          if (modalRef.current && event.target === modalRef.current) {
            handleCloseModalSuccessActive?.();
            cleanBasket();
          }
        }}
      >
        <div className="modal__wrapper">
          <div className="modal__overlay" ref={modalRef}></div>
          <div className="modal__content">
            <p className="title title--h4">Спасибо за покупку</p>
            <svg className="modal__icon" width="80" height="78" aria-hidden="true">
              <use xlinkHref="#icon-review-success"></use>
            </svg>
            <div className="modal__buttons">
              <button
                onClick={() => {
                  cleanBasket();
                  navigate(AppRoute.Catalog);
                }}
                className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
              >Вернуться к покупкам
              </button>

            </div>
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={() => {
                handleCloseModalSuccessActive?.();
                cleanBasket();
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
export { ModalProductBasketSucces };

import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { postBasketProductSlice } from '../../../store/slices/post-basket-product-slice';
import { postBasketCouponSlice } from '../../../store/slices/post-basket-coupon-slice';
import { removeCoupon, removeProduct } from '../../../services/token';

type Props = {
  handleCloseModalErrorActive: () => void;
}


function ModalProductBasketError({ handleCloseModalErrorActive }: Props): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cleanBasket = useCallback(() => {
    removeProduct();
    removeCoupon();
    dispatch(postBasketProductSlice.actions.setProducts(''));
    dispatch(postBasketCouponSlice.actions.changeCoupon(''));
  }, [dispatch]);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleKey = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        handleCloseModalErrorActive?.();
        cleanBasket();
      }
    };
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [cleanBasket, handleCloseModalErrorActive]);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay" ref={modalRef}></div>
        <div className="modal__content">
          <p className="title title--h4">Упс..Что-то пошло не так.</p>
          <p className="title title--h4">Пожалуйста, проверьте детали заказа и попробуйте снова.</p>
          <div className="modal__buttons">
            <button
              onClick={() => {
                navigate(AppRoute.Basket);
                cleanBasket();
              }}
              className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
            >Попробовать снова.
            </button>

          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export { ModalProductBasketError };

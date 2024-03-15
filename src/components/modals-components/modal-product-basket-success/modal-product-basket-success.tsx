
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { postBasketProductSlice } from '../../../store/slices/post-basket-product-slice';
import { postBasketCouponSlice } from '../../../store/slices/post-basket-coupon-slice';


function ModalProductBasketSucces(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cleanBasket = useCallback(() => {
    dispatch(postBasketProductSlice.actions.setProducts(''));
    dispatch(postBasketCouponSlice.actions.changeCoupon(''));
  }, [dispatch]);

  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <button
              onClick={() => {
                navigate(AppRoute.Basket);
                cleanBasket();
              }}
              className="btn btn--purple modal__btn modal__btn--fit-width" type="button"
            >Вернуться к покупкам
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
export { ModalProductBasketSucces };

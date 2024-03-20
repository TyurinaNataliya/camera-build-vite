import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProductCardListInBasket } from '../../components/product-card/product-cards-list-in-basket';
import { AppRoute, DiscountFactor, RequestStatus, validPromoCoupon } from '../../const';
import { postOrdersProduct } from '../../services/thunk/post-orders-product';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useCallback, useMemo, useState } from 'react';
import { ModalProductBasketSucces } from '../../components/modals-components/modal-product-basket-success/modal-product-basket-success';
import { postCouponProduct } from '../../services/thunk/post-coupon-product';
import { ModalProductBasketError } from '../../components/modals-components/modal-product-basket-error/modal-product-basket-error';
import { postBasketCouponSlice } from '../../store/slices/post-basket-coupon-slice';
import { numberWithSpaces } from '../../utils/utils';
import { getCoupons } from '../../services/token';

function BasketContainer(): JSX.Element {
  const dispatch = useAppDispatch();

  const stateBasketProduct = useAppSelector((state) => state.postBasketProduct.productsInBasket);

  const sum = useMemo(() =>
    stateBasketProduct.reduce((acc, cur) => acc + ((cur.cnt || 0) * cur.price), 0), [stateBasketProduct]);

  const stateCoupon = useAppSelector((state) => state.CouponBasket.coupon);
  const couponFetchingsStatus = useAppSelector((state) => state.CouponBasket.couponFetchingstatus);

  const [nameCoupons, setNameCoupons] = useState<string>(getCoupons());
  const [modalSuccesActive, setModalSuccesActive] = useState<boolean>(false);
  const [modalErrorActive, setModalErrorActive] = useState<boolean>(false);

  const orderFetchingsStatus = useAppSelector((state) => state.postOrdersProduct.productInOrderFetchingstatus);


  const sendOrder = useCallback(() => {
    const result: number[] = [];
    stateBasketProduct.forEach((e) => {
      const temp: number[] = new Array<number>(e.cnt || 0).fill(e.id);
      result.push(...(temp || []));
    });
    dispatch(postOrdersProduct({ basketData: { camerasIds: result, coupon: couponFetchingsStatus === RequestStatus.Error || stateCoupon === '' ? null : stateCoupon } }));

  }, [couponFetchingsStatus, dispatch, stateBasketProduct, stateCoupon]);

  const getCoupon = useCallback((coupon: string, summa: number) => {
    switch (coupon) {
      case '': return 0;
      case 'camera-333': return summa * DiscountFactor.Camera333;
      case 'camera-444': return summa * DiscountFactor.Camera444;
      case 'camera-555': return summa * DiscountFactor.Camera555;
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="page-content" data-testid="basket-container">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Корзина
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {stateBasketProduct &&
                  (<ProductCardListInBasket products={stateBasketProduct} />)}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">
                    Если у вас есть промокод на скидку, примените его в этом
                    поле
                  </p>
                  <div className="basket-form">
                    <form action="#">
                      {stateCoupon === '' && (
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label ">Промокод</span>
                            <input
                              type="text"
                              name="promo"
                              value={nameCoupons}
                              onChange={(event) => {
                                setNameCoupons(event.target.value);
                              }}
                              placeholder="Введите промокод"
                            />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">
                            Промокод принят!
                          </p>
                        </div>)}
                      {stateCoupon !== '' && (
                        <div className={`custom-input ${(validPromoCoupon.includes(stateCoupon) ? 'is-valid' : 'is-invalid')}`}>
                          <label>
                            <span className="custom-input__label ">Промокод</span>
                            <input
                              type="text"
                              name="promo"
                              value={nameCoupons}
                              onChange={(event) => {
                                setNameCoupons(event.target.value);

                              }}
                              placeholder="Введите промокод"
                            />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">
                            Промокод принят!
                          </p>
                        </div>)}

                      <button
                        className="btn"
                        type="submit"
                        onClick={(event) => {
                          event.preventDefault();
                          if (nameCoupons) {
                            dispatch(postCouponProduct({ basketCouponData: nameCoupons }));
                          } else {
                            dispatch(postBasketCouponSlice.actions.changeCoupon());
                          }
                        }}
                      >
                        Применить
                      </button>
                    </form>
                  </div>
                </div>
                <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{numberWithSpaces(sum)} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">{
                      numberWithSpaces(Math.round(getCoupon(stateCoupon, sum) || 0))
                    } ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      {numberWithSpaces(getCoupon(stateCoupon, sum) ? sum - (Math.round(getCoupon(stateCoupon, sum) || 0)) : sum)} ₽
                    </span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    onClick={() => {
                      setModalSuccesActive(true);
                      setModalErrorActive(true);
                      sendOrder();
                      setNameCoupons('');
                    }}
                    disabled={stateBasketProduct.length < 1}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        {orderFetchingsStatus === RequestStatus.Success && modalSuccesActive === true && (
          <ModalProductBasketSucces handleCloseModalSuccessActive={() => {
            setModalSuccesActive(false);
          }}
          />
        )}
        {orderFetchingsStatus === RequestStatus.Error && modalErrorActive === true && (
          <ModalProductBasketError handleCloseModalErrorActive={() => {
            setModalErrorActive(false);
          }}
          />
        )}
      </main >
      <Footer />
    </>
  );
}

export { BasketContainer };

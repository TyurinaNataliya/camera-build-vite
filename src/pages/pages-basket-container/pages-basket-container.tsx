import { Link } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProductCardListInBasket } from '../../components/product-card/product-cards-list-in-basket';
import { AppRoute } from '../../const';
import { postOrdersProduct } from '../../services/thunk/post-orders-product';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useCallback, useMemo } from 'react';


function BasketContainer(): JSX.Element {
  const dispatch = useAppDispatch();

  const stateBasketProduct = useAppSelector((state) => state.postBasketProduct.productsInBasket);
  // console.log('🚀 ~ BasketContainer ~ stateBasketProduct:', stateBasketProduct);

  const sum = useMemo(() =>
    stateBasketProduct.reduce((acc, cur) => acc + ((cur.cnt || 0) * cur.price), 0), [stateBasketProduct]);

  const sendOrder = useCallback(() => {
    const result: number[] = [];
    stateBasketProduct.forEach((e) => {
      const temp: number[] = new Array<number>(e.cnt || 0).fill(e.id);
      result.push(...(temp || []));
    });
    // console.log('🚀 ~ sendOrder ~ result:', result);

    //TODO: coupon брать из стейта после проверки его валидности
    // Надо ли очищать корзину иуходить на стартовый экранъ???
    // Оповещение об успешной отправке заказа
    dispatch(postOrdersProduct({ basketData: { camerasIds: result, coupon: 'camera-333' } }));

  }, [dispatch, stateBasketProduct]);

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
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            onChange={() => {
                              //TODO: записывать купон через диспатч в глобальный стейт
                            }}
                            placeholder="Введите промокод"
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">
                          Промокод принят!
                        </p>
                      </div>
                      <button className="btn" type="submit" onClick={() => {
                        //TODO: передать купон POST /coupons
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
                    <span className="basket__summary-value">{sum} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">
                      0 ₽
                    </span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text basket__summary-text--total">
                      К оплате:
                    </span>
                    <span className="basket__summary-value basket__summary-value--total">
                      111 390 ₽
                    </span>
                  </p>
                  <button className="btn btn--purple" type="submit" onClick={() => {
                    sendOrder();
                  }}
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export { BasketContainer };

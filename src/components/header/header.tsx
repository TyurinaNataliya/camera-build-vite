import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { fetchSimilarProductsAction } from '../../services/thunk/fetch-similar-products';
import { fetchReviewsProductAction } from '../../services/thunk/fetch-reviews-product';
import { getProducts } from '../../services/token';
import { postBasketProductSlice } from '../../store/slices/post-basket-product-slice';

function Header(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const productInBasket = getProducts();
    if (productInBasket) {
      dispatch(postBasketProductSlice.actions.setProducts(productInBasket));
    }
  }, [dispatch]);

  // useEffect(() => {
  //   const couponInBasket = getCoupons();
  //   if (couponInBasket) {
  //     dispatch(postBasketCouponSlice.actions.changeCoupon(couponInBasket));
  //   }
  // }, [dispatch]);

  const [currentTab, setCurrentTab] = useState(-1);

  const products = useAppSelector((state) => state.products?.products);

  const nameLists = useMemo(
    () => products?.map((product) => product.name) || [],
    [products]
  );

  const stateBasketProduct = useAppSelector((state) => state.postBasketProduct.productsInBasket);


  const nameChangeHandle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setName(evt.target.value);
      function getOptions(nameInput: string, list: string[]) {
        if (!nameInput) {
          return [];
        }
        return list.filter((nameString) => nameString.toLowerCase().includes(nameInput.toLowerCase()));

      }

      if (evt.target.value.length !== 0) {
        setOptions(getOptions(evt.target.value, nameLists));
      }
    },
    [nameLists]
  );

  const nameResetHandle = useCallback(() => {
    setName('');
    inputRef.current?.focus();
    setOptions([]);

  }, []);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyCode = e.code;
      if (keyCode === 'ArrowDown' && options.length - 1 > currentTab) {
        setCurrentTab(currentTab + 1);
      }
      if (keyCode === 'ArrowUp' && currentTab >= 1) {
        setCurrentTab(currentTab - 1);
      }
      if (keyCode === 'Enter') {
        navigate(
          `${AppRoute.Product}/${nameLists.indexOf(options[currentTab]) + 1}`
        );
        dispatch(
          fetchProductAction(nameLists.indexOf(options[currentTab]) + 1)
        );
        dispatch(
          fetchSimilarProductsAction(nameLists.indexOf(options[currentTab]) + 1)
        );
        dispatch(
          fetchReviewsProductAction(nameLists.indexOf(options[currentTab]) + 1)
        );
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, currentTab, navigate, nameLists, dispatch]);

  return (
    <header className="header" id="header" data-testid="header-container">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoute.Catalog}
          aria-label="Переход на главную"
        >
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Catalog}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <div className="form-search">
          <form>
            <label>
              <svg
                className="form-search__icon"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                value={name}
                ref={inputRef}
                onChange={(event) => {
                  nameChangeHandle(event);
                }}
              />
            </label>
            <ul
              className="form-search__select-list"
              style={
                name.length > 2 && options.length !== 0
                  ? { visibility: 'visible', opacity: 1 }
                  : {}
              }
              ref={listRef}
            >
              {options.map((product, index) => (
                <li
                  className="form-search__select-item"
                  style={currentTab === index ? { background: '#c8c4e8' } : {}}
                  tabIndex={0}
                  key={product}

                  onClick={() => {
                    navigate(
                      `${AppRoute.Product}/${nameLists.indexOf(product) + 1}`
                    );
                    dispatch(
                      fetchProductAction(nameLists.indexOf(product) + 1)
                    );
                    dispatch(
                      fetchSimilarProductsAction(nameLists.indexOf(product) + 1)
                    );
                    dispatch(
                      fetchReviewsProductAction(nameLists.indexOf(product) + 1)
                    );
                  }}
                >
                  {product}
                </li>
              ))}
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            style={name ? { display: 'flex' } : { display: 'none' }}
            onClick={() => {
              nameResetHandle();
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>


        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {stateBasketProduct.length > 0 &&
            (<span className="header__basket-count">{stateBasketProduct.map((product) => product.cnt).reduce((acc: number, number) => acc + (number || 0), 0)}</span>)}
        </Link>
      </div>
    </header>
  );
}

export { Header };

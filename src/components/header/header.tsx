import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { fetchSimilarProductsAction } from '../../services/thunk/fetch-similar-products';
import { fetchReviewsProductAction } from '../../services/thunk/fetch-reviews-product';

function Header(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.products);

  const nameLists = useMemo(
    () => products?.map((product) => product.name) || [],
    [products]
  );

  const nameChangeHandle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setName(evt.target.value);
      function getOptions(nameInput: string, list: string[]) {
        return list.filter((element) => {
          const regex = new RegExp(nameInput, 'gi');

          return element.match(regex);
        });
      }

      if (name.length !== 0) {
        setOptions(getOptions(name, nameLists));
      }
    },
    [name, nameLists]
  );

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
            >
              {options.map((product) => (
                <li
                  className="form-search__select-item"
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
          <button className="form-search__reset" type="reset">
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
        </Link>
      </div>
    </header>
  );
}

export { Header };

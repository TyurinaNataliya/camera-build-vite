import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store';
import { ChangeEvent, useState } from 'react';

function Header(): JSX.Element {
  const [name, setName] = useState<string>('');
  let options: string[] = [];

  const products = useAppSelector((state) => state.products.products);
  const namesList: string[] = [];
  products?.map((product) => namesList.push(product.name));

  function getOptions(nameInput: string, list: string[]) {
    return list.filter((element) => {
      const regex = new RegExp(nameInput, 'gi');

      return element.match(regex);
    });
  }
  function nameChangeHandle(evt: ChangeEvent<HTMLInputElement>) {
    setName(evt.target.value.trim());

    if (name.length > 2) {
      options = getOptions(name, namesList);
      console.log(options);
    }
  }

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
                name.length > 3 ? { visibility: 'visible', opacity: 1 } : {}
              }
            >
              {options?.map((product) => (
                <li
                  className="form-search__select-item"
                  tabIndex={0}
                  key={product}
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

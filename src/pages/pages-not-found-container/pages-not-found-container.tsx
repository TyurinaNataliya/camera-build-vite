import { AppRoute } from '../../const';

function NotFoundContainer(): JSX.Element {
  return (
    <div
      style={{ marginTop: 300, marginLeft: 400 }}
      data-testid="not-found-container"
    >
      <span className="logo header__logo">
        <svg width="134" height="52" aria-hidden="true">
          <use xlinkHref="#logo"></use>
        </svg>
      </span>
      <h2 className="title title--h2">ОШИБКА 404</h2>
      <a className="link" href={AppRoute.Catalog}>
        вернуться на главную страницу сайта
      </a>
    </div>
  );
}

export { NotFoundContainer };

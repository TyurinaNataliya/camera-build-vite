import { Link } from 'react-router-dom';
import { AppRoute } from '../const';

type Props = {
  handleCloseModal: () => void;
};

function ModallAddItemSuccess({ handleCloseModal }: Props): JSX.Element {
  return (
    <div className="modal is-active modal--narrow">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg
            className="modal__icon"
            width="86"
            height="80"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              onClick={handleCloseModal}
              className="btn btn--transparent modal__btn"
              to={AppRoute.Catalog}
            >
              Продолжить покупки
            </Link>

            <Link
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={AppRoute.Basket}
            >
              Перейти в корзину
            </Link>
          </div>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseModal}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export { ModallAddItemSuccess };

import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  prevPage: () => void;
};

function ButtonPrev({ prevPage }: Props): JSX.Element {
  return (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={AppRoute.Catalog}
        onClick={prevPage}
      >
        Назад
      </Link>
    </li>
  );
}

export { ButtonPrev };

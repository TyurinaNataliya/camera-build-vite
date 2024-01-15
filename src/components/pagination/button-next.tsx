import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  nextPage: () => void;
};

function ButtonNext({ nextPage }: Props): JSX.Element {
  return (
    <li className="pagination__item">
      <Link
        className="pagination__link pagination__link--text"
        to={AppRoute.Catalog}
        onClick={nextPage}
      >
        Далее
      </Link>
    </li>
  );
}

export { ButtonNext };

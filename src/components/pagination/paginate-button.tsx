import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  onChange?: (number: number) => void;
  currentPage: number;
  title: string;
};

function PaginateButton({ onChange, currentPage, title }: Props): JSX.Element {
  return (
    <li className="pagination__item" data-testid="paginate-button">
      <Link
        className="pagination__link pagination__link--text"
        to={`${AppRoute.Catalog}?page=${currentPage}`}
        onClick={() => onChange?.(currentPage)}
      >
        {title}
      </Link>
    </li>
  );
}

export { PaginateButton };

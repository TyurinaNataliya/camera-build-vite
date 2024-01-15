import { Link } from 'react-router-dom';
import { AppRoute, MAX_COUNT_NUMBER_PAGE } from '../../const';
import { useMemo } from 'react';
import { PaginateButton } from './paginate-button';

type Props = {
  maxPage: number;
  onChangePage: (pageNumber: number) => void;
  currentPage: number;
};

function PaginationPagesNumbers({
  maxPage,
  onChangePage,
  currentPage,
}: Props): JSX.Element {
  const numberPages = useMemo(() => {
    const result: number[] = [];

    if (currentPage + MAX_COUNT_NUMBER_PAGE <= maxPage) {
      for (let i = currentPage; i < currentPage + MAX_COUNT_NUMBER_PAGE; i++) {
        result.push(i);
      }
    } else {
      for (let i = maxPage - MAX_COUNT_NUMBER_PAGE + 1; i <= maxPage; i++) {
        result.push(i);
      }
    }

    return result;
  }, [currentPage, maxPage]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1 && (
          <PaginateButton
            currentPage={currentPage - 1}
            onChange={onChangePage}
            title="Назад"
          />
        )}
        {numberPages.map((number) => (
          <li className="pagination__item" key={number}>
            <Link
              className={
                currentPage === number
                  ? 'pagination__link--active pagination__link'
                  : 'pagination__link'
              }
              to={`${AppRoute.Catalog}?page=${number}`}
              onClick={() => onChangePage(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        {maxPage > currentPage && (
          <PaginateButton
            currentPage={currentPage + 1}
            onChange={onChangePage}
            title="Далее"
          />
        )}
      </ul>
    </div>
  );
}
export { PaginationPagesNumbers };

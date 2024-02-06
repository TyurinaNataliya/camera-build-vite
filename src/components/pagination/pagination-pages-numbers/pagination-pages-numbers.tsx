import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useMemo } from 'react';
import { PaginateButton } from '../paginate-button/paginate-button';

type Props = {
  maxPage: number;
  onChangePage?: (pageNumber: number) => void;
  currentPage: number;
};

function PaginationPagesNumbers({
  maxPage,
  onChangePage,
  currentPage,
}: Props): JSX.Element {
  const numberPages = useMemo(() => {
    let result: number[] = [];
    if (currentPage === 1) {
      result = [currentPage, currentPage + 1, currentPage + 2];
    } else if (currentPage === maxPage) {
      result = [currentPage - 2, currentPage - 1, currentPage];
    } else {
      result = [currentPage - 1, currentPage, currentPage + 1];
    }

    return result;
  }, [currentPage, maxPage]);

  return (
    <div className="pagination" data-testid="pagination-pages-numbers">
      <ul className="pagination__list">
        {currentPage > 2 && (
          <PaginateButton
            currentPage={
              currentPage === maxPage ? currentPage - 3 : currentPage - 2
            }
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
              onClick={() => onChangePage?.(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        {maxPage >= currentPage + 2 && (
          <PaginateButton
            currentPage={currentPage === 1 ? currentPage + 3 : currentPage + 2}
            onChange={onChangePage}
            title="Далее"
          />
        )}
      </ul>
    </div>
  );
}
export { PaginationPagesNumbers };

import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useMemo } from 'react';
import { PaginateButton } from '../paginate-button/paginate-button';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { PaginationSlice } from '../../../store/slices/pagination-slice';

type Props = {
  maxPage: number;
};

function PaginationPagesNumbers({ maxPage }: Props): JSX.Element {
  const currentPageString = useAppSelector(
    (state) => state.pagination.currentPage
  );
  const currentPage = Number(currentPageString);
  const dispatch = useAppDispatch();
  const numberPages = useMemo(() => {
    let result: number[] = [];
    if (currentPage <= 3) {
      result = Array.from({ length: maxPage > 3 ? 3 : maxPage }, (_, i) => ++i);
    } else if (currentPage === maxPage || currentPage === maxPage - 1) {
      result = [4, 5];
    }

    return result;
  }, [currentPage, maxPage]);

  return (
    <div className="pagination" data-testid="pagination-pages-numbers">
      <ul className="pagination__list">
        {currentPage > 3 && (
          <PaginateButton
            currentPage={3}
            onChange={() =>
              dispatch(PaginationSlice.actions.changePage(String(currentPage)))
            }
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
              onClick={() =>
                dispatch(PaginationSlice.actions.changePage(String(number)))
              }
            >
              {number}
            </Link>
          </li>
        ))}
        {maxPage > 3 && maxPage >= currentPage + 2 && (
          <PaginateButton
            currentPage={4}
            onChange={() =>
              dispatch(PaginationSlice.actions.changePage(String(currentPage)))
            }
            title="Далее"
          />
        )}
      </ul>
    </div>
  );
}
export { PaginationPagesNumbers };

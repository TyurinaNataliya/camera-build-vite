import { Link } from 'react-router-dom';
import {
  AppRoute,
  MAX_COUNT_NUMBER_PAGE,
  NUMBER_FIVE_PAGE,
  NUMBER_FOUR_PAGE,
  NUMBER_ONE_PAGE,
  NUMBER_TWO_PAGE,
} from '../../../const';
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
    if (currentPage <= MAX_COUNT_NUMBER_PAGE) {
      result = Array.from(
        {
          length:
            maxPage > MAX_COUNT_NUMBER_PAGE ? MAX_COUNT_NUMBER_PAGE : maxPage,
        },
        (_, i) => ++i
      );
    } else if (
      currentPage === maxPage ||
      currentPage === maxPage - NUMBER_ONE_PAGE
    ) {
      result = [NUMBER_FOUR_PAGE, NUMBER_FIVE_PAGE];
    }

    return result;
  }, [currentPage, maxPage]);

  return (
    <div className="pagination" data-testid="pagination-pages-numbers">
      <ul className="pagination__list">
        {currentPage > MAX_COUNT_NUMBER_PAGE && (
          <PaginateButton
            currentPage={MAX_COUNT_NUMBER_PAGE}
            onChange={() =>
              dispatch(PaginationSlice.actions.changePage(String(currentPage)))}
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
                dispatch(PaginationSlice.actions.changePage(String(number)))}
            >
              {number}
            </Link>
          </li>
        ))}
        {maxPage > MAX_COUNT_NUMBER_PAGE &&
          maxPage >= currentPage + NUMBER_TWO_PAGE &&
          (<PaginateButton currentPage={NUMBER_FOUR_PAGE} onChange={() =>dispatch(PaginationSlice.actions.changePage(String(currentPage)))}title="Далее"/>)}
      </ul>
    </div>
  );
}
export { PaginationPagesNumbers };

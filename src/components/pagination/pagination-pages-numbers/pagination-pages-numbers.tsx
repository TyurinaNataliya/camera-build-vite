import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useMemo } from 'react';
import { PaginateButton } from '../paginate-button/paginate-button';
import { useAppSelector } from '../../../hooks/store';

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

    if (currentPage <= 3) {
      result = Array.from({ length: maxPage > 3 ? 3 : maxPage }, (_, i) => ++i);
    } else if (currentPage === maxPage || currentPage === maxPage - 1) {
      result = [4, 5];
    }

    return result;
  }, [currentPage, maxPage]);
  const stateTypeSorting = useAppSelector((state) => state.sortingType.type);
  const stateCategory = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const stateType = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const statelevel = useAppSelector((state) => state.levelFilter.level);

  return (
    <div className="pagination" data-testid="pagination-pages-numbers">
      <ul className="pagination__list">
        {currentPage > 3 && (
          <PaginateButton
            currentPage={3}
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
              to={`${AppRoute.Catalog}?page=${number}/sorting='${stateTypeSorting}'/filtration='${stateCategory}''${stateType}''${statelevel}'`}
              onClick={() => onChangePage?.(number)}
            >
              {number}
            </Link>
          </li>
        ))}
        {maxPage > 3 && maxPage >= currentPage + 2 && (
          <PaginateButton
            currentPage={4}
            onChange={onChangePage}
            title="Далее"
          />
        )}
      </ul>
    </div>
  );
}
export { PaginationPagesNumbers };

import { useSearchParams } from 'react-router-dom';
import { DEFAULT_NUMBER, NAME_ASCENDING_DESCENDING, SearchParamsType, filterAscendingDescending, sortType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

import { SortingAscendingDescendingSlice } from '../../store/slices/sorting-ascending-descending-slice';
import { PaginationSlice } from '../../store/slices/pagination-slice';
import { SortingTypeProductSlice } from '../../store/slices/sorting-type-product-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingUpDown({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const stateSorting = useAppSelector(
    (state) => state.sortingAscendingDescending.type
  );

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${type}`}>
      <input
        data-testid="btnSortingUpDown"
        onClick={() => {
          dispatch(SortingAscendingDescendingSlice.actions.changeType(type));
          dispatch(SortingTypeProductSlice.actions.changeType(sortType.SortPrice));
          dispatch(PaginationSlice.actions.changePage(DEFAULT_NUMBER));
          searchParams.set(SearchParamsType.Order, type);
          searchParams.delete(SearchParamsType.Page);
          setSearchParams(searchParams);
        }}
        type="radio"
        id={type}
        name="sort-icon"
        defaultChecked={type === filterAscendingDescending.Up}
        checked={type === stateSorting}
        aria-label={NAME_ASCENDING_DESCENDING[index]}
      />
      <label htmlFor={type}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#icon-sort"></use>
        </svg>
      </label>
    </div>
  );
}

export { ButtonSortingUpDown };

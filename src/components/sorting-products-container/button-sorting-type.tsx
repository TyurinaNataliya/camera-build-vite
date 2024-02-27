import { useSearchParams } from 'react-router-dom';
import { NAME_TYPE, SearchParamsType } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

import { SortingTypeProductSlice } from '../../store/slices/sorting-type-product-slice';
import { PaginationSlice } from '../../store/slices/pagination-slice';
import { SortingAscendingDescendingSlice } from '../../store/slices/sorting-ascending-descending-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingType({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateSorting = useAppSelector((state) => state.sortingType.type);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="catalog-sort__btn-text">
      <input
        data-testid="btnSortingType"
        onClick={() => {
          dispatch(SortingTypeProductSlice.actions.changeType(type));
          dispatch(SortingAscendingDescendingSlice.actions.changeType('up'));
          dispatch(PaginationSlice.actions.changePage('1'));
          searchParams.set(SearchParamsType.Sorting, type);
          searchParams.delete(SearchParamsType.Page);
          setSearchParams(searchParams);
        }}
        type="radio"
        id={type}
        name="sort"
        defaultChecked={type === 'sortPrice'}
        checked={type === stateSorting}
      />
      <label htmlFor={type}>{NAME_TYPE[index]}</label>
    </div>
  );
}

export { ButtonSortingType };

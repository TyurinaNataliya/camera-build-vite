import { NAME_ASCENDING_DESCENDING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { SortingAscendingDescendingSlice } from '../../store/slices/sorting-ascending-descending-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingUpDown({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateSorting = useAppSelector(
    (state) => state.sortingAscendingDescending.type
  );

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${type}`}>
      <input
        data-testid="btnSortingUpDown"
        onClick={() => {
          dispatch(SortingAscendingDescendingSlice.actions.changeType(type));
          dispatch(fetchProductsAction());
        }}
        type="radio"
        id={type}
        name="sort-icon"
        defaultChecked={type === 'up'}
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

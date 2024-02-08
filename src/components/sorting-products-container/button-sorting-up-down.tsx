import { NAME_ASCENDING_DESCENDING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { SortingTypeProductSlice } from '../../store/slices/sorting-product-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingUpDown({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateSorting = useAppSelector((state) => state.sortingType.type[1]);

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${type}`}>
      <input
        onClick={() => {
          dispatch(SortingTypeProductSlice.actions.changeType(type));
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

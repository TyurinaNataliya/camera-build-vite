import { NAME_TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { SortingTypeProductSlice } from '../../store/slices/sorting-type-product-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingType({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateSorting = useAppSelector((state) => state.sortingType.type);

  return (
    <div className="catalog-sort__btn-text">
      <input
        onClick={() => {
          dispatch(SortingTypeProductSlice.actions.changeType(type));
          dispatch(fetchProductsAction());
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
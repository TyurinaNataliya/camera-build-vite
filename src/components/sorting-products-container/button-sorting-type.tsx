import { NAME_TYPE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

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
        data-testid="btnSortingType"
        onClick={() => {
          dispatch(SortingTypeProductSlice.actions.changeType(type));
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

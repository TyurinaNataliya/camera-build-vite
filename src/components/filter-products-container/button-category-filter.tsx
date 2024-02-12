import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { FiltrationCategorySlice } from '../../store/slices/filtration-category-slice';

type Props = {
  category: string;
};

function ButtonCategoryFilter({ category }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCategoryFilter = useAppSelector(
    (state) => state.categoryFilter.category
  );
  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          type="checkbox"
          onClick={() => {
            dispatch(FiltrationCategorySlice.actions.changeType(category));
            dispatch(fetchProductsAction());
          }}
          checked={stateCategoryFilter === category}
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{category}</span>
      </label>
    </div>
  );
}
export { ButtonCategoryFilter };

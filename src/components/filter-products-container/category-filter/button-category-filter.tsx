import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationCategorySlice } from '../../../store/slices/filtration-category-slice';
import { PaginationSlice } from '../../../store/slices/pagination-slice';
import { SearchParamsType, optionsNameCategiryCameras } from '../../../const';

type Props = {
  category: string;
};

function ButtonCategoryFilter({ category }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateCategoryFilter = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          data-testid="btnCategiry"
          type="checkbox"
          onClick={() => {
            if (category === stateCategoryFilter) {
              dispatch(FiltrationCategorySlice.actions.changeType(''));
              searchParams.delete(SearchParamsType.Category);
              setSearchParams(searchParams);
            } else {
              dispatch(FiltrationCategorySlice.actions.changeType(category));
              dispatch(PaginationSlice.actions.changePage('1'));
              searchParams.set(SearchParamsType.Category, category);
              searchParams.delete(SearchParamsType.Page);
              setSearchParams(searchParams);

            }
          }}
          checked={
            stateCategoryFilter === ''
              ? false
              : stateCategoryFilter === category
          }
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{category === optionsNameCategiryCameras.Сamera ? optionsNameCategiryCameras.Photocamera : category}</span>
      </label>
    </div>
  );
}
export { ButtonCategoryFilter };

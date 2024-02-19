import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationCategorySlice } from '../../../store/slices/filtration-category-slice';

type Props = {
  category: string;
};

function ButtonCategoryFilter({ category }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stateCategoryFilter = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const stateTypeSorting = useAppSelector((state) => state.sortingType.type);
  const stateType = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const statelevel = useAppSelector((state) => state.levelFilter.level);

  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          data-testid="btnCategiry"
          type="checkbox"
          onClick={() => {
            dispatch(FiltrationCategorySlice.actions.changeType(category));
            navigate(
              `${AppRoute.Catalog}?page=1/sorting='${stateTypeSorting}'/filtration='${category}''${stateType}''${statelevel}'`
            );
          }}
          checked={
            stateCategoryFilter === ''
              ? false
              : stateCategoryFilter === category
          }
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{category}</span>
      </label>
    </div>
  );
}
export { ButtonCategoryFilter };

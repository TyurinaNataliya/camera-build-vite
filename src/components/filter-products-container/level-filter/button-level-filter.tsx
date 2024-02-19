import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationLevelSlice } from '../../../store/slices/filtration-level-slice';
import { AppRoute } from '../../../const';

type Props = {
  level: string;
};

function ButtonLevelFilter({ level }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const stateCategoryFilter = useAppSelector(
    (state) => state.levelFilter.level
  );
  const navigate = useNavigate();
  const stateTypeSorting = useAppSelector((state) => state.sortingType.type);
  const stateCategory = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const stateType = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );

  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          data-testid="btnLevel"
          type="checkbox"
          onClick={() => {
            dispatch(FiltrationLevelSlice.actions.changeType(level));
            navigate(
              `${AppRoute.Catalog}?page=1/sorting='${stateTypeSorting}'/filtration='${stateCategory}''${stateType}''${level}'`
            );
          }}
          checked={
            stateCategoryFilter === '' ? false : stateCategoryFilter === level
          }
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{level}</span>
      </label>
    </div>
  );
}
export { ButtonLevelFilter };

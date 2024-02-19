import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationTypeCamerasSlice } from '../../../store/slices/filtration-type-cameras-slice';
import { AppRoute } from '../../../const';

type Props = {
  typeCameras: string;
};
function ButtonTypeCameras({ typeCameras }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const stateTypeCameras = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const stateCategoryCameras = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const navigate = useNavigate();
  const stateTypeSorting = useAppSelector((state) => state.sortingType.type);
  const statelevel = useAppSelector((state) => state.levelFilter.level);

  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          data-testid="btnTypeCameras"
          type="checkbox"
          onClick={() => {
            dispatch(
              FiltrationTypeCamerasSlice.actions.changeType(typeCameras)
            );
            navigate(
              `${AppRoute.Catalog}?page=1/sorting='${stateTypeSorting}'/filtration='${stateCategoryCameras}''${typeCameras}''${statelevel}'`
            );
          }}
          checked={
            stateTypeCameras === '' ? false : stateTypeCameras === typeCameras
          }
          disabled={
            stateCategoryCameras === 'Фотоаппарат'
              ? false
              : !!(
                  (stateCategoryCameras === 'Видеокамера' &&
                    typeCameras === 'Плёночная') ||
                  (stateCategoryCameras === 'Видеокамера' &&
                    typeCameras === 'Моментальная')
                )
          }
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{typeCameras}</span>
      </label>
    </div>
  );
}

export { ButtonTypeCameras };

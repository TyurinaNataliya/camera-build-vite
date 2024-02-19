import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationTypeCamerasSlice } from '../../../store/slices/filtration-type-cameras-slice';

type Props = {
  typeCameras: string;
};
function ButtonTypeCameras({ typeCameras }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const stateTypeCameras = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const stateCategoryCameras = useAppSelector(
    (state) => state.categoryFilter.category
  );

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
            searchParams.set('type', typeCameras);
            searchParams.delete('page');
            setSearchParams(searchParams);
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

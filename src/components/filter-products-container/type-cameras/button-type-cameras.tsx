import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { fetchProductsAction } from '../../../services/thunk/fetch-products';
import { FiltrationTypeCamerasSlice } from '../../../store/slices/filtration-type-cameras-slice';

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
  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          type="checkbox"
          onClick={() => {
            dispatch(
              FiltrationTypeCamerasSlice.actions.changeType(typeCameras)
            );
            dispatch(fetchProductsAction());
          }}
          checked={stateTypeCameras === typeCameras}
          disabled={
            !!(
              (stateCategoryCameras === 'Видеокамера' &&
                typeCameras === 'Плёночна') ||
              typeCameras === 'Моментальная'
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

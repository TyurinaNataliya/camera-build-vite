import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationTypeCamerasSlice } from '../../../store/slices/filtration-type-cameras-slice';
import { PaginationSlice } from '../../../store/slices/pagination-slice';
import {
  CategiryCameras,
  SearchParamsType,
  TypesCameras,
} from '../../../const';

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
            if(typeCameras === stateTypeCameras) {
              dispatch(
                FiltrationTypeCamerasSlice.actions.changeType(''));
              searchParams.delete(SearchParamsType.Type);
              setSearchParams(searchParams);

            } else {
              dispatch(
                FiltrationTypeCamerasSlice.actions.changeType(typeCameras)
              );
              dispatch(PaginationSlice.actions.changePage('1'));
              searchParams.set(SearchParamsType.Type, typeCameras);
              searchParams.delete(SearchParamsType.Page);
              setSearchParams(searchParams);
            }
          }}
          checked={
            stateTypeCameras === '' ? false : stateTypeCameras === typeCameras
          }
          disabled={
            stateCategoryCameras === CategiryCameras.Photocamera
              ? false
              : !!((
                stateCategoryCameras === CategiryCameras.Videocamera &&
                    typeCameras === TypesCameras.Film
              ) || (stateCategoryCameras === CategiryCameras.Videocamera &&
                    typeCameras === TypesCameras.Instant
              ))
          }
        />
        <span className="custom-checkbox__icon"></span>
        <span className="custom-checkbox__label">{typeCameras}</span>
      </label>
    </div>
  );
}

export { ButtonTypeCameras };

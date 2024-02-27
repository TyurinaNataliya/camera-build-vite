import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationLevelSlice } from '../../../store/slices/filtration-level-slice';
import { PaginationSlice } from '../../../store/slices/pagination-slice';
import { SearchParamsType } from '../../../const';

type Props = {
  level: string;
};

function ButtonLevelFilter({ level }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const stateCategoryFilter = useAppSelector(
    (state) => state.levelFilter.level
  );

  return (
    <div className="custom-checkbox catalog-filter__item">
      <label>
        <input
          data-testid="btnLevel"
          type="checkbox"
          onClick={() => {
            if(level === stateCategoryFilter){
              dispatch(FiltrationLevelSlice.actions.changeType(''));
              searchParams.delete(SearchParamsType.Level);
              setSearchParams(searchParams);
            } else{
              dispatch(FiltrationLevelSlice.actions.changeType(level));
              dispatch(PaginationSlice.actions.changePage('1'));
              searchParams.set(SearchParamsType.Level, level);
              searchParams.delete(SearchParamsType.Page);
              setSearchParams(searchParams);
            }
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

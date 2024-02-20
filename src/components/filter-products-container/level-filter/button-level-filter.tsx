import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationLevelSlice } from '../../../store/slices/filtration-level-slice';
import { PaginationSlice } from '../../../store/slices/pagination-slice';

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
            dispatch(FiltrationLevelSlice.actions.changeType(level));
            dispatch(PaginationSlice.actions.changePage('1'));
            searchParams.set('level', level);
            searchParams.delete('page');
            setSearchParams(searchParams);
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

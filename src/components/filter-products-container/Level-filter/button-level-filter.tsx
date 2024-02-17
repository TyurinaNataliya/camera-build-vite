import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationLevelSlice } from '../../../store/slices/filtration-level-slice';

type Props = {
  level: string;
};

function ButtonLevelFilter({ level }: Props): JSX.Element {
  const dispatch = useAppDispatch();

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

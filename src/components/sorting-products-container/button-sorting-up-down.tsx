import { useNavigate } from 'react-router-dom';
import { AppRoute, NAME_ASCENDING_DESCENDING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

import { SortingAscendingDescendingSlice } from '../../store/slices/sorting-ascending-descending-slice';

type Props = {
  type: string;
  index: number;
};

function ButtonSortingUpDown({ type, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stateSorting = useAppSelector(
    (state) => state.sortingAscendingDescending.type
  );
  const stateTypeSorting = useAppSelector((state) => state.sortingType.type);
  const stateCategory = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const stateType = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const statelevel = useAppSelector((state) => state.levelFilter.level);

  return (
    <div className={`catalog-sort__btn catalog-sort__btn--${type}`}>
      <input
        data-testid="btnSortingUpDown"
        onClick={() => {
          dispatch(SortingAscendingDescendingSlice.actions.changeType(type));
          navigate(
            `${AppRoute.Catalog}?page=1/sorting='${stateTypeSorting}'/filtration='${stateCategory}''${stateType}''${statelevel}'`
          );
        }}
        type="radio"
        id={type}
        name="sort-icon"
        defaultChecked={type === 'up'}
        checked={type === stateSorting}
        aria-label={NAME_ASCENDING_DESCENDING[index]}
      />
      <label htmlFor={type}>
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#icon-sort"></use>
        </svg>
      </label>
    </div>
  );
}

export { ButtonSortingUpDown };

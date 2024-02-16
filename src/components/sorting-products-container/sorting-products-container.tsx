import {
  NAME_ASCENDING_DESCENDING_ENGLISH,
  NAME_TYPE_ENGLISH,
} from '../../const';
import { ButtonSortingType } from './button-sorting-type';
import { ButtonSortingUpDown } from './button-sorting-up-down';

function SortingProductsContainer(): JSX.Element {
  return (
    <div
      className="catalog-sort__inner"
      data-testid="componentSortingProductsContainer"
    >
      <p className="title title--h5">Сортировать:</p>
      <div className="catalog-sort__type">
        {NAME_TYPE_ENGLISH.map((typeSort) => (
          <ButtonSortingType
            type={typeSort}
            key={typeSort}
            index={NAME_TYPE_ENGLISH.indexOf(typeSort)}
          />
        ))}
      </div>
      <div className="catalog-sort__order">
        {NAME_ASCENDING_DESCENDING_ENGLISH.map(
          (typeSortAscendingDescending) => (
            <ButtonSortingUpDown
              type={typeSortAscendingDescending}
              key={typeSortAscendingDescending}
              index={NAME_ASCENDING_DESCENDING_ENGLISH.indexOf(
                typeSortAscendingDescending
              )}
            />
          )
        )}
      </div>
    </div>
  );
}

export { SortingProductsContainer };

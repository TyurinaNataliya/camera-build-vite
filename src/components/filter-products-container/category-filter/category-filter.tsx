import { CATEGORY_FILTER } from '../../../const';
import { ButtonCategoryFilter } from './button-category-filter';

function CategoryFilter(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend data-testid="componentCategоry" className="title title--h5">
        Категория
      </legend>
      {CATEGORY_FILTER.map((category) => (
        <ButtonCategoryFilter category={category} key={category} />
      ))}
    </fieldset>
  );
}
export { CategoryFilter };

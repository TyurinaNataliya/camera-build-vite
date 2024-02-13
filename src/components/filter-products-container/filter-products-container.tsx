import { useAppDispatch } from '../../hooks/store';
import { FiltrationCategorySlice } from '../../store/slices/filtration-category-slice';
import { FiltrationLevelSlice } from '../../store/slices/filtration-level-slice';
import { FiltrationTypeCamerasSlice } from '../../store/slices/filtration-type-cameras-slice';
import { CategoryFilter } from './category-filter/category-filter';
import { LevelFilter } from './Level-filter/level-filter';
import { TypeCameras } from './type-cameras/type-cameras';

function FilterProductsContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  function resetFiltration() {
    dispatch(FiltrationCategorySlice.actions.changeType(''));
    dispatch(FiltrationTypeCamerasSlice.actions.changeType(''));
    dispatch(FiltrationLevelSlice.actions.changeType(''));
  }
  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
                </label>
              </div>
            </div>
          </fieldset>
          <CategoryFilter />
          <TypeCameras />
          <LevelFilter />
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={() => {
              resetFiltration;
            }}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export { FilterProductsContainer };

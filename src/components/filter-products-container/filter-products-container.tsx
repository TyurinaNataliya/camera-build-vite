import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/store';

import { FiltrationCategorySlice } from '../../store/slices/filtration-category-slice';
import { FiltrationLevelSlice } from '../../store/slices/filtration-level-slice';
import { FiltrationPriceSlice } from '../../store/slices/filtration-price-slice';
import { FiltrationTypeCamerasSlice } from '../../store/slices/filtration-type-cameras-slice';
import { CategoryFilter } from './category-filter/category-filter';
import { LevelFilter } from './level-filter/level-filter';
import { PriceFilter } from './price-filter/price-filter';
import { TypeCameras } from './type-cameras/type-cameras';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { PaginationSlice } from '../../store/slices/pagination-slice';

type Props = {
  minPriceProduct: number;
  maxPriceProduct: number;
};

function FilterProductsContainer({ minPriceProduct, maxPriceProduct }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const resetFiltration = useCallback(() => {
    dispatch(FiltrationCategorySlice.actions.changeType(''));
    dispatch(FiltrationTypeCamerasSlice.actions.changeType(''));
    dispatch(FiltrationLevelSlice.actions.changeType(''));
    dispatch(FiltrationPriceSlice.actions.changeFrom(''));
    dispatch(FiltrationPriceSlice.actions.changeTo(''));
    dispatch(PaginationSlice.actions.changePage('1'));
    navigate(AppRoute.Catalog);
  }, [dispatch, navigate]);

  return (
    <div
      className="catalog__aside"
      data-testid="componentFilterProductsContainer"
    >
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <PriceFilter maxPriceProduct={maxPriceProduct} minPriceProduct={minPriceProduct} />
          <CategoryFilter />
          <TypeCameras />
          <LevelFilter />
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={() => {
              resetFiltration();
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

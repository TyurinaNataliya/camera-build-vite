import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';


function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);
  const maxPriceProduct = useAppSelector((state) => state.priceFilter.maxPrice);
  const minPriceProduct = useAppSelector((state) => state.priceFilter.minPrice);


  const handleBlurFrom = useCallback(() => {
    let res = statePriceFrom;
    // если цена ОТ меньше минимальной цены ставим последнюю
    if (Number(statePriceFrom) <= Number(minPriceProduct)) {
      res = minPriceProduct;
    }
    // если цена ОТ больше максимальной цены ставим последнюю
    if (Number(statePriceFrom) >= Number(maxPriceProduct)) {
      res = maxPriceProduct;
    }
    // если цена ОТ больше цены ДО то ставим последнюю
    if (statePriceTo && (Number(statePriceFrom) >= Number(statePriceTo))) {
      res = statePriceTo;
    }
    dispatch(FiltrationPriceSlice.actions.changeFrom(res));
  }, [dispatch, maxPriceProduct, minPriceProduct, statePriceFrom, statePriceTo]);

  const handleBlurTo = useCallback(() => {
    let res = statePriceTo;
    // если цена ДО меньше минимальной цены ставим последнюю
    if (statePriceTo && Number(statePriceTo) <= Number(minPriceProduct)) {
      res = minPriceProduct;
    }
    // если цена ДО больше максимальной цены ставим последнюю
    if (Number(statePriceTo) >= Number(maxPriceProduct)) {
      res = maxPriceProduct;
    }
    // если цена ДО меньше цены ОТ то ставим последнюю
    if (statePriceTo && Number(statePriceTo) <= Number(statePriceFrom)) {
      res = statePriceFrom;
    }
    dispatch(FiltrationPriceSlice.actions.changeTo(res));
  }, [dispatch, maxPriceProduct, minPriceProduct, statePriceFrom, statePriceTo]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range" data-testid="componentPrice">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от ${minPriceProduct}`}
              value={statePriceFrom}
              onBlur={handleBlurFrom}
              onChange={(event) => {
                dispatch(FiltrationPriceSlice.actions.changeFrom(event.target.value));
              }}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до ${maxPriceProduct}`}
              value={statePriceTo}
              onBlur={handleBlurTo}
              onChange={(event) => {
                dispatch(FiltrationPriceSlice.actions.changeTo(event.target.value));
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

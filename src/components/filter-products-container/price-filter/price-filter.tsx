import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';


function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);
  const maxPriceProduct = useAppSelector((state) => state.priceFilter.maxPrice);
  const minPriceProduct = useAppSelector((state) => state.priceFilter.minPrice);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const handleBlurFrom = useCallback((value: string) => {
    let res = value;
    // если цена ОТ меньше минимальной цены ставим последнюю
    if (value && Number(value) <= Number(minPriceProduct)) {
      res = minPriceProduct;
    }
    // если цена ОТ больше максимальной цены ставим последнюю
    if (Number(value) >= Number(maxPriceProduct)) {
      res = maxPriceProduct;
    }
    // если цена ОТ больше цены ДО то ставим последнюю
    if (statePriceTo && (Number(value) >= Number(statePriceTo))) {
      res = statePriceTo;
    }
    dispatch(FiltrationPriceSlice.actions.changeFrom(res));
    if (res !== value) {
      setPriceFrom(res);
    }
  }, [dispatch, maxPriceProduct, minPriceProduct, statePriceTo]);

  const handleBlurTo = useCallback((value: string) => {
    let res = value;
    // если цена ДО меньше минимальной цены ставим последнюю
    if (value && Number(value) <= Number(minPriceProduct)) {
      res = minPriceProduct;
    }
    // если цена ДО больше максимальной цены ставим последнюю
    if (Number(value) >= Number(maxPriceProduct)) {
      res = maxPriceProduct;
    }
    // если цена ДО меньше цены ОТ то ставим последнюю
    if (value && Number(value) <= Number(statePriceFrom)) {
      res = statePriceFrom;
    }
    dispatch(FiltrationPriceSlice.actions.changeTo(res));
    if (res !== value) {
      setPriceTo(res);
    }
  }, [dispatch, maxPriceProduct, minPriceProduct, statePriceFrom]);

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
              value={priceFrom}
              onBlur={(event) => {
                handleBlurFrom(event.target.value);
              }}
              onChange={(event) => {
                setPriceFrom(event.target.value);
                // dispatch(FiltrationPriceSlice.actions.changeFrom(event.target.value));
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
              value={priceTo}
              onBlur={(event) => {
                handleBlurTo(event.target.value);
              }}
              onChange={(event) => {
                setPriceTo(event.target.value);
                // dispatch(FiltrationPriceSlice.actions.changeTo(event.target.value));
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

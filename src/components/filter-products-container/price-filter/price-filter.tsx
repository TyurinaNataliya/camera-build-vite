import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';


function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);
  const maxPriceProduct = useAppSelector((state) => state.priceFilter.maxPrice);
  const minPriceProduct = useAppSelector((state) => state.priceFilter.minPrice);


  useEffect(() => {
    if (!statePriceTo) {
      return;
    }
    const v = setTimeout(() => {
      let res = statePriceTo;
      if (Number(statePriceFrom) && Number(statePriceTo) <= Number(statePriceFrom) && Number(statePriceFrom) >= Number(maxPriceProduct)) {
        res = maxPriceProduct;
      }
      if (Number(statePriceTo) <= Number(minPriceProduct)) {
        res = minPriceProduct;
      }
      if (Number(statePriceTo) >= Number(maxPriceProduct)) {
        res = maxPriceProduct;
      }
      if (Number(statePriceTo) && Number(statePriceTo) <= Number(statePriceFrom)) {
        res = statePriceFrom;
      }
      dispatch(FiltrationPriceSlice.actions.changeTo(res));
    }, 1000);

    return () => clearTimeout(v);
  }, [dispatch, maxPriceProduct, minPriceProduct, statePriceFrom, statePriceTo]);


  useEffect(() => {

    if (!statePriceFrom) {
      return;
    }
    const v = setTimeout(() => {
      let res = statePriceFrom;
      if (Number(statePriceFrom) <= Number(minPriceProduct)) {
        res = minPriceProduct;
      }
      if (Number(statePriceFrom) >= Number(maxPriceProduct)) {
        res = maxPriceProduct;
      }
      if (Number(statePriceTo) && (Number(statePriceFrom) >= Number(maxPriceProduct))) {
        res = maxPriceProduct;
      }
      dispatch(FiltrationPriceSlice.actions.changeFrom(res));

    }, 1000);

    return () => clearTimeout(v);
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

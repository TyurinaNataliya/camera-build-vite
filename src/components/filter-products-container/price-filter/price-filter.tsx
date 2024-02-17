import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';

function PriceFilter(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);

  const listPriceProducts = [...(products || [])].map(
    (product) => product.price
  );
  const maxPriceProduct = Math.max(...listPriceProducts);
  const minPriceProduct = Math.min(...listPriceProducts);

  const resultFrom = useMemo(() => {
    if (Number(statePriceFrom) < 0) {
      return 0;
    }
    // if (Number(statePriceFrom) < minPriceProduct) {
    //   return minPriceProduct;
    // }
    return statePriceFrom;
  }, [statePriceFrom]);

  const resultTo = useMemo(() => {
    if (Number(statePriceTo) < 0) {
      return 0;
    }
    // if (Number(statePriceTo) < maxPriceProduct) {
    //   return maxPriceProduct;
    // }
    return statePriceTo;
  }, [statePriceTo]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range" data-testid="componentPrice">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от${minPriceProduct}`}
              value={resultFrom}
              onChange={(event) => {
                dispatch(
                  FiltrationPriceSlice.actions.changeFrom(event.target.value)
                );
              }}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={`до${maxPriceProduct}`}
              value={resultTo}
              onChange={(event) => {
                dispatch(
                  FiltrationPriceSlice.actions.changeTo(event.target.value)
                );
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

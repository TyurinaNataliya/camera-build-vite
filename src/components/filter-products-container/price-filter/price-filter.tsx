import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';
import { TypeProduct } from '../../../type-data/type';

type Props = {
  filteredProducts: TypeProduct[];
};

function PriceFilter({ filteredProducts }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);

  const handlePriceFrom = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTimeout(() => {
        dispatch(FiltrationPriceSlice.actions.changeFrom(event.target.value));
      }, 1000);
    },
    [dispatch]
  );

  const handlePriceTo = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTimeout(() => {
        dispatch(FiltrationPriceSlice.actions.changeTo(event.target.value));
      }, 1000);
    },
    [dispatch]
  );

  const listPriceProducts = [...(filteredProducts || [])].map(
    (product) => product.price
  );
  const maxPriceProduct = Math.max(...listPriceProducts);
  const minPriceProduct = Math.min(...listPriceProducts);

  const resultFrom = useMemo(() => {
    if (statePriceFrom && Number(statePriceFrom) < minPriceProduct) {
      return minPriceProduct;
    }
    if (statePriceFrom && Number(statePriceFrom) > maxPriceProduct) {
      return maxPriceProduct;
    }
  }, [maxPriceProduct, minPriceProduct, statePriceFrom]);

  const resultTo = useMemo(() => {
    if (statePriceTo && Number(statePriceTo) < Number(statePriceFrom)) {
      return Number(statePriceFrom);
    }
    if (statePriceTo && Number(statePriceTo) > maxPriceProduct) {
      return maxPriceProduct;
    }
  }, [maxPriceProduct, statePriceFrom, statePriceTo]);

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
                handlePriceFrom(event);
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
                handlePriceTo(event);
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

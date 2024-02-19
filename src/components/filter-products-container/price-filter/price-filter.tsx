import { useMemo, useState } from 'react';
import { useAppDispatch } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';
import { TypeProduct } from '../../../type-data/type';

type Props = {
  filteredProducts: TypeProduct[];
};

function PriceFilter({ filteredProducts }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const [statePriceFrom, setStatePriceFrom] = useState('');
  function hendlePriceFrom(event: React.ChangeEvent<HTMLInputElement>) {
    setStatePriceFrom(event.target.value);
  }
  const [statePriceTo, setStatePriceTo] = useState('');
  function hendlePriceTo(event: React.ChangeEvent<HTMLInputElement>) {
    setStatePriceTo(event.target.value);
  }

  const listPriceProducts = [...(filteredProducts || [])].map(
    (product) => product.price
  );
  const maxPriceProduct = Math.max(...listPriceProducts);
  const minPriceProduct = Math.min(...listPriceProducts);

  const resultFrom = useMemo(() => {
    if (Number(statePriceFrom) < 0) {
      return 0;
    }
    if (statePriceFrom.length && Number(statePriceFrom) < minPriceProduct) {
      return minPriceProduct;
    }
    if (
      statePriceFrom.length >= String(maxPriceProduct).length &&
      Number(statePriceFrom) > maxPriceProduct
    ) {
      return maxPriceProduct;
    }
  }, [maxPriceProduct, minPriceProduct, statePriceFrom]);

  const resultTo = useMemo(() => {
    if (Number(statePriceTo) < 0) {
      return 0;
    }
    if (statePriceTo.length && Number(statePriceTo) < Number(statePriceFrom)) {
      return Number(statePriceFrom);
    }
    if (
      statePriceTo.length >= String(maxPriceProduct).length &&
      Number(statePriceTo) > maxPriceProduct
    ) {
      return maxPriceProduct;
    }
    return statePriceTo;
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
                hendlePriceFrom(event);
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
                hendlePriceTo(event);
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

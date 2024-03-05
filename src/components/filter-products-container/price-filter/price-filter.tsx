import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { FiltrationPriceSlice } from '../../../store/slices/filtration-price-slice';

type Props = {
  minPriceProduct: number;
  maxPriceProduct: number;
};

function PriceFilter({ minPriceProduct, maxPriceProduct }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);

  const [priceTo, setPriceTo] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<string>('');

  useEffect(() => {
    setPriceTo(statePriceTo);
    return () => setPriceTo('');
  }, [statePriceTo]);

  useEffect(() => {
    setPriceFrom(statePriceFrom);
    return () => setPriceFrom('');
  }, [statePriceFrom]);

  useEffect(() => {
    if (!priceTo) {
      return;
    }
    const v = setTimeout(() => {
      let res = priceTo;
      if (Number(priceFrom) && Number(priceTo) <= Number(priceFrom) && Number(priceFrom) >= maxPriceProduct) {
        res = maxPriceProduct.toString();
      }
      if (Number(priceTo) <= Number(priceFrom) && Number(priceFrom) < maxPriceProduct) {
        res = priceFrom;
      }
      if (Number(priceTo) <= minPriceProduct) {
        res = minPriceProduct.toString();
      }
      if (Number(priceTo) >= maxPriceProduct) {
        res = maxPriceProduct.toString();
      }
      dispatch(FiltrationPriceSlice.actions.changeTo(res));
    }, 1000);
    return () => clearTimeout(v);
  }, [dispatch, maxPriceProduct, minPriceProduct, priceFrom, priceTo]);


  useEffect(() => {
    if (!priceFrom) {
      return;
    }
    const v = setTimeout(() => {
      let res = priceFrom;
      if (Number(priceFrom) <= minPriceProduct) {
        res = minPriceProduct.toString();
      }
      if (Number(priceFrom) >= maxPriceProduct) {
        res = maxPriceProduct.toString();
      }

      dispatch(FiltrationPriceSlice.actions.changeFrom(res));
    }, 1000);
    return () => clearTimeout(v);
  }, [dispatch, maxPriceProduct, minPriceProduct, priceFrom, priceTo]);


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
              onChange={(event) => {
                setPriceFrom(event.target.value);
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
              onChange={(event) => {
                setPriceTo(event.target.value);
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

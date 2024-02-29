import { useEffect, useMemo, useState } from 'react';
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

  const listPriceProducts = useMemo(
    () => [...(filteredProducts || [])].map((product) => product.price),
    [filteredProducts]
  );
  const maxPriceProduct = useMemo(() => {
    const max = Math.max(...listPriceProducts);

    return max === Infinity ? 0 : max;
  }, [listPriceProducts]);
  const minPriceProduct = useMemo(() => {
    const min = Math.min(...listPriceProducts);
    return min < 0 ? 0 : min;
  }, [listPriceProducts]);

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
      if (Number(priceTo) <= minPriceProduct) {
        res = minPriceProduct.toString();
      }
      if (Number(priceTo) >= maxPriceProduct) {
        res = maxPriceProduct.toString();
      }
      if (priceFrom && Number(priceFrom) > minPriceProduct && Number(priceTo) < Number(priceFrom)) {
        res = priceFrom.toString();
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
      if (priceTo && Number(priceTo) > minPriceProduct && Number(priceFrom) > Number(priceTo)) {
        res = priceTo.toString();
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

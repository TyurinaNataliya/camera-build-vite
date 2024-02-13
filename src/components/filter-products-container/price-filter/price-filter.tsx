import { ChangeEvent, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/store';
import { fetchProductsAction } from '../../../services/thunk/fetch-products';
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

  const priceFromChangeHandle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(FiltrationPriceSlice.actions.changeFrom(evt.target.value));
      dispatch(fetchProductsAction());
    },
    [dispatch]
  );
  const priceToChangeHandle = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      dispatch(FiltrationPriceSlice.actions.changeTo(evt.target.value));
      dispatch(fetchProductsAction());
    },
    [dispatch]
  );
  useEffect(() => {
    if (statePriceFrom && statePriceTo.length > 4) {
      dispatch(
        fetchProductsAction([Number(statePriceFrom), Number(statePriceTo)])
      );
    }
  }, [
    dispatch,
    maxPriceProduct,
    minPriceProduct,
    statePriceFrom,
    statePriceTo,
  ]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={`от${minPriceProduct}`}
              value={statePriceFrom}
              onChange={(event) => {
                priceFromChangeHandle(event);
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
              value={statePriceTo}
              onChange={(event) => {
                priceToChangeHandle(event);
              }}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export { PriceFilter };

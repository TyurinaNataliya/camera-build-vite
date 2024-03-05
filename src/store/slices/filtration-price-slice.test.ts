import { FiltrationPriceSlice } from './filtration-price-slice';

describe('Filtration Price Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      priceFrom: 'null',
      priceTo: 'null',
      maxPrice: 'null',
      minPrice: 'null',
    };

    const result = FiltrationPriceSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      priceFrom: '',
      priceTo: '',
      maxPrice: '',
      minPrice: '',
    };
    const result = FiltrationPriceSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

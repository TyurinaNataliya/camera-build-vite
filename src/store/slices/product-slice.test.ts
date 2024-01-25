import { productSlice } from './product-slice';

describe('product Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      product: null,
      error: 'null',
      loading: true,
    };

    const result = productSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      product: null,
      error: null,
      loading: null,
    };
    const result = productSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

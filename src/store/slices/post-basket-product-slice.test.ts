import { postBasketProductSlice } from './post-basket-product-slice';

describe('postBasketProductSlice', () => {
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      productsInBasket: [],
      productsIdInBasket: [],
    };
    const result = postBasketProductSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

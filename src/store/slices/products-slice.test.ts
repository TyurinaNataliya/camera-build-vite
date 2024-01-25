import { RequestStatus } from '../../const';
import { productsSlice } from './products-slice';

describe('products Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: null,
      loadingStatus: true,
      error: 'null',
      fetchingStatus: RequestStatus.Pending,
    };

    const result = productsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      products: null,
      loadingStatus: null,
      error: null,
      fetchingStatus: RequestStatus.Idle,
    };
    const result = productsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

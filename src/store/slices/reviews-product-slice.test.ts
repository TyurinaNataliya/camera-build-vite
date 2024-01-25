import { RequestStatus } from '../../const';
import { reviewsProductSlice } from './reviews-product-slice';

describe('reviewsProduct Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviewsProduct: null,
      loadingStatus: true,
      error: 'null',
      fetchingStatus: RequestStatus.Success,
    };

    const result = reviewsProductSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviewsProduct: null,
      loadingStatus: null,
      error: null,
      fetchingStatus: RequestStatus.Idle,
    };
    const result = reviewsProductSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

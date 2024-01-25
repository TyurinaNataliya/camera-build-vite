import { RequestStatus } from '../../const';
import { similarProductsSlice } from './similar-products-slice';

describe('similarProducts Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      similarProducts: null,
      loadingStatus: true,
      error: 'null',
      fetchingStatus: RequestStatus.Success,
    };

    const result = similarProductsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      similarProducts: null,
      loadingStatus: null,
      error: null,
      fetchingStatus: RequestStatus.Idle,
    };
    const result = similarProductsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

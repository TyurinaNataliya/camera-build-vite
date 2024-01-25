import { RequestStatus } from '../../const';
import { promoProductsSlice } from './promo-products-slice';

describe('promoProducts Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promoProducts: null,
      loadingStatus: true,
      error: 'null',
      fetchingStatus: RequestStatus.Pending,
    };

    const result = promoProductsSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      promoProducts: null,
      loadingStatus: null,
      error: null,
      fetchingStatus: RequestStatus.Idle,
    };
    const result = promoProductsSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

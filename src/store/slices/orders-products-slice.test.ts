import { OrdersProductSlice } from './orders-products-slice';
import { RequestStatus } from '../../const';

describe('OrdersProductSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      productInOrder: null,
      loadingStatus: true,
      error: 'null',
      fetchingStatus: RequestStatus.Pending,
    };

    const result = OrdersProductSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      productInOrder: null,
      loadingStatus: null,
      error: null,
      fetchingStatus: RequestStatus.Idle,
    };
    const result = OrdersProductSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

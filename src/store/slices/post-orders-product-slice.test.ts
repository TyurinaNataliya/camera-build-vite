import { RequestStatus } from '../../const';
import { postOrderProductSlice } from './post-orders-product-slice';

describe('postOrderProductSlice', () => {
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      productOrder: [],
      productInOrderFetchingstatus: RequestStatus.Idle,
    };
    const result = postOrderProductSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

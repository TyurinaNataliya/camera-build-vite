import { RequestStatus } from '../../const';
import { postBasketCouponSlice } from './post-basket-coupon-slice';

describe('postBasketCouponSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      coupon: 'null',
      couponFetchingstatus: RequestStatus.Error,
    };

    const result = postBasketCouponSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      coupon: '',
      couponFetchingstatus: RequestStatus.Idle,
    };
    const result = postBasketCouponSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

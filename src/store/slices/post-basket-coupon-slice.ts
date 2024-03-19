import { createSlice } from '@reduxjs/toolkit';
import { removeCoupon, updateCoupon } from '../../services/token';
import { postCouponProduct } from '../../services/thunk/post-coupon-product';
import { RequestStatus } from '../../const';

type InitialState = {
  coupon: string;
  couponFetchingstatus: string;
};
const initialState: InitialState = {
  coupon: '',
  couponFetchingstatus: RequestStatus.Idle,
};

const postBasketCouponSlice = createSlice({
  name: 'CouponBasket',
  initialState,
  reducers: {
    changeCoupon(state) {
      state.coupon = '';
      removeCoupon();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponProduct.fulfilled, (state, action) => {
        let ccc = '';
        switch (action.payload.toString()) {
          case '15':
            ccc = 'camera-333';
            break;
          case '25':
            ccc = 'camera-444';
            break;

          case '35':
            ccc = 'camera-555';
            break;
        }
        state.coupon = ccc;
        updateCoupon(ccc);
      })
      .addCase(postCouponProduct.pending, (state) => {
        state.couponFetchingstatus = RequestStatus.Pending;
      })
      .addCase(postCouponProduct.rejected, (state) => {
        state.couponFetchingstatus = RequestStatus.Error;
        state.coupon = 'null';
      });
  },
});

export { postBasketCouponSlice };

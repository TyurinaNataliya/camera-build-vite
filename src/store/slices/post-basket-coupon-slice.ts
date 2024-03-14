import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  coupon: string;
};
const initialState: InitialState = {
  coupon: '',
};

const postBasketCouponSlice = createSlice({
  name: 'CouponBasket',
  initialState,
  reducers: {
    changeCoupon(state, action: PayloadAction<string>) {
      state.coupon = action.payload;
    },
  },
});

export { postBasketCouponSlice };

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postCouponProduct = createAsyncThunk<
  string,
  { basketCouponData: string },
  Thunk
>('data/fetchCouponBasket', async ({ basketCouponData }, { extra: api }) => {
  const { data } = await api.post<string>(`${ApiRoute.Coupon}`, {
    coupon: basketCouponData,
  });

  return data;
});

export { postCouponProduct };

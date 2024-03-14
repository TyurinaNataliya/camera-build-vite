import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postCouponProduct = createAsyncThunk<
  string,
  { basketCouponData: string },
  Thunk
>(`${ApiRoute.Coupon}`, async ({ basketCouponData }, { extra: api }) => {
  const { data } = await api.post<string>(
    `${ApiRoute.Coupon}`,
    basketCouponData
  );

  return data;
});

export { postCouponProduct };

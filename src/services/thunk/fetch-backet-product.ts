import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProduct } from '../../type-data/type';

const fetchBacketProductAction = createAsyncThunk<
  TypeProduct[],
  undefined,
  Thunk
>('data/fetchOrdersProducts', async (_, { extra: api }) => {
  const { data } = await api.get<TypeProduct[]>(`${ApiRoute.Orders}/orders`);

  return data;
});

export { fetchBacketProductAction };

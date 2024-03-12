import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeOrdersProduct } from '../../type-data/type';

const fetchOrdersProductAction = createAsyncThunk<
  TypeOrdersProduct[],
  undefined,
  Thunk
>('data/fetchOrdersProducts', async (_, { extra: api }) => {
  const { data } = await api.get<TypeOrdersProduct[]>(`${ApiRoute.Orders}`);

  return data;
});

export { fetchOrdersProductAction };

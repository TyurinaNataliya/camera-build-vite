import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk, TypeOrdersProduct } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postOrdersProduct = createAsyncThunk<
  TypeOrdersProduct,
  { basketData: TypeOrdersProduct },
  Thunk
>(`${ApiRoute.Orders}`, async ({ basketData }, { extra: api }) => {
  const { data } = await api.post<TypeOrdersProduct>(
    `${ApiRoute.Orders}`,
    basketData
  );

  return data;
});

export { postOrdersProduct };

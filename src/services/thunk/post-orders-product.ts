import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk, TypeOrdersProduct } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postOrdersProduct = createAsyncThunk<
  TypeOrdersProduct,
  { backetData: TypeOrdersProduct },
  Thunk
>(`${ApiRoute.Orders}`, async ({ backetData }, { extra: api }) => {
  const { data } = await api.post<TypeOrdersProduct>(
    `${ApiRoute.Orders}`,
    backetData
  );

  return data;
});

export { postOrdersProduct };

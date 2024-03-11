import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk, TypeProduct } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postBacketProduct = createAsyncThunk<
  TypeProduct,
  { backetData: TypeProduct },
  Thunk
>(`${ApiRoute.Orders}`, async ({ backetData }, { extra: api }) => {
  const { data } = await api.post<TypeProduct>(
    `${ApiRoute.Orders}`,

    backetData
  );

  return data;
});

export { postBacketProduct };

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProduct } from '../../type-data/type';

const fetchSimilarProductsAction = createAsyncThunk<
  TypeProduct[],
  number,
  Thunk
>('data/fetchSimilarProduct', async (id, { extra: api }) => {
  const { data } = await api.get<TypeProduct[]>(
    `${ApiRoute.Products}/${id}/similar`
  );

  return data;
});

export { fetchSimilarProductsAction };

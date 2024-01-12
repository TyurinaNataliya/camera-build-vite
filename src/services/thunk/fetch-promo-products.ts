import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypePromoProduct } from '../../type-data/type';

const fetchPromoProductsAction = createAsyncThunk<
  TypePromoProduct[],
  undefined,
  Thunk
>('data/fetchPromoProducts', async (_, { extra: api }) => {
  const { data } = await api.get<TypePromoProduct[]>(ApiRoute.Promo);

  return data;
});

export { fetchPromoProductsAction };

import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProduct } from '../../type-data/type';

const fetchProductsAction = createAsyncThunk<
  TypeProduct[],
  undefined | number[],
  Thunk
>('data/fetchProducts', async (params, { extra: api }) => {
  const { data } = await api.get<TypeProduct[]>(
    !params?.length
      ? ApiRoute.Products
      : `${ApiRoute.Products}?price_gte=${params[0]}&price_lte=${params[1] || 0} `
  );

  return data;
});

export { fetchProductsAction };

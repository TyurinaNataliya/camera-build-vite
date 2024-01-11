import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProduct } from '../../type-data/type';

const fetchProductsAction = createAsyncThunk<TypeProduct[], undefined, Thunk>(
  'data/fetchProducts',
  async (_, { extra: api }) => {
    const { data } = await api.get<TypeProduct[]>(ApiRoute.Products);

    return data;
  }
);

export { fetchProductsAction };

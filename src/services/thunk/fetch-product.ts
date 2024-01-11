import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProduct } from '../../type-data/type';

const fetchProductAction = createAsyncThunk<TypeProduct, number, Thunk>(
  'data/fetchProduct',
  async (id, { extra: api }) => {
    const { data } = await api.get<TypeProduct>(`${ApiRoute.Products}/${id}`);

    return data;
  }
);

export { fetchProductAction };

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TypeProduct } from '../../type-data/type';
import { fetchProductAction } from '../../services/thunk/fetch-product';

type StateProduct = {
  product: TypeProduct | null;
  error: string | null;
  loading: boolean | null;
};

const initialState: StateProduct = {
  product: null,
  error: null,
  loading: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchProductAction.fulfilled,
        (state, action: PayloadAction<TypeProduct>) => {
          state.product = action.payload;
          state.error = null;
          state.loading = false;
        }
      )
      .addCase(fetchProductAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loading = false;
      })
      .addCase(fetchProductAction.pending, (state) => {
        state.loading = true;
      });
  },
});

export { productSlice };

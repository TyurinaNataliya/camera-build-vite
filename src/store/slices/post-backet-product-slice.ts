import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';

type StateProduct = {
  product: TypeProduct | null;
  productsInBacket: TypeProduct[];
};

const initialState: StateProduct = {
  product: null,
  productsInBacket: [],
};

const postBacketProductSlice = createSlice({
  name: 'postBacketProduct',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TypeProduct>) {
      state.product = action.payload;
      state.productsInBacket = [...state.productsInBacket, action.payload];
    },
  },
});

export { postBacketProductSlice };

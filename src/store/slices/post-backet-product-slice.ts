import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';

type StateProduct = {
  product: TypeProduct | null;
  productsInBacket: TypeProduct[];

  countProducts: number;
};

const initialState: StateProduct = {
  product: null,
  productsInBacket: [],

  countProducts: 1,
};

const postBacketProductSlice = createSlice({
  name: 'postBacketProduct',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TypeProduct>) {
      state.product = action.payload;
      state.productsInBacket = [...state.productsInBacket, action.payload];
    },
    addCountProduct(state) {
      state.countProducts = state.countProducts + 1;
    },
    removeCountProduct(state) {
      state.countProducts = state.countProducts - 1;
    },
  },
});

export { postBacketProductSlice };

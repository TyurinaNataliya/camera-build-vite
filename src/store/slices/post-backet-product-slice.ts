import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';

type StateProduct = {
  productsInBacket: (TypeProduct & { cnt?: number })[];
  productsIdInBacket: number[];
};

const initialState: StateProduct = {
  productsInBacket: [],
  productsIdInBacket: [],
};

const postBacketProductSlice = createSlice({
  name: 'postBacketProduct',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TypeProduct>) {
      const foondedProduct = state.productsInBacket.find(
        (e) => e.id === action.payload.id
      );
      state.productsInBacket = [
        ...state.productsInBacket.filter((e) => e.id !== action.payload.id),
        { ...action.payload, cnt: (foondedProduct?.cnt || 0) + 1 },
      ];
    },
    removeProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBacket = state.productsInBacket.filter(
        (e) => e.id !== action.payload.id
      );
    },
    incProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBacket = state.productsInBacket.map((e) => ({
        ...e,
        cnt: e.id === action.payload.id ? (e.cnt || 0) + 1 : e.cnt,
      }));
    },
    decProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBacket = state.productsInBacket.map((e) => ({
        ...e,
        cnt: e.id === action.payload.id ? (e.cnt || 0) - 1 : e.cnt,
      }));
    },
  },
});

export { postBacketProductSlice };

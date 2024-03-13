import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';

type StateProduct = {
  productsInBasket: (TypeProduct & { cnt?: number })[];
  productsIdInBasket: number[];
};

const initialState: StateProduct = {
  productsInBasket: [],
  productsIdInBasket: [],
};

const postBasketProductSlice = createSlice({
  name: 'postBasketProduct',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TypeProduct>) {
      const foondedProduct = state.productsInBasket.find(
        (e) => e.id === action.payload.id
      );
      state.productsInBasket = [
        ...state.productsInBasket.filter((e) => e.id !== action.payload.id),
        { ...action.payload, cnt: (foondedProduct?.cnt || 0) + 1 },
      ];
    },
    removeProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.filter(
        (e) => e.id !== action.payload.id
      );
    },
    incProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.map((e) => ({
        ...e,
        cnt: e.id === action.payload.id ? (e.cnt || 0) + 1 : e.cnt,
      }));
    },
    decProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.map((e) => ({
        ...e,
        cnt: e.id === action.payload.id ? (e.cnt || 0) - 1 : e.cnt,
      }));
    },
  },
});

export { postBasketProductSlice };

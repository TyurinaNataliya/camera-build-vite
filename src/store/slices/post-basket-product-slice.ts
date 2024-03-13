import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ProductInBasket, TypeProduct } from '../../type-data/type';
import { updateProducts } from '../../services/token';

type StateProduct = {
  productsInBasket: ProductInBasket[];
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
    setProducts(state, action: PayloadAction<string>) {
      state.productsInBasket = JSON.parse(action.payload) as ProductInBasket[];
    },
    addProduct(state, action: PayloadAction<TypeProduct>) {
      const foondedProduct = state.productsInBasket.find(
        (e) => e.id === action.payload.id
      );
      state.productsInBasket = [
        ...state.productsInBasket.filter((e) => e.id !== action.payload.id),
        { ...action.payload, cnt: (foondedProduct?.cnt || 0) + 1 },
      ];
      updateProducts(JSON.stringify(state.productsInBasket));
    },
    removeProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.filter(
        (e) => e.id !== action.payload.id
      );
      updateProducts(JSON.stringify(state.productsInBasket));
    },
    incProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.map((e) => {
        if (e.id === action.payload.id) {
          return { ...e, cnt: (e.cnt || 0) + 1 };
        } else {
          return e;
        }
      });
      updateProducts(JSON.stringify(state.productsInBasket));
    },
    decProduct(state, action: PayloadAction<TypeProduct>) {
      state.productsInBasket = state.productsInBasket.map((e) => ({
        ...e,
        cnt: e.id === action.payload.id ? (e.cnt || 0) - 1 : e.cnt,
      }));
      updateProducts(JSON.stringify(state.productsInBasket));
    },
    setCountProduct(state, action: PayloadAction<ProductInBasket>) {
      state.productsInBasket = state.productsInBasket.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
      updateProducts(JSON.stringify(state.productsInBasket));
    },
  },
});

export { postBasketProductSlice };

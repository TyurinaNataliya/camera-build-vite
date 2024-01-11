import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/product-slice';
import { createAPI } from '../services/api';
import { productsSlice } from './slices/products-slice';

const reducer = combineReducers({
  [productSlice.name]: productSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
});

const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { store, reducer };

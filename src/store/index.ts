import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/product-slice';
import { createAPI } from '../services/api';
import { productsSlice } from './slices/products-slice';
import { promoProductsSlice } from './slices/promo-products-slice';
import { similarProductsSlice } from './slices/similar-products-slice';
import { reviewsProductSlice } from './slices/reviews-product-slice';
import { SortingTypeProductSlice } from './slices/sorting-product-slice';

const reducer = combineReducers({
  [productSlice.name]: productSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [promoProductsSlice.name]: promoProductsSlice.reducer,
  [similarProductsSlice.name]: similarProductsSlice.reducer,
  [reviewsProductSlice.name]: reviewsProductSlice.reducer,
  [SortingTypeProductSlice.name]: SortingTypeProductSlice.reducer,
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

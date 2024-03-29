import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productSlice } from './slices/product-slice';
import { createAPI } from '../services/api';
import { productsSlice } from './slices/products-slice';
import { promoProductsSlice } from './slices/promo-products-slice';
import { similarProductsSlice } from './slices/similar-products-slice';
import { reviewsProductSlice } from './slices/reviews-product-slice';
import { SortingTypeProductSlice } from './slices/sorting-type-product-slice';
import { SortingAscendingDescendingSlice } from './slices/sorting-ascending-descending-slice';
import { FiltrationCategorySlice } from './slices/filtration-category-slice';
import { FiltrationTypeCamerasSlice } from './slices/filtration-type-cameras-slice';
import { FiltrationLevelSlice } from './slices/filtration-level-slice';
import { FiltrationPriceSlice } from './slices/filtration-price-slice';
import { PaginationSlice } from './slices/pagination-slice';

import { postBasketProductSlice } from './slices/post-basket-product-slice';
import { postBasketCouponSlice } from './slices/post-basket-coupon-slice';
import { postOrderProductSlice } from './slices/post-orders-product-slice';

const reducer = combineReducers({
  [productSlice.name]: productSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [promoProductsSlice.name]: promoProductsSlice.reducer,
  [similarProductsSlice.name]: similarProductsSlice.reducer,
  [reviewsProductSlice.name]: reviewsProductSlice.reducer,
  [SortingTypeProductSlice.name]: SortingTypeProductSlice.reducer,
  [SortingAscendingDescendingSlice.name]:
    SortingAscendingDescendingSlice.reducer,
  [FiltrationCategorySlice.name]: FiltrationCategorySlice.reducer,
  [FiltrationTypeCamerasSlice.name]: FiltrationTypeCamerasSlice.reducer,
  [FiltrationLevelSlice.name]: FiltrationLevelSlice.reducer,
  [FiltrationPriceSlice.name]: FiltrationPriceSlice.reducer,
  [PaginationSlice.name]: PaginationSlice.reducer,
  [postOrderProductSlice.name]: postOrderProductSlice.reducer,
  [postBasketProductSlice.name]: postBasketProductSlice.reducer,
  [postBasketCouponSlice.name]: postBasketCouponSlice.reducer,
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

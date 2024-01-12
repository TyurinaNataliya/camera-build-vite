import { createSlice } from '@reduxjs/toolkit';

import { TypePromoProduct } from '../../type-data/type';
import { RequestStatus } from '../../const';
import { fetchPromoProductsAction } from '../../services/thunk/fetch-promo-products';

type StatePromoProducts = {
  promoProducts: TypePromoProduct[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
};

const initialState: StatePromoProducts = {
  promoProducts: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
};

const promoProductsSlice = createSlice({
  name: 'promoProducts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoProductsAction.fulfilled, (state, action) => {
        state.promoProducts = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchPromoProductsAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchPromoProductsAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export { promoProductsSlice };

import { createSlice } from '@reduxjs/toolkit';
import { TypeOrdersProduct } from '../../type-data/type';
import { RequestStatus } from '../../const';
import { fetchOrdersProductAction } from '../../services/thunk/fetch-orders-product';

type StateProducts = {
  productInOrder: TypeOrdersProduct[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
};

const initialState: StateProducts = {
  productInOrder: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
};

const BasketProductSlice = createSlice({
  name: 'productInOrder',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrdersProductAction.fulfilled, (state, action) => {
        state.productInOrder = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchOrdersProductAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOrdersProductAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export { BasketProductSlice };

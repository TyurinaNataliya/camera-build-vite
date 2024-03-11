import { createSlice } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';
import { RequestStatus } from '../../const';
import { fetchBacketProductAction } from '../../services/thunk/fetch-backet-product';

type StateProducts = {
  productInBasket: TypeProduct[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
};

const initialState: StateProducts = {
  productInBasket: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
};

const BacketProductSlice = createSlice({
  name: 'productInBasket',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBacketProductAction.fulfilled, (state, action) => {
        state.productInBasket = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchBacketProductAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchBacketProductAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export { BacketProductSlice };

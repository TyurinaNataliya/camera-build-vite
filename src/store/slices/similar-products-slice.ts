import { createSlice } from '@reduxjs/toolkit';
import { TypeProduct } from '../../type-data/type';
import { RequestStatus } from '../../const';
import { fetchSimilarProductsAction } from '../../services/thunk/fetch-similar-products';

type StateProducts = {
  similarProducts: TypeProduct[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
};

const initialState: StateProducts = {
  similarProducts: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
};

const similarProductsSlice = createSlice({
  name: 'similarProducts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchSimilarProductsAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchSimilarProductsAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export { similarProductsSlice };

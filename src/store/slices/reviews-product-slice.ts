import { createSlice } from '@reduxjs/toolkit';
import { TypeProductReview } from '../../type-data/type';
import { RequestStatus } from '../../const';
import { fetchReviewsProductAction } from '../../services/thunk/fetch-reviews-product';

type StateProducts = {
  reviewsProduct: TypeProductReview[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
};

const initialState: StateProducts = {
  reviewsProduct: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
};

const reviewsProductSlice = createSlice({
  name: 'reviewsProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsProductAction.fulfilled, (state, action) => {
        state.reviewsProduct = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchReviewsProductAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchReviewsProductAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export { reviewsProductSlice };

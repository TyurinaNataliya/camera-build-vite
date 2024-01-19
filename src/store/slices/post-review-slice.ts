import { createSlice } from '@reduxjs/toolkit';
import { TypeProductReview } from '../../type-data/type';
import { postReviewProduct } from '../../services/thunk/post-review-product';
import { RequestStatus } from '../../const';

type StateProduct = {
  reviews: TypeProductReview[];
  reviewsFetchingstatus: string;
};

const initialState: StateProduct = {
  reviews: [],
  reviewsFetchingstatus: RequestStatus.Idle,
};

const productSlice = createSlice({
  name: 'postReviewProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postReviewProduct.pending, (state) => {
        state.reviewsFetchingstatus = RequestStatus.Pending;
      })
      .addCase(postReviewProduct.fulfilled, (state, action) => {
        state.reviewsFetchingstatus = RequestStatus.Success;
        state.reviews.push(action.payload);
      })
      .addCase(postReviewProduct.rejected, (state) => {
        state.reviewsFetchingstatus = RequestStatus.Error;
      });
  },
});

export { productSlice };

import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { postBacketProduct } from '../../services/thunk/post-backet-product';
import { TypeProduct } from '../../type-data/type';

type StateProduct = {
  productInBacket: TypeProduct[];
  productInBacketFetchingstatus: string;
};

const initialState: StateProduct = {
  productInBacket: [],
  productInBacketFetchingstatus: RequestStatus.Idle,
};

const postBacketProductSlice = createSlice({
  name: 'postBacketProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postBacketProduct.pending, (state) => {
        state.productInBacketFetchingstatus = RequestStatus.Pending;
      })
      .addCase(postBacketProduct.fulfilled, (state, action) => {
        state.productInBacketFetchingstatus = RequestStatus.Success;
        state.productInBacket.push(action.payload);
      })
      .addCase(postBacketProduct.rejected, (state) => {
        state.productInBacketFetchingstatus = RequestStatus.Error;
      });
  },
});

export { postBacketProductSlice };

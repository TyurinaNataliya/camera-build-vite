import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { postOrdersProduct } from '../../services/thunk/post-orders-product';
import { TypeOrdersProduct } from '../../type-data/type';

type StateProduct = {
  productOrder: TypeOrdersProduct[];
  productInOrderFetchingstatus: string;
};

const initialState: StateProduct = {
  productOrder: [],
  productInOrderFetchingstatus: RequestStatus.Idle,
};

const postOrderProductSlice = createSlice({
  name: 'postOrdersProduct',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrdersProduct.pending, (state) => {
        state.productInOrderFetchingstatus = RequestStatus.Pending;
      })
      .addCase(postOrdersProduct.fulfilled, (state, action) => {
        state.productInOrderFetchingstatus = RequestStatus.Success;
        state.productOrder.push(action.payload);
      })
      .addCase(postOrdersProduct.rejected, (state) => {
        state.productInOrderFetchingstatus = RequestStatus.Error;
      });
  },
});

export { postOrderProductSlice };

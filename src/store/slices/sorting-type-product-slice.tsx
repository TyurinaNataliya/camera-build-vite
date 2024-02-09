import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  type: string;
};
const initialState: InitialState = {
  type: 'sortPrice',
};

const SortingTypeProductSlice = createSlice({
  name: 'sortingType',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },
});

export { SortingTypeProductSlice };

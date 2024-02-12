import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  type: string;
};
const initialState: InitialState = {
  type: '',
};

const SortingAscendingDescendingSlice = createSlice({
  name: 'sortingAscendingDescending',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.type = action.payload;
    },
  },
});

export { SortingAscendingDescendingSlice };

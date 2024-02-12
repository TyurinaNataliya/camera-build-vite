import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  category: string;
};
const initialState: InitialState = {
  category: '',
};

const FiltrationCategorySlice = createSlice({
  name: 'categoryFilter',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
  },
});

export { FiltrationCategorySlice };

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  currentPage: string;
};
const initialState: InitialState = {
  currentPage: '1',
};

const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<string>) {
      state.currentPage = action.payload;
    },
  },
});

export { PaginationSlice };

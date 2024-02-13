import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  level: string;
};
const initialState: InitialState = {
  level: '',
};

const FiltrationLevelSlice = createSlice({
  name: 'levelFilter',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.level = action.payload;
    },
  },
});

export { FiltrationLevelSlice };

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  typeCameras: string;
};
const initialState: InitialState = {
  typeCameras: '',
};

const FiltrationTypeCamerasSlice = createSlice({
  name: 'typeCamerasFilter',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<string>) {
      state.typeCameras = action.payload;
    },
  },
});

export { FiltrationTypeCamerasSlice };

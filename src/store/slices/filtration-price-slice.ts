import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  priceFrom: string;
  priceTo: string;
};
const initialState: InitialState = {
  priceFrom: '',
  priceTo: '',
};

const FiltrationPriceSlice = createSlice({
  name: 'priceFilter',
  initialState,
  reducers: {
    changeFrom(state, action: PayloadAction<string>) {
      state.priceFrom = action.payload;
    },
    changeTo(state, action: PayloadAction<string>) {
      state.priceTo = action.payload;
    },
  },
});

export { FiltrationPriceSlice };

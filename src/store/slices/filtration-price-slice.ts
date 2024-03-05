import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  priceFrom: string;
  priceTo: string;
  maxPrice: string;
  minPrice: string;
};
const initialState: InitialState = {
  priceFrom: '',
  priceTo: '',
  maxPrice: '',
  minPrice: '',
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
    changeMaxPrice(state, action: PayloadAction<string>) {
      state.maxPrice = action.payload;
    },
    changeMinPrice(state, action: PayloadAction<string>) {
      state.minPrice = action.payload;
    },
  },
});

export { FiltrationPriceSlice };

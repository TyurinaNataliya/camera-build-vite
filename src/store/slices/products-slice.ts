import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { TypeProduct } from '../../type-data/type';
import { RequestStatus } from '../../const';
import type { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

type StateProducts = {
  products: TypeProduct[] | null;
  loadingStatus: boolean | null;
  error: null | string;
  fetchingStatus: string;
  changeType: TypeProduct[];
  typeProductsSorting: TypeProduct[];
  changeAscendingDescending: TypeProduct[];
  typeAscendingDescending: TypeProduct[];
  categoryFiltraton: TypeProduct[];
  typeCamerasFiltration: TypeProduct[];
  levelFiltration: TypeProduct[];
  priceFiltration: TypeProduct[];
  pagination: string;
  priceFrom: string;
  priceTo: string;
  productsIBasket: TypeProduct[] | null;
};

const initialState: StateProducts = {
  products: null,
  loadingStatus: null,
  error: null,
  fetchingStatus: RequestStatus.Idle,
  changeType: [],
  typeProductsSorting: [],
  changeAscendingDescending: [],
  typeAscendingDescending: [],
  categoryFiltraton: [],
  typeCamerasFiltration: [],
  levelFiltration: [],
  priceFiltration: [],
  pagination: '1',
  priceFrom: '',
  priceTo: '',
  productsIBasket: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeType(state, action: PayloadAction<TypeProduct[]>) {
      state.changeType = action.payload;
    },
    addPagination(state, action: PayloadAction<string>) {
      state.pagination = action.payload;
    },
    addPriceFrom(state, action: PayloadAction<string>) {
      state.priceFrom = action.payload;
    },
    addPriceTo(state, action: PayloadAction<string>) {
      state.priceTo = action.payload;
    },
    addTypeProductsSorting(state, action: PayloadAction<TypeProduct[]>) {
      state.typeProductsSorting = action.payload;
    },
    changeAscendingDescending(state, action: PayloadAction<TypeProduct[]>) {
      state.changeAscendingDescending = action.payload;
    },
    addAscendingDescendingProductsSorting(
      state,
      action: PayloadAction<TypeProduct[]>
    ) {
      state.typeAscendingDescending = action.payload;
    },
    addPriceFromProductsFiltration(
      state,
      action: PayloadAction<TypeProduct[]>
    ) {
      state.priceFiltration = action.payload;
    },
    addCategoryProductsFiltration(state, action: PayloadAction<TypeProduct[]>) {
      state.categoryFiltraton = action.payload;
    },
    addTypeCamerasFilter(state, action: PayloadAction<TypeProduct[]>) {
      state.typeCamerasFiltration = action.payload;
    },
    addLevelFilter(state, action: PayloadAction<TypeProduct[]>) {
      state.levelFiltration = action.payload;
    },
    addProductInBasket(state, action: PayloadAction<TypeProduct[]>) {
      state.productsIBasket = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loadingStatus = false;
        state.error = null;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.loadingStatus = true;
        state.error = null;
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchProductsAction.rejected, (state, action) => {
        state.error = action.error.message || 'Unknown error';
        state.loadingStatus = false;
        state.fetchingStatus = RequestStatus.Error;
        toast.error<string>('Не удалось загрузить данные с сервера!');
      });
  },
});

export { productsSlice };

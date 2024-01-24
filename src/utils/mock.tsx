import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { State } from '../hooks/store';
import { createAPI } from '../services/api';

export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  product: { product },
  products: { products },
  promoProducts: { promoProducts },
  reviewsProduct: { reviewsProduct },
  similarProducts: { similarProducts },
  ...(initialState ?? {}),
});

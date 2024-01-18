import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiRoute } from '../../const';
import { Thunk, TypeProductReview } from '../../type-data/type';

const fetchReviewsProductAction = createAsyncThunk<
  TypeProductReview[],
  number,
  Thunk
>('data/fetchReviewsProduct', async (id, { extra: api }) => {
  const { data } = await api.get<TypeProductReview[]>(
    `${ApiRoute.Products}/${id}/reviews`
  );

  return data;
});

export { fetchReviewsProductAction };

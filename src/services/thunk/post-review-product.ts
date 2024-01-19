import { createAsyncThunk } from '@reduxjs/toolkit';

import { Thunk, TypeProductReview } from '../../type-data/type';
import { ApiRoute } from '../../const';

const postReviewProduct = createAsyncThunk<
  TypeProductReview,
  { reviewData: TypeProductReview; productId: number },
  Thunk
>(`${ApiRoute.Reviews}`, async ({ reviewData }, { extra: api }) => {
  const { data } = await api.post<TypeProductReview>(
    `${ApiRoute.Reviews}`,

    reviewData
  );

  return data;
});

export { postReviewProduct };

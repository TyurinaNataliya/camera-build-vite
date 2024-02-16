import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { ProductReviewsList } from './product-reviews-list';
import { MockReview } from '../../../type-data/mock';

describe('Component:componentProductReviewsList', () => {
  it('should render correctly', () => {
    const ComponentProductReviewsListTextId = 'componentProductReviewsList';

    const preparedComponent = withHistory(
      <ProductReviewsList limitReviews={3} reviews={MockReview} />
    );

    render(preparedComponent);

    expect(
      screen.getByTestId(ComponentProductReviewsListTextId)
    ).toBeInTheDocument();
  });
});

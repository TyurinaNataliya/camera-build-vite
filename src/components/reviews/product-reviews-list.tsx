import { TypeProductReview } from '../../type-data/type';
import { ReviewCard } from './review-card';

type Props = {
  reviews: TypeProductReview[];
  limitReviews: number;
};

function ProductReviewsList({ reviews, limitReviews }: Props): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.slice(0, limitReviews).map((review) => (
        <ReviewCard reviewProduct={review} key={review.id} />
      ))}
    </ul>
  );
}

export { ProductReviewsList };

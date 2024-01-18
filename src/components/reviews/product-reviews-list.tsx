import { TypeProductReview } from '../../type-data/type';
import { ReviewCard } from './review-card';

type Props = {
  reviews: TypeProductReview[];
};

function ProductReviewsList({ reviews }: Props): JSX.Element {
  return (
    <ul className="review-block__list">
      {reviews.map((review) => (
        <ReviewCard reviewProduct={review} key={review.id} />
      ))}
    </ul>
  );
}

export { ProductReviewsList };

import { render, screen } from '@testing-library/react';
import { ModalReviewSuccess } from './modal-review-success';
import { withHistory } from '../../../utils/mock-component';

describe('Component:ModalReviewSuccess', () => {
  it('should render correctly', () => {
    const ModalReviewSuccessText = /Спасибо за отзыв/i;
    const ModalReviewSuccessTextId = 'modal-review-success';

    const preparedComponent = withHistory(<ModalReviewSuccess idProduct={1} />);

    render(preparedComponent);

    expect(screen.getByText(ModalReviewSuccessText)).toBeInTheDocument();
    expect(screen.getByTestId(ModalReviewSuccessTextId)).toBeInTheDocument();
  });
});

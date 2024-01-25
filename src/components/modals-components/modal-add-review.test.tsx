import { render, screen } from '@testing-library/react';
import { ModalAddReview } from './modal-add-review';
import { withHistory, withStore } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';

describe('Component:ModalAddReview', () => {
  it('should render correctly', async () => {
    const modalAddReviewText = /Оставить отзыв/i;
    const modalAddReviewUserNameId = 'user-name';
    const modalAddReviewUserAdvantagesProduct = 'user-advantages-product';
    const expectUserNameValue = 'наталья';
    const expectUserAdvantagesProductValue = 'хорошая камера';

    const { withStoreComponent } = withStore(
      <ModalAddReview idProduct={1} />,
      {}
    );
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(modalAddReviewUserNameId),
      expectUserNameValue
    );
    await userEvent.type(
      screen.getByTestId(modalAddReviewUserAdvantagesProduct),
      expectUserAdvantagesProductValue
    );

    expect(screen.getByDisplayValue(expectUserNameValue)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(expectUserAdvantagesProductValue)
    ).toBeInTheDocument();

    expect(screen.getByText(modalAddReviewText)).toBeInTheDocument();
  });
});

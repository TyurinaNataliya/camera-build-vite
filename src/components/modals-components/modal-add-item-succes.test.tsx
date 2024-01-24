import { render, screen } from '@testing-library/react';
import { ModalAddItemSuccess } from './modal-add-item-success';

describe('Component:ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedText = /Товар успешно добавлен в корзину/i;

    render(
      <ModalAddItemSuccess
        handleCloseModalSuccess={handleCloseModalSuccess}
        id={1}
      />
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { ModalAddItemSuccess } from './modal-add-item-success';
import { withHistory } from '../../../utils/mock-component';

describe('Component:ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedText = /Товар успешно добавлен в корзину/i;
    const expectedTextId = 'modal-add-item-success';

    const preparedComponent = withHistory(<ModalAddItemSuccess />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedTextId)).toBeInTheDocument();
  });
});

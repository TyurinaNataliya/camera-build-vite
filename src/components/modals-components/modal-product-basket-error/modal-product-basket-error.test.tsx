import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { ModalProductBasketError } from './modal-product-basket-error';

describe('Component:ModalProductBasketError', () => {
  it('should render correctly', () => {
    const ModalProductBasketErrorText = /Что-то пошло не так/i;
    const ModalProductBasketErrorId = 'modal-product-basket-error';

    const preparedComponent = withHistory(<ModalProductBasketError />);

    render(preparedComponent);

    expect(screen.getByText(ModalProductBasketErrorText)).toBeInTheDocument();
    expect(screen.getByTestId(ModalProductBasketErrorId)).toBeInTheDocument();
  });
});

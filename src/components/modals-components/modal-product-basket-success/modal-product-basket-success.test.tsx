import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { ModalProductBasketSucces } from './modal-product-basket-success';

describe('Component:ModalProductBasketSucces', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const ModalProductBasketSuccesText = /Спасибо за покупку/i;
    const ModalProductBasketSuccesId = 'modal-product-basket-success';

    const { withStoreComponent } = withStore(<ModalProductBasketSucces />);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);
    render(preparedComponent);

    expect(screen.getByText(ModalProductBasketSuccesText)).toBeInTheDocument();
    expect(screen.getByTestId(ModalProductBasketSuccesId)).toBeInTheDocument();
  });
});

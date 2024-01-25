import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { ModalCatalogAddItem } from './modal-catalog-add-item';
import { makeFakeProduct } from '../../utils/mock';

describe('Component:ModalCatalogAddItem', () => {
  it('should render correctly', () => {
    const ModalCatalogAddItemText = /Добавить товар в корзину/i;
    const ModalCatalogAddItemTextId = 'modal-catalog-add-item';

    const preparedComponent = withHistory(
      <ModalCatalogAddItem product={makeFakeProduct} />
    );

    render(preparedComponent);

    expect(screen.getByText(ModalCatalogAddItemText)).toBeInTheDocument();
    expect(screen.getByTestId(ModalCatalogAddItemTextId)).toBeInTheDocument();
  });
});

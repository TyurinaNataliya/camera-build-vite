import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';

import { makeFakeProducts } from '../../utils/mock';
import { ProductCardsList } from './products-carts-list';
import { createMemoryHistory } from 'history';

describe('Component:ProductCardsListInBascet', () => {
  it('should render correctly', () => {
    const ProductCardListTextId = 'product-cards-list';
    const mockHistory = createMemoryHistory();

    const { withStoreComponent } = withStore(
      <ProductCardsList products={makeFakeProducts} loading />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(ProductCardListTextId)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';

import { ProductCardInCatalog } from './product-card-in-catalog';
import { makeFakeProduct } from '../../utils/mock';
import { createMemoryHistory } from 'history';

describe('Component:ProductCardInBasket', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const ProductCardInCatalogTextId = 'product-card-in-catalog';

    const { withStoreComponent } = withStore(
      <ProductCardInCatalog product={makeFakeProduct} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(ProductCardInCatalogTextId)).toBeInTheDocument();
  });
});

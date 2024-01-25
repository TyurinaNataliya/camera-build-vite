import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { ProductCard } from './product-card';
import { makeFakeProduct } from '../../utils/mock';

describe('Component:ProductCard', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const PagePaginationTextId = 'product-card';
    const PagePaginationText = /Характеристики/i;

    const { withStoreComponent } = withStore(
      <ProductCard product={makeFakeProduct} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(PagePaginationTextId)).toBeInTheDocument();
    expect(screen.getByText(PagePaginationText)).toBeInTheDocument();
  });
});

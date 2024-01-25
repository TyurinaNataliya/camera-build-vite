import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { ProductContainer } from './pages-product-container';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component:ProductContainer', () => {
  const mockHistory = createMemoryHistory();
  beforeEach(() => {
    mockHistory.push(AppRoute.Product);
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<ProductContainer />);
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    const ProductContainerTextId = 'product-container';

    render(preparedComponent);

    expect(screen.getByTestId(ProductContainerTextId)).toBeInTheDocument();
  });
});

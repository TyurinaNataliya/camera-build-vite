import { render, screen } from '@testing-library/react';
import { FilterProductsContainer } from './filter-products-container';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../const';

describe('Component:FilterProductsContainer', () => {
  const mockHistory = createMemoryHistory();
  beforeEach(() => {
    mockHistory.push(AppRoute.Catalog);
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(
      <FilterProductsContainer />
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    const ComponentFilterProductsContainerTextId =
      'componentFilterProductsContainer';
    const ComponentFilterProductsContainerText = /Сбросить фильтры/i;

    render(preparedComponent);
    expect(
      screen.getByTestId(ComponentFilterProductsContainerTextId)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ComponentFilterProductsContainerText)
    ).toBeInTheDocument();
  });
});

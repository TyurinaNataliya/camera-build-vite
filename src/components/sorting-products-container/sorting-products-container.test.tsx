import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { SortingProductsContainer } from './sorting-products-container';

describe('Component:SortingProductsContainer', () => {
  it('should render correctly', () => {
    const ComponentSortingProductsContainerTextId =
      'componentSortingProductsContainer';
    const ComponentSortingProductsContainerText = /Сортировать/i;

    const preparedComponent = withHistory(<SortingProductsContainer />);

    render(preparedComponent);

    expect(
      screen.getByTestId(ComponentSortingProductsContainerTextId)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ComponentSortingProductsContainerText)
    ).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { FilterProductsContainer } from './filter-products-container';
import { withHistory } from '../../utils/mock-component';

describe('Component:componentFilterProductsContainer', () => {
  it('should render correctly', () => {
    const ComponentFilterProductsContainerTextId =
      'componentFilterProductsContainer';
    const ComponentFilterProductsContainerText = /Сбросить фильтры/i;

    const preparedComponent = withHistory(<FilterProductsContainer />);

    render(preparedComponent);

    expect(
      screen.getByTestId(ComponentFilterProductsContainerTextId)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ComponentFilterProductsContainerText)
    ).toBeInTheDocument();
  });
});

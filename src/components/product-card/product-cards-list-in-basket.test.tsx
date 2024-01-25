import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';

import { ProductCardListInBasket } from './product-cards-list-in-basket';
import { makeFakeProducts } from '../../utils/mock';

describe('Component:ProductCardsListInBascet', () => {
  it('should render correctly', () => {
    const ProductCardListInBasketTextId = 'product-cards-list-in-basket';

    const preparedComponent = withHistory(
      <ProductCardListInBasket products={makeFakeProducts} />
    );

    render(preparedComponent);

    expect(
      screen.getByTestId(ProductCardListInBasketTextId)
    ).toBeInTheDocument();
  });
});

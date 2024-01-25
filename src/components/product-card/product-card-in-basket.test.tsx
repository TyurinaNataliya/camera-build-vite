import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { ProductCardInBasket } from './product-card-in-basket';
import { makeFakeProduct } from '../../utils/mock';

describe('Component:ProductCardInBasket', () => {
  it('should render correctly', () => {
    const ProductCardInBasketTextId = 'product-card-in-basket';

    const preparedComponent = withHistory(
      <ProductCardInBasket product={makeFakeProduct} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(ProductCardInBasketTextId)).toBeInTheDocument();
  });
});

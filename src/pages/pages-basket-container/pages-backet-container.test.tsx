import { render, screen } from '@testing-library/react';
import { BasketContainer } from './pages-basket-container';
import { withHistory } from '../../utils/mock-component';

describe('Component:BasketContainer', () => {
  it('should render correctly', () => {
    const BasketContainerTextId = 'basket-container';

    const preparedComponent = withHistory(<BasketContainer />);

    render(preparedComponent);

    expect(screen.getByTestId(BasketContainerTextId)).toBeInTheDocument();
  });
});

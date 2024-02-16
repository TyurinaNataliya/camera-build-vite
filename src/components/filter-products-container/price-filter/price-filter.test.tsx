import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { PriceFilter } from './price-filter';

describe('Component:componentPrice', () => {
  it('should render correctly', () => {
    const ComponentPriceTextId = 'componentPrice';

    const preparedComponent = withHistory(<PriceFilter />);

    render(preparedComponent);

    expect(screen.getByTestId(ComponentPriceTextId)).toBeInTheDocument();
  });
});

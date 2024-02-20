import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { PriceFilter } from './price-filter';
import { MockProducts } from '../../../type-data/mock';

describe('Component:Price', () => {
  it('should render correctly', () => {
    const ComponentPriceTextId = 'componentPrice';

    const preparedComponent = withHistory(
      <PriceFilter filteredProducts={MockProducts} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(ComponentPriceTextId)).toBeInTheDocument();
  });
});

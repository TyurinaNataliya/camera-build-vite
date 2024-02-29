import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { PriceFilter } from './price-filter';


describe('Component:Price', () => {
  it('should render correctly', () => {
    const ComponentPriceTextId = 'componentPrice';

    const preparedComponent = withHistory(
      <PriceFilter maxPriceProduct={199000} minPriceProduct={1990} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(ComponentPriceTextId)).toBeInTheDocument();
  });
});

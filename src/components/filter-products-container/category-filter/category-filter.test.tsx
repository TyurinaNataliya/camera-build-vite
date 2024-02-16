import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { CategoryFilter } from './category-filter';

describe('Component:Catоgiry', () => {
  it('should render correctly', () => {
    const ComponentCategiryTextId = 'componentCategоry';

    const preparedComponent = withHistory(<CategoryFilter />);

    render(preparedComponent);

    expect(screen.getByTestId(ComponentCategiryTextId)).toBeInTheDocument();
  });
});

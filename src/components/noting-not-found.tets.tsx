import { render, screen } from '@testing-library/react';
import { NotingNotFound } from './noting-not-found';

describe('Component:NotingNotFound', () => {
  it('should render correctly', () => {
    const expectedText = /по вашему запросу/i;

    render(<NotingNotFound />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

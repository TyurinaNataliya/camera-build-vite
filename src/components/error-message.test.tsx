import { render, screen } from '@testing-library/react';
import { ErrorMessage } from './error-message';

describe('Component:ErrorMessage', () => {
  it('should render correctly', () => {
    const expectedText = /Наши разработчики уже решают эту проблему/i;

    render(<ErrorMessage />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

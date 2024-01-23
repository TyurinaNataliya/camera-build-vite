import { render, screen } from '@testing-library/react';
import { Header } from './header';

describe('Component:Header', () => {
  it('should render correct', () => {
    const headerTestId = 'header-container';

    render(<Header />);

    expect(screen.getByTestId(headerTestId)).toBeInTheDocument();
  });
});

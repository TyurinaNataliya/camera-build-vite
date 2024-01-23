import { render, screen } from '@testing-library/react';
import { LoadingComponent } from './loading';

describe('Component:Loading', () => {
  it('should render correctly', () => {
    const expectedText = /Загружаю/i;

    render(<LoadingComponent />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { Header } from './header';
import { withHistory } from '../../utils/mock-component';

describe('Component:Header', () => {
  it('should render correct', () => {
    const headertext = 'О компании';
    const headerPlaceholder = 'Поиск по сайту';
    const headerTextId = 'header-container';

    const preparedComponent = withHistory(<Header />);

    render(preparedComponent);

    expect(screen.getByText(headertext)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(headerPlaceholder)).toBeInTheDocument();
    expect(screen.getByTestId(headerTextId)).toBeInTheDocument();
  });
});

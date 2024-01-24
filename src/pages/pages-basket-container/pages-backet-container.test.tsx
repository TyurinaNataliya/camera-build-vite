import { render, screen } from '@testing-library/react';
import { BacketContainer } from './pages-basket-container';
import { withHistory } from '../../utils/mock-component';

describe('Component:BacketContainer', () => {
  it('should render correctly', () => {
    const BacketContainerPlaceholder = 'Введите промокод';
    const BacketContainerTextId = 'backet-container';

    const preparedComponent = withHistory(<BacketContainer />);

    render(preparedComponent);

    expect(
      screen.getByPlaceholderText(BacketContainerPlaceholder)
    ).toBeInTheDocument();
    expect(screen.getByTestId(BacketContainerTextId)).toBeInTheDocument();
  });
});

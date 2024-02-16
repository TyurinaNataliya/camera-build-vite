import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { ButtonSortingUpDown } from './button-sorting-up-down';

describe('Component:btnSortingUpDown', () => {
  it('should render correctly', () => {
    const btnSortingUpDownTextId = 'btnSortingUpDown';

    const preparedComponent = withHistory(
      <ButtonSortingUpDown index={1} type="up" />
    );

    render(preparedComponent);

    expect(screen.getByTestId(btnSortingUpDownTextId)).toBeInTheDocument();
  });
});

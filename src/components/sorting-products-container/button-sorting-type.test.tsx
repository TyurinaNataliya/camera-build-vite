import { render, screen } from '@testing-library/react';
import { ButtonSortingType } from './button-sorting-type';
import { withHistory } from '../../utils/mock-component';

describe('Component:btnSortingType', () => {
  it('should render correctly', () => {
    const btnSortingTypeTextId = 'btnSortingType';

    const preparedComponent = withHistory(
      <ButtonSortingType index={1} type={'sortPrice'} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(btnSortingTypeTextId)).toBeInTheDocument();
  });
});

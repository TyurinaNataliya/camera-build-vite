import { render, screen } from '@testing-library/react';
import { ButtonCategoryFilter } from './button-category-filter';
import { withHistory } from '../../../utils/mock-component';

describe('Component:btnCategiry', () => {
  it('should render correctly', () => {
    const btnCategiryTextId = 'btnCategiry';

    const preparedComponent = withHistory(
      <ButtonCategoryFilter category={'Фотоаппарат'} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(btnCategiryTextId)).toBeInTheDocument();
  });
});

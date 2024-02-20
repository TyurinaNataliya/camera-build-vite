import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { PaginationPagesNumbers } from './pagination-pages-numbers';

describe('Component:PaginationPagesNumbers', () => {
  it('should render correctly', () => {
    const paginationPagesNumbersTextId = 'pagination-pages-numbers';

    const preparedComponent = withHistory(
      <PaginationPagesNumbers maxPage={6} />
    );

    render(preparedComponent);

    expect(
      screen.getByTestId(paginationPagesNumbersTextId)
    ).toBeInTheDocument();
  });
});

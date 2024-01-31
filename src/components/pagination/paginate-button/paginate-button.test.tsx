import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { PaginateButton } from './paginate-button';

describe('Component:Paginate-button', () => {
  it('should render correctly', () => {
    const paginateButtonTextId = 'paginate-button';

    const preparedComponent = withHistory(
      <PaginateButton currentPage={2} title="назад" />
    );

    render(preparedComponent);

    expect(screen.getByTestId(paginateButtonTextId)).toBeInTheDocument();
  });
});

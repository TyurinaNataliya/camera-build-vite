import { render, screen } from '@testing-library/react';
import { makeFakeProducts } from '../../utils/mock';
import { PagePagination } from './page-pagination';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';

describe('Component:PagePagination', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const PagePaginationTextId = 'page=pagination';

    const { withStoreComponent } = withStore(
      <PagePagination productsCameras={makeFakeProducts} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(PagePaginationTextId)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { makeFakeProducts } from '../../../utils/mock';
import { PagePagination } from './page-pagination';
import { withHistory, withStore } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { TypeProduct } from '../../../type-data/type';

describe('Component:PagePagination', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const PagePaginationTextId = 'page=pagination';

    const { withStoreComponent } = withStore(
      <PagePagination productsCameras={makeFakeProducts as TypeProduct[]} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(PagePaginationTextId)).toBeInTheDocument();
  });
});

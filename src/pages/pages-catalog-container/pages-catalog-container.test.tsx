import { render, screen } from '@testing-library/react';

import { withHistory, withStore } from '../../utils/mock-component';
import { CatalogContainer } from './pages-catalog-container';
import { makeFakeProducts } from '../../utils/mock';

describe('Component:CatalogContainer', () => {
  it('should render correctly', () => {
    const CatalogContainerTextId = 'catalog-container';
    const CatalogContainerText = 'Каталог фото- и видеотехники';

    const preparedComponent = withHistory(<CatalogContainer />);

    const { withStoreComponent } = withStore(preparedComponent);

    render(withStoreComponent);

    expect(screen.getByTestId(CatalogContainerTextId)).toBeInTheDocument();
    expect(screen.getByText(CatalogContainerText)).toBeInTheDocument();
  });
});

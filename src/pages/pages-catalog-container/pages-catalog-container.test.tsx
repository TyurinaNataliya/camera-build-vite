// import { render, screen } from '@testing-library/react';

// import { withHistory, withStore } from '../../utils/mock-component';
// import { CatalogContainer } from './pages-catalog-container';

// import { createMemoryHistory } from 'history';
// import { AppRoute } from '../../const';

// describe('Component:CatalogContainer', () => {
//   const mockHistory = createMemoryHistory();
//   beforeEach(() => {
//     mockHistory.push(AppRoute.Catalog);
//   });

//   it('should render correctly', () => {
//     const { withStoreComponent } = withStore(<CatalogContainer />);
//     const preparedComponent = withHistory(withStoreComponent, mockHistory);

//     const CatalogContainerTextId = 'catalog-container';

//     render(preparedComponent);

//     expect(screen.getByTestId(CatalogContainerTextId)).toBeInTheDocument();
//   });
// });

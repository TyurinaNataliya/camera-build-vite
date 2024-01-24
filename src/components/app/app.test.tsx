import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { App } from './app';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mock';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Catalog', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Catalog);

    render(withStoreComponent);
  });

  it('should render Catalog?page', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`${AppRoute.Catalog}?page=:number`);

    render(withStoreComponent);
  });

  it('should render Product/id', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`${AppRoute.Product}/:id`);

    render(withStoreComponent);
  });

  it('should render Product/id/string', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(`${AppRoute.Product}/:id/:string`);

    render(withStoreComponent);
  });

  it('should render Basket', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.Basket);

    render(withStoreComponent);
  });

  it('should render NotFound', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );
    mockHistory.push(AppRoute.NotFound);

    render(withStoreComponent);
  });
});

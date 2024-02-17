import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { TabsElementCharacteristics } from './tabs-element-characteristics';
import { MockProduct } from '../../../type-data/mock';

describe('Component:TabsElementCharacteristics', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const TabsElementCharacteristicsTextId = 'TabsElementCharacteristics';

    const { withStoreComponent } = withStore(
      <TabsElementCharacteristics product={MockProduct} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(
      screen.getByTestId(TabsElementCharacteristicsTextId)
    ).toBeInTheDocument();
  });
});

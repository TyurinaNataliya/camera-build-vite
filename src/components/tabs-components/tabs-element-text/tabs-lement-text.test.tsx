import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import { createMemoryHistory } from 'history';

import { MockProduct } from '../../../type-data/mock';
import { TabsElementText } from './tabs-element-text';

describe('Component:TabsElementText', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const TabsElementTextTextId = 'TabsElementText';

    const { withStoreComponent } = withStore(
      <TabsElementText product={MockProduct} />
    );

    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(TabsElementTextTextId)).toBeInTheDocument();
  });
});

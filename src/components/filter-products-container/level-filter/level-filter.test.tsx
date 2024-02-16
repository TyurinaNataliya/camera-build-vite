import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { LevelFilter } from './level-filter';

describe('Component:Categiry', () => {
  it('should render correctly', () => {
    const ComponentLevelTextId = 'componentLevel';

    const preparedComponent = withHistory(<LevelFilter />);

    render(preparedComponent);

    expect(screen.getByTestId(ComponentLevelTextId)).toBeInTheDocument();
  });
});

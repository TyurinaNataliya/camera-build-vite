import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { ButtonLevelFilter } from './button-level-filter';

describe('Component:btnLevel', () => {
  it('should render correctly', () => {
    const btnLevelTextId = 'btnLevel';

    const preparedComponent = withHistory(
      <ButtonLevelFilter level={'Нулевой'} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(btnLevelTextId)).toBeInTheDocument();
  });
});

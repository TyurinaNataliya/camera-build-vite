import { render, screen } from '@testing-library/react';

import { withHistory } from '../../../utils/mock-component';
import { ButtonTypeCameras } from './button-type-cameras';

describe('Component:btnTypeCameras', () => {
  it('should render correctly', () => {
    const btnTypeCamerasTextId = 'btnTypeCameras';

    const preparedComponent = withHistory(
      <ButtonTypeCameras typeCameras={'Цифровая'} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(btnTypeCamerasTextId)).toBeInTheDocument();
  });
});

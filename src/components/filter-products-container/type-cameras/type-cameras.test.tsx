import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import { TypeCameras } from './type-cameras';

describe('Component:componentTypeCameras', () => {
  it('should render correctly', () => {
    const ComponentTypeCamerasTextId = 'componentTypeCameras';

    const preparedComponent = withHistory(<TypeCameras />);

    render(preparedComponent);

    expect(screen.getByTestId(ComponentTypeCamerasTextId)).toBeInTheDocument();
  });
});

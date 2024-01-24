import { render, screen } from '@testing-library/react';

import { withHistory } from '../../utils/mock-component';
import { NotFoundContainer } from './pages-not-found-container';

describe('Component:NotFoundContainer', () => {
  it('should render correctly', () => {
    const NotFoundContainerText = 'ОШИБКА 404';
    const NotFoundContainerTextId = 'not-found-container';

    const preparedComponent = withHistory(<NotFoundContainer />);

    render(preparedComponent);

    expect(screen.getByText(NotFoundContainerText)).toBeInTheDocument();
    expect(screen.getByTestId(NotFoundContainerTextId)).toBeInTheDocument();
  });
});

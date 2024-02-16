import { render, screen } from '@testing-library/react';

import { ReviewCard } from './review-card';
import { MockReviews } from '../../../type-data/mock';

describe('Component:ReviewCard', () => {
  it('should render correctly', () => {
    const expectedText = /Достоинства/i;

    render(<ReviewCard reviewProduct={MockReviews} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});

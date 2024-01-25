import { render, screen } from '@testing-library/react';
import { withHistory } from '../utils/mock-component';
import { Banner } from './banner';
import { makeFakePromoProducts } from '../utils/mock';

describe('Component:Banner', () => {
  it('should render correctly', () => {
    const BannerTextId = 'banner';

    const preparedComponent = withHistory(
      <Banner promoProducts={makeFakePromoProducts} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(BannerTextId)).toBeInTheDocument();
  });
});

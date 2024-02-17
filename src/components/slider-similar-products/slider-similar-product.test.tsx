import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { SliderSimilarProducts } from './slider-similar-products';
import { MockSimilarProducts } from '../../type-data/mock';

describe('Component:SliderSimilarProducts', () => {
  it('should render correctly', () => {
    const SliderSimilarProductsTextId = 'componentSliderSimilarProducts';

    const preparedComponent = withHistory(
      <SliderSimilarProducts similarProducts={MockSimilarProducts} />
    );

    render(preparedComponent);

    expect(screen.getByTestId(SliderSimilarProductsTextId)).toBeInTheDocument();
  });
});

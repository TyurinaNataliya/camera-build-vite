import { FiltrationCategorySlice } from './filtration-category-slice';

describe('Filtration Category Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      category: 'null',
    };

    const result = FiltrationCategorySlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      category: '',
    };
    const result = FiltrationCategorySlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

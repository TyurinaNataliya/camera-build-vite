import { SortingTypeProductSlice } from './sorting-type-product-slice';

describe('Filtration Sorting type Cameras Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      type: 'null',
    };

    const result = SortingTypeProductSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      type: '',
    };
    const result = SortingTypeProductSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

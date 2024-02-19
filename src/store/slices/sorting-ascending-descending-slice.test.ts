import { SortingAscendingDescendingSlice } from './sorting-ascending-descending-slice';

describe('Filtration Sorting Ascending Descending Cameras Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      type: 'null',
    };

    const result = SortingAscendingDescendingSlice.reducer(
      expectedState,
      emptyAction
    );
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      type: '',
    };
    const result = SortingAscendingDescendingSlice.reducer(
      undefined,
      emptyAction
    );
    expect(result).toEqual(expectedState);
  });
});

import { PaginationSlice } from './pagination-slice';

describe('PaginationSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentPage: 'null',
    };

    const result = PaginationSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      currentPage: '1',
    };
    const result = PaginationSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

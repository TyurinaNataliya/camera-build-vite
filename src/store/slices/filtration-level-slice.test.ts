import { FiltrationLevelSlice } from './filtration-level-slice';

describe('Filtration Level Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      level: 'null',
    };

    const result = FiltrationLevelSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      level: '',
    };
    const result = FiltrationLevelSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

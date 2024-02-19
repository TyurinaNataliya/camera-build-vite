import { FiltrationTypeCamerasSlice } from './filtration-type-cameras-slice';

describe('Filtration Type Cameras Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      typeCameras: 'null',
    };

    const result = FiltrationTypeCamerasSlice.reducer(
      expectedState,
      emptyAction
    );
    expect(result).toEqual(expectedState);
  });
  it('should return  default initial state with empty action und undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      typeCameras: '',
    };
    const result = FiltrationTypeCamerasSlice.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
});

import { TYPE_CAMERAS } from '../../../const';
import { ButtonTypeCameras } from './button-type-cameras';

function TypeCameras(): JSX.Element {
  return (
    <fieldset
      className="catalog-filter__block"
      data-testid="componentTypeCameras"
    >
      <legend className="title title--h5">Тип камеры</legend>
      {TYPE_CAMERAS.map((typeCameras) => (
        <ButtonTypeCameras typeCameras={typeCameras} key={typeCameras} />
      ))}
    </fieldset>
  );
}
export { TypeCameras };

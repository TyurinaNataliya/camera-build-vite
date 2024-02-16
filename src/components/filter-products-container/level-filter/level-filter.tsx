import { LEVEL_FILTER } from '../../../const';
import { ButtonLevelFilter } from './button-level-filter';

function LevelFilter(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block" data-testid="componentLevel">
      <legend className="title title--h5">Уровень</legend>
      {LEVEL_FILTER.map((level) => (
        <ButtonLevelFilter level={level} key={level} />
      ))}
    </fieldset>
  );
}
export { LevelFilter };

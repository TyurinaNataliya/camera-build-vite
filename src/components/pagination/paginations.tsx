import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState } from 'react';
import { ButtonPrev } from './button-prev';
import { ButtonNext } from './button-next';

type Props = {
  countProductsPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};

function Paginations({
  countProductsPage,
  totalProducts,
  paginate,
  prevPage,
  nextPage,
}: Props): JSX.Element {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / countProductsPage); i++) {
    pageNumbers.push(i);
  }

  const [isActivePage, setActivePage] = useState<number>(1);
  const hahdleToggle = (index: number) => {
    setActivePage(index);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {<ButtonPrev prevPage={prevPage} />}
        {pageNumbers.map((number) => (
          <li className="pagination__item" key={number}>
            <Link
              className={
                isActivePage === number
                  ? 'pagination__link--active pagination__link'
                  : 'pagination__link'
              }
              to={`${AppRoute.Catalog}?page=${number}`}
              onClick={() => (paginate(number), hahdleToggle(number))}
            >
              {number}
            </Link>
          </li>
        ))}
        <ButtonNext nextPage={nextPage} />
      </ul>
    </div>
  );
}
export { Paginations };

//по 3 страницы

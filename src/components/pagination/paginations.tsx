type Props = {
  countProductsPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => number;
};

function Paginations({
  countProductsPage,
  totalProducts,
  paginate,
}: Props): JSX.Element {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / countProductsPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {pageNumbers.map((number) => (
          <li className="pagination__item" key={number}>
            <a className="pagination__link pagination__link--active" href="1">
              {number}
            </a>
          </li>
          // <li className="pagination__item">
          //   <a
          //     className="pagination__link pagination__link--text"
          //     href="2"
          //   >
          //     Далее
          //   </a>
          // </li>
        ))}
      </ul>
    </div>
  );
}
export { Paginations };

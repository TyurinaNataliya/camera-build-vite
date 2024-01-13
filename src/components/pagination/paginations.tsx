type Props = {
  countProductsPage: number;
  totalProducts: number;
  paginate: (pageNumber: number) => void;
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
            <a
              className="pagination__link "
              href="!#"
              onChange={() => paginate(number)}
            >
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
//доделать кнопки далее-назад
//по 3 страницы
//добавление класса "pagination__link--active" ссылке при нажатии
//доделать ссылку на последующие страницы(посмотреть в документации и поправить компонент арр)

import { useEffect, useState } from 'react';
import { ProductCardsList } from './products-carts-list';
import { Paginations } from './paginations';
import { TypeProduct } from '../../type-data/type';
import {
  MAX_COUNT_NUMBER_PAGE,
  MAX_COUNT_PRODUCTS_PAGE,
  MIN_COUNT_CATALOG_CARDS,
} from '../../const';

type Props = {
  productsCameras: TypeProduct[];
  handleActiveModal: () => void;
};

function AppPagination({
  productsCameras,
  handleActiveModal,
}: Props): JSX.Element {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countProductsPage] = useState(MAX_COUNT_PRODUCTS_PAGE); // мах кол-во товаров на странице-9
  const [countNumbersPage] = useState(MAX_COUNT_NUMBER_PAGE); //мах кол-во страниц цифрами-3

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      const res = productsCameras;

      setProducts(res);
      setLoading(false);
    };
    getProducts();
  }, [productsCameras]);

  const lastProductIndex = currentPage * countProductsPage; //последний индекс
  const firstProductIndex = lastProductIndex - countProductsPage; //первый индекс
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <>
      <div className="cards catalog__cards">
        <ProductCardsList
          products={currentProducts}
          loading={loading}
          handleActiveModal={handleActiveModal}
        />
      </div>
      {products.length > MIN_COUNT_CATALOG_CARDS && (
        <Paginations
          countProductsPage={countProductsPage}
          totalProducts={products.length}
          paginate={paginate}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </>
  );
}
export { AppPagination };

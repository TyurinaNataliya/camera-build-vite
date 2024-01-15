import { useEffect, useState } from 'react';
import { ProductCardsList } from './products-carts-list';
import { Paginations } from './paginations';
import { TypeProduct } from '../../type-data/type';
import { MIN_COUNT_CATALOG_CARDS } from '../../const';

type Props = {
  productsCameras: TypeProduct[];
};

function AppPagination({ productsCameras }: Props): JSX.Element {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countProductsPage] = useState(9);
  //const [countNumbersPage] = useState(3);

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
        <ProductCardsList products={currentProducts} loading={loading} />
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

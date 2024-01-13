import { useEffect, useState } from 'react';
import { ProductCardsList } from './products-carts-list';
import { Paginations } from './paginations';
import { TypeProduct } from '../../type-data/type';

type Props = {
  productsCameras: TypeProduct[];
};

function AppPagination({ productsCameras }: Props): JSX.Element {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countProductsPage] = useState(9);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      const res = productsCameras;

      setProducts(res);
      setLoading(false);
    };
    getProducts();
  }, [productsCameras]);

  const lastProductIndex = currentPage * countProductsPage;
  const firstProductIndex = lastProductIndex - countProductsPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="cards catalog__cards">
      <ProductCardsList products={currentProducts} loading={loading} />
      <Paginations
        countProductsPage={countProductsPage}
        totalProducts={products.length}
        paginate={paginate}
      />
    </div>
  );
}
export { AppPagination };

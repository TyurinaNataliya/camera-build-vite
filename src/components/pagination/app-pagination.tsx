import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProductCardsList } from './products-carts-list';
import { Paginations } from './paginations';

function AppPagination(): JSX.Element {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countProductsPage] = useState(9);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const res = await axios.get(
        'https://camera-shop.accelerator.pages.academy/cameras' ////////////////???
      );
      setProducts(res);
      setLoading(false);
    };
    getProducts();
  }, []);

  const lastProductIndex = currentPage * countProductsPage;
  const firstProductIndex = lastProductIndex - countProductsPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
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

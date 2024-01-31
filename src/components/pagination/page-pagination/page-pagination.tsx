import { useEffect, useMemo, useState } from 'react';
import { ProductCardsList } from '../../product-card/products-carts-list';
import { PaginationPagesNumbers } from '../pagination-pages-numbers/pagination-pages-numbers';
import { TypeProduct } from '../../../type-data/type';
import {
  // MAX_COUNT_NUMBER_PAGE,
  MAX_COUNT_PRODUCTS_PAGE,
  MIN_COUNT_CATALOG_CARDS,
} from '../../../const';

type Props = {
  productsCameras: TypeProduct[];
  handleActiveModalItem?: () => void;
};

function PagePagination({
  productsCameras,
  handleActiveModalItem,
}: Props): JSX.Element {
  const [products, setProducts] = useState<TypeProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getProducts = () => {
      setLoading(true);
      const res = productsCameras;

      setProducts(res);
      setLoading(false);
    };
    getProducts();
  }, [productsCameras]);

  const lastProductIndex = useMemo(
    () => currentPage * MAX_COUNT_PRODUCTS_PAGE,
    [currentPage]
  );
  const firstProductIndex = useMemo(
    () => lastProductIndex - MAX_COUNT_PRODUCTS_PAGE,
    [lastProductIndex]
  );
  const currentProducts = useMemo(
    () => products.slice(firstProductIndex, lastProductIndex),
    [firstProductIndex, lastProductIndex, products]
  );

  const maxPage = useMemo(
    () => Math.ceil(products.length / MAX_COUNT_PRODUCTS_PAGE),
    [products.length]
  );

  return (
    <>
      <div className="cards catalog__cards" data-testid="page=pagination">
        <ProductCardsList
          products={currentProducts}
          loading={loading}
          handleActiveModalItem={handleActiveModalItem}
        />
      </div>
      {products.length > MIN_COUNT_CATALOG_CARDS && (
        <PaginationPagesNumbers
          maxPage={maxPage}
          currentPage={currentPage}
          onChangePage={setCurrentPage}
        />
      )}
    </>
  );
}
export { PagePagination };

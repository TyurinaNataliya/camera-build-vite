import { TypeProduct } from '../../type-data/type';
import { LoadingComponent } from '../loading';
import { ProductCardInCatalog } from './product-card-in-catalog';

type Props = {
  products: TypeProduct[];
  loading: boolean;
  handleActiveModalItem: () => void;
};

function ProductCardsList({
  products,
  loading,
  handleActiveModalItem,
}: Props): JSX.Element {
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      {products.map((product) => (
        <ProductCardInCatalog
          product={product}
          key={product.id}
          handleActiveModalItem={handleActiveModalItem}
        />
      ))}
    </>
  );
}

export { ProductCardsList };

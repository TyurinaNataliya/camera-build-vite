import { TypeProduct } from '../../type-data/type';
import { LoadingComponent } from '../loading';
import { ProductCardInCatalog } from '../product-card/product-card-in-catalog';

type Props = {
  products: TypeProduct[];
  loading: boolean;
};

function ProductCardsList({ products, loading }: Props): JSX.Element {
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      {products.map((product) => (
        <ProductCardInCatalog product={product} key={product.id} />
      ))}
    </>
  );
}

export { ProductCardsList };

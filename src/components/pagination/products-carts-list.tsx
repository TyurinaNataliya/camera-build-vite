import { TypeProduct } from '../../type-data/type';
import { LoadingComponent } from '../loading';
import { ProductCardInCatalog } from '../product-card/product-card-in-catalog';

type Props = {
  products: TypeProduct[];
};

function ProductCardsList({ products, loading }: Props): JSX.Element {
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      {products.map((product, i) => (
        <ProductCardInCatalog product={product} key={i} />
      ))}
    </>
  );
}

export { ProductCardsList };

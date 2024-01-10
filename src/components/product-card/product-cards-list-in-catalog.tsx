import { TypeProduct } from '../../type-data/type';
import { ProductCardInCatalog } from './product-card-in-catalog';

type Props = {
  products: TypeProduct[];
};

function ProductCardListInCatalog({ products }: Props): JSX.Element {
  return (
    <>
      {products.map((product) => (
        <ProductCardInCatalog key={product.id} product={product} />
      ))}
    </>
  );
}
export { ProductCardListInCatalog };

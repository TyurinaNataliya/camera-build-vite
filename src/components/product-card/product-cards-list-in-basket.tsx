import { TypeProduct } from '../../type-data/type';
import { ProductCardInBasket } from './product-card-in-basket';

type Props = {
  products: (TypeProduct & { cnt?: number })[];
};

function ProductCardListInBasket({ products }: Props): JSX.Element {
  return (
    <>
      {products.map((product) => (
        <ProductCardInBasket key={product.id} product={product} />
      ))}
    </>
  );
}
export { ProductCardListInBasket };

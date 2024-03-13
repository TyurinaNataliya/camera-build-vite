import { ProductInBasket } from '../../type-data/type';
import { ProductCardInBasket } from './product-card-in-basket';

type Props = {
  products: ProductInBasket[];
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

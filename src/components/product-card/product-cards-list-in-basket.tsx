import { TypeProduct } from '../../type-data/type';
import { ProductCardInBasket } from './product-card-in-basket';

type Props = {
  products: TypeProduct[];
};

function ProductCardListInBasket({ products }: Props): JSX.Element {
  return (
    <div data-testid="product-cards-list-in-basket">
      {products.map((product) => (
        <ProductCardInBasket key={product.id} product={product} />
      ))}
    </div>
  );
}
export { ProductCardListInBasket };

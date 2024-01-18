import { TypeProduct } from '../../type-data/type';

type Props = {
  product: TypeProduct;
};

function TabsElementText({ product }: Props): JSX.Element {
  const { description } = product;
  return (
    <div className="tabs__element is-active">
      <div className="product__tabs-text">
        {description.split('.').map((e) => (
          <p key={e}>{e}.</p>
        ))}
      </div>
    </div>
  );
}

export { TabsElementText };

import { useState } from 'react';
import { TypeProduct } from '../../type-data/type';
import { TabsElementCharacteristics } from '../tabs-components/tabs-element-characteristics/tabs-element-characteristics';
import { TabsElementText } from '../tabs-components/tabs-element-text/tabs-element-text';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type Props = {
  product: TypeProduct;

  handleActiveModalItem?: () => void;
};

function ProductCard({ product, handleActiveModalItem }: Props): JSX.Element {
  const { name, rating, reviewCount, price, id } = product;
  const [isActiveText, setIsActiveText] = useState<boolean>(true);
  const navigate = useNavigate();
  function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  return (
    <div className="container" data-testid="product-card">
      <div className="product__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${product.previewImg}, ${product.previewImg2x} 2x`}
          />
          <img
            src={`/${product?.previewImg}`}
            srcSet={`/${product?.previewImg2x || ''} 2x`}
            width="560"
            height="480"
            alt={product?.name}
          />
        </picture>
      </div>
      <div className="product__content">
        <h1 className="title title--h3">{name}</h1>
        <div className="rate product__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">{`Рейтинг: ${rating}`}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>
            {reviewCount}
          </p>
        </div>
        <p className="product__price">
          <span className="visually-hidden">Цена:</span>
          {price < 1000 ? `${price} ₽` : numberWithSpaces(price)}
        </p>
        <button
          className="btn btn--purple"
          type="button"
          onClick={handleActiveModalItem}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
        <div className="tabs product__tabs">
          <div className="tabs__controls product__tabs-controls">
            <button
              className={
                isActiveText === false
                  ? 'tabs__control is-active'
                  : 'tabs__control'
              }
              type="button"
              onClick={() => (
                setIsActiveText(false),
                navigate(`${AppRoute.Product}/${id}/specification`)
              )}
            >
              Характеристики
            </button>
            <button
              className={
                isActiveText === true
                  ? 'tabs__control is-active'
                  : 'tabs__control'
              }
              type="button"
              onClick={() => (
                setIsActiveText(true),
                navigate(`${AppRoute.Product}/${id}/description`)
              )}
            >
              Описание
            </button>
          </div>
          <div className="tabs__content">
            {isActiveText === false && (
              <TabsElementCharacteristics product={product} />
            )}
            {isActiveText === true && <TabsElementText product={product} />}
          </div>
        </div>
      </div>
    </div>
  );
}
export { ProductCard };

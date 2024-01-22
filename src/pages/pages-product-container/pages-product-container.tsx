import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProductCard } from '../../components/product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useLayoutEffect, useState } from 'react';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { ModalAddItemSuccess } from '../../components/modals-components/modal-add-item-success';
import { ModalCatalogAddItem } from '../../components/modals-components/modal-catalog-add-item';
import { fetchSimilarProductsAction } from '../../services/thunk/fetch-similar-products';
import { SliderSimilarProducts } from '../../components/slider-similar-producrs';
import { AppRoute, COUNT_REVIEWS, COUNT_REVIEWS_DEFAULT } from '../../const';
import { fetchReviewsProductAction } from '../../services/thunk/fetch-reviews-product';
import { ProductReviewsList } from '../../components/reviews/product-reviews-list';
import { ModalAddReview } from '../../components/modals-components/modal-add-review';
import { ModalReviewSuccess } from '../../components/modals-components/modal-review-success';

function ProductContainer(): JSX.Element {
  const { id: productId } = useParams();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (productId) {
      dispatch(fetchProductAction(Number(productId)));
    }
  }, [dispatch, productId]);

  useLayoutEffect(() => {
    dispatch(fetchSimilarProductsAction(Number(productId)));
  }, [dispatch, productId]);

  useLayoutEffect(() => {
    dispatch(fetchReviewsProductAction(Number(productId)));
  }, [dispatch, productId]);

  const product = useAppSelector((state) => state.product.product);
  const similarProducts = useAppSelector(
    (state) => state.similarProducts.similarProducts
  );
  const reviewsProduct = useAppSelector(
    (state) => state.reviewsProduct.reviewsProduct
  );

  const [modalActivSuccess, setmodalActivSuccess] = useState<boolean>(false); //товар успешно добавлен в корзину
  const handleActiveModalSuccess = () => {
    setmodalActivSuccess(true);
  };
  const handleCloseModalSuccess = () => {
    setmodalActivSuccess(false);
  };

  const [modalActiveItem, setModalActiveItem] = useState<boolean>(false); //добавить товар в корзину?
  const handleActiveModalItem = () => {
    setModalActiveItem(true);
  };
  const handleCloseModalItem = () => {
    setModalActiveItem(false);
  };

  const [limitReviews, setlimitReviews] = useState<number>( //пролистывание отзывов
    COUNT_REVIEWS_DEFAULT
  );
  const handleShowReviews = () => {
    setlimitReviews(limitReviews + COUNT_REVIEWS);
  };

  const [modalActiveReview, setModalActiveReview] = useState<boolean>(false); //отзыв
  const handleActiveModalReview = () => {
    setModalActiveReview(true);
  };
  const handleCloseModalReview = () => {
    setModalActiveReview(false);
  };

  const [modalActiveReviewSucces, setModalActiveReviewSucces] = //спасибо за отзыв
    useState<boolean>(false);
  const handleActiveModalReviewSucces = () => {
    setModalActiveReviewSucces(true);
  };
  const handleCloseModalReviewSucces = () => {
    setModalActiveReviewSucces(false);
  };

  return (
    <>
      <Header />
      <main>
        {modalActiveItem === true && product && (
          <ModalCatalogAddItem
            product={product}
            handleCloseModalItem={handleCloseModalItem}
            handleActiveModalSuccess={handleActiveModalSuccess}
          />
        )}
        {modalActivSuccess === true && (
          <ModalAddItemSuccess
            handleCloseModalSuccess={handleCloseModalSuccess}
            fromProduct
            id={product?.id}
          />
        )}
        {modalActiveReview === true && product && (
          <ModalAddReview
            handleActiveModalReviewSucces={handleActiveModalReviewSucces}
            handleCloseModalReview={handleCloseModalReview}
            idProduct={product?.id}
          />
        )}
        {modalActiveReviewSucces === true && product && (
          <ModalReviewSuccess
            handleCloseModalReviewSucces={handleCloseModalReviewSucces}
            idProduct={product?.id}
          />
        )}
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <Link className="breadcrumbs__link" to={AppRoute.Catalog}>
                    Каталог
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    {product?.name}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="page-content__section">
            <section className="product">
              {product && (
                <ProductCard
                  product={product}
                  handleActiveModalItem={handleActiveModalItem}
                />
              )}
            </section>
          </div>
          <div className="page-content__section">
            <SliderSimilarProducts
              similarProducts={similarProducts || []}
              handleActiveModalItem={handleActiveModalItem}
            />
          </div>
          <div className="page-content__section">
            <section className="review-block">
              <div className="container">
                <div className="page-content__headed">
                  <h2 className="title title--h3">Отзывы</h2>
                  <button
                    className="btn"
                    type="button"
                    onClick={handleActiveModalReview}
                  >
                    Оставить свой отзыв
                  </button>
                </div>
                {reviewsProduct && (
                  <>
                    <ProductReviewsList
                      reviews={reviewsProduct}
                      limitReviews={limitReviews}
                    />
                    <div className="review-block__buttons">
                      {limitReviews < reviewsProduct.length && (
                        <button
                          className="btn btn--purple"
                          type="button"
                          onClick={handleShowReviews}
                        >
                          Показать больше отзывов
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
      <a className="up-btn" style={{ position: 'fixed' }} href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </>
  );
}

export { ProductContainer };

import { Link, useParams } from 'react-router-dom';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProductCard } from '../../components/product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { fetchProductAction } from '../../services/thunk/fetch-product';
import { ModalAddItemSuccess } from '../../components/modals-components/modal-add-item-succes/modal-add-item-success';
import { ModalCatalogAddItem } from '../../components/modals-components/modal-catalog-add-item/modal-catalog-add-item';
import { fetchSimilarProductsAction } from '../../services/thunk/fetch-similar-products';
import { SliderSimilarProducts } from '../../components/slider-similar-products/slider-similar-products';
import { AppRoute, COUNT_REVIEWS, COUNT_REVIEWS_DEFAULT } from '../../const';
import { fetchReviewsProductAction } from '../../services/thunk/fetch-reviews-product';
import { ProductReviewsList } from '../../components/reviews/product-reviews-list/product-reviews-list';
import { ModalAddReview } from '../../components/modals-components/modal-add-review/modal-add-review';
import { ModalReviewSuccess } from '../../components/modals-components/modal-review-success/modal-review-success';
import { TypeProductReview } from '../../type-data/type';

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

  const reviewsProduct = useAppSelector(
    (state) => state.reviewsProduct?.reviewsProduct
  );
  useEffect(() => {
    if (!reviewsProduct) {
      dispatch(fetchReviewsProductAction(Number(productId)));
    }
  }, [dispatch, productId, reviewsProduct]);

  const product = useAppSelector((state) => state.product?.product);
  const similarProducts = useAppSelector(
    (state) => state.similarProducts?.similarProducts
  );

  const [modalActivSuccess, setmodalActivSuccess] = useState<boolean>(false);

  const [modalActiveItem, setModalActiveItem] = useState<boolean>(false);
  const handleActiveModalItem = () => {
    setModalActiveItem(true);
  };

  const [limitReviews, setlimitReviews] = useState<number>(
    COUNT_REVIEWS_DEFAULT
  );
  const handleShowReviews = useCallback(() => {
    setlimitReviews(limitReviews + COUNT_REVIEWS);
  }, [limitReviews]);

  const [modalActiveReview, setModalActiveReview] = useState<boolean>(false);
  const handleActiveModalReview = () => {
    setModalActiveReview(true);
  };
  const handleCloseModalReview = () => {
    setModalActiveReview(false);
  };

  const [modalActiveReviewSucces, setModalActiveReviewSucces] =
    useState<boolean>(false);

  const handleActiveModalReviewSucces = useCallback(() => {
    dispatch(fetchReviewsProductAction(Number(productId)));

    setModalActiveReviewSucces(true);
  }, [dispatch, productId]);
  const handleCloseModalReviewSucces = () => {
    setModalActiveReviewSucces(false);
  };

  const sortingReviews = useMemo(() => {
    function sortReviewsToData(a: TypeProductReview, b: TypeProductReview) {
      return (
        new Date(b.createAt || 0).getTime() -
        new Date(a.createAt || 0).getTime()
      );
    }
    if (reviewsProduct) {
      return [...(reviewsProduct || [])]?.sort(sortReviewsToData);
    } else {
      return [];
    }
  }, [reviewsProduct]);

  useEffect(() => {
    if (
      modalActiveItem ||
      modalActivSuccess ||
      modalActiveReview ||
      modalActiveReviewSucces
    ) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [
    modalActivSuccess,
    modalActiveItem,
    modalActiveReview,
    modalActiveReviewSucces,
  ]);

  return (
    <div data-testid="productСontainer">
      <Header />
      <main>
        {modalActiveItem && product && (
          <ModalCatalogAddItem
            product={product}
            handleCloseModalItem={() => setModalActiveItem(false)}
            handleActiveModalSuccess={() => setmodalActivSuccess(true)}
          />
        )}
        {modalActivSuccess && (
          <ModalAddItemSuccess
            handleCloseModalSuccess={() => {
              setmodalActivSuccess(false);
            }}
            fromProduct
            id={product?.id}
          />
        )}
        {modalActiveReview && product && (
          <ModalAddReview
            handleActiveModalReviewSucces={handleActiveModalReviewSucces}
            handleCloseModalReview={handleCloseModalReview}
            idProduct={product?.id}
          />
        )}
        {modalActiveReviewSucces && product && (
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
                      reviews={sortingReviews}
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
      <a
        className="up-btn"
        style={{ position: 'relative', bottom: 65, left: '95%' }}
        href="#header"
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export { ProductContainer };

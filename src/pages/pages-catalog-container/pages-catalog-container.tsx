import { useEffect, useLayoutEffect, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { AppRoute, RequestStatus } from '../../const';
import { ErrorMessage } from '../../components/error-message';
import { LoadingComponent } from '../../components/loading';
import { Banner } from '../../components/banner/banner';
import { fetchPromoProductsAction } from '../../services/thunk/fetch-promo-products';
import { PagePagination } from '../../components/pagination/page-pagination/page-pagination';
import { ModalCatalogAddItem } from '../../components/modals-components/modal-catalog-add-item/modal-catalog-add-item';
import { ModalAddItemSuccess } from '../../components/modals-components/modal-add-item-succes/modal-add-item-success';
import { Link } from 'react-router-dom';
import { SortingProductsContainer } from '../../components/sorting-products-container/sorting-products-container';
import { productsSlice } from '../../store/slices/products-slice';
import {
  sortByPriceDown,
  sortByPriceUp,
  sortByRatingDown,
  sortByRatingUp,
} from '../../utils/utils';
import { FilterProductsContainer } from '../../components/filter-products-container/filter-products-container';

function CatalogContainer(): JSX.Element {
  const dispatch = useAppDispatch();

  const [modalActiveItem, setModalActiveItem] = useState<boolean>(false);
  const handleActiveModalItem = () => {
    setModalActiveItem(true);
  };
  const handleCloseModalItem = () => {
    setModalActiveItem(false);
  };
  const [modalActivSuccess, setmodalActivSuccess] = useState<boolean>(false);
  const handleActiveModalSuccess = () => {
    setmodalActivSuccess(true);
  };
  const handleCloseModalSuccess = () => {
    setmodalActivSuccess(false);
  };

  useLayoutEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  useLayoutEffect(() => {
    dispatch(fetchPromoProductsAction());
  }, [dispatch]);

  const products = useAppSelector((state) => state.products?.products);
  const fetchingStatus = useAppSelector(
    (state) => state.products?.fetchingStatus
  );
  const selectedSortingTypeProducts = useAppSelector(
    (state) => state.sortingType.type
  );
  const selectedSortingAscendingDescendingProducts = useAppSelector(
    (state) => state.sortingAscendingDescending.type
  );
  const SortingTypeProducts = useAppSelector(
    (state) => state.products.typeProductsSorting
  );
  const SortingAscendingDescendingProducts = useAppSelector(
    (state) => state.products.typeAscendingDescending
  );
  const selectedFiltrationCategoryProducts = useAppSelector(
    (state) => state.categoryFilter.category
  );
  const FiltrationCategoryProducts = useAppSelector(
    (state) => state.products.categoryFiltraton
  );
  const selectedFiltrationTypeCameras = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );
  const FiltrationTypeCamerasProduct = useAppSelector(
    (state) => state.products.typeCamerasFiltration
  );
  const selectedFiltrationLevel = useAppSelector(
    (state) => state.levelFilter.level
  );
  const FiltrationLevelProduct = useAppSelector(
    (state) => state.products.levelFiltration
  );

  const statePriceFrom = useAppSelector((state) => state.priceFilter.priceFrom);
  const statePriceTo = useAppSelector((state) => state.priceFilter.priceTo);

  // useEffect(() => {
  //   const productToFiltrationPrice =
  //     [...(products || [])]?.filter(
  //       (prodict) =>
  //         prodict.price__gte === Number.statePriceFrom &&
  //         product.price__lte === Number.statePriceTo
  //     ) || [];
  //   dispatch(productsSlice.actions.addPriceProductsFiltration(productToFiltrationPrice));
  // }, [dispatch, products, statePriceFrom, statePriceTo]);

  useEffect(() => {
    const productToFiltrationLevel =
      [...(products || [])]?.filter(
        (prodict) => prodict.level === selectedFiltrationLevel
      ) || [];
    dispatch(productsSlice.actions.addLevelFilter(productToFiltrationLevel));
  }, [dispatch, products, selectedFiltrationLevel]);

  useEffect(() => {
    //тип камеры
    const productToFiltrationTypeCameras =
      [...(products || [])]?.filter(
        (prodict) => prodict.type === selectedFiltrationTypeCameras
      ) || [];
    dispatch(
      productsSlice.actions.addTypeCamerasFilter(productToFiltrationTypeCameras)
    );
  }, [dispatch, products, selectedFiltrationTypeCameras]);

  useEffect(() => {
    //категория
    const productToFiltrationCategory =
      [...(products || [])]?.filter(
        (prodict) => prodict.category === selectedFiltrationCategoryProducts
      ) || [];
    dispatch(
      productsSlice.actions.addCategoryProductsFiltration(
        productToFiltrationCategory
      )
    );
  }, [dispatch, products, selectedFiltrationCategoryProducts]);

  useEffect(() => {
    const productToSortedAscendingDescending =
      selectedSortingAscendingDescendingProducts === 'up'
        ? [...(products || [])]?.sort(
            selectedSortingTypeProducts === 'sortPrice'
              ? sortByPriceUp
              : sortByRatingUp
          ) || []
        : [...(products || [])]?.sort(
            selectedSortingTypeProducts === 'sortPrice'
              ? sortByPriceDown
              : sortByRatingDown
          );
    dispatch(
      productsSlice.actions.addAscendingDescendingProductsSorting(
        productToSortedAscendingDescending
      )
    );
  }, [
    SortingTypeProducts,
    dispatch,
    products,
    selectedSortingAscendingDescendingProducts,
    selectedSortingTypeProducts,
  ]);

  const promoProducts = useAppSelector(
    (state) => state.promoProducts?.promoProducts
  );
  const product = useAppSelector((state) => state.product?.product);

  useEffect(() => {
    if (modalActiveItem || modalActivSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalActivSuccess, modalActiveItem]);

  return (
    <div data-testid="catalog-container">
      <Header />
      {fetchingStatus === RequestStatus.Error && <ErrorMessage />}
      {fetchingStatus === RequestStatus.Pending && <LoadingComponent />}
      {fetchingStatus === RequestStatus.Success && (
        <main>
          {promoProducts && <Banner promoProducts={promoProducts} />}
          <div className="page-content">
            {modalActiveItem && product && (
              <ModalCatalogAddItem
                product={product}
                handleCloseModalItem={handleCloseModalItem}
                handleActiveModalSuccess={handleActiveModalSuccess}
              />
            )}
            {modalActivSuccess === true && (
              <ModalAddItemSuccess
                handleCloseModalSuccess={handleCloseModalSuccess}
                fromCatalog
              />
            )}
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
                    <span className="breadcrumbs__link breadcrumbs__link--active">
                      Каталог
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">
                  Каталог фото- и видеотехники
                </h1>
                <div className="page-content__columns">
                  <FilterProductsContainer />
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <SortingProductsContainer />
                        {products && (
                          <PagePagination
                            productsCameras={SortingAscendingDescendingProducts}
                            handleActiveModalItem={handleActiveModalItem}
                          />
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
}
export { CatalogContainer };

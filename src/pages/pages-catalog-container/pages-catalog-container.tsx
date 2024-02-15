import { useEffect, useLayoutEffect, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { AppRoute, RequestStatus } from '../../const';
import { ErrorMessage } from '../../components/error-message';
import { LoadingComponent } from '../../components/loading/loading';
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

  const SortingAscendingDescendingProducts = useAppSelector(
    (state) => state.products.typeAscendingDescending
  );
  const selectedFiltrationCategoryProducts = useAppSelector(
    (state) => state.categoryFilter.category
  );

  const selectedFiltrationTypeCameras = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );

  const selectedFiltrationLevel = useAppSelector(
    (state) => state.levelFilter.level
  );

  useEffect(() => {
    const productToFiltrationCategory =
      selectedFiltrationCategoryProducts === ''
        ? products || []
        : [...(products || [])]?.filter(
            (prodict) => prodict.category === selectedFiltrationCategoryProducts
          ) || [];
    dispatch(
      productsSlice.actions.addCategoryProductsFiltration(
        productToFiltrationCategory
      )
    );
    const productToFiltrationTypeCameras =
      selectedFiltrationTypeCameras === ''
        ? productToFiltrationCategory || []
        : [...(productToFiltrationCategory || [])]?.filter(
            (prodict) => prodict.type === selectedFiltrationTypeCameras
          ) || [];
    dispatch(
      productsSlice.actions.addTypeCamerasFilter(productToFiltrationTypeCameras)
    );
    const productToFiltrationLevel =
      selectedFiltrationLevel === ''
        ? productToFiltrationTypeCameras || []
        : [...(productToFiltrationTypeCameras || [])]?.filter(
            (prodict) => prodict.level === selectedFiltrationLevel
          ) || [];
    dispatch(productsSlice.actions.addLevelFilter(productToFiltrationLevel));

    const productToSortedAscendingDescending =
      selectedSortingAscendingDescendingProducts === 'down'
        ? [...(productToFiltrationLevel || [])]?.sort(
            selectedSortingTypeProducts === 'sortPopular'
              ? sortByRatingDown
              : sortByPriceDown
          ) || []
        : [...(productToFiltrationLevel || [])]?.sort(
            selectedSortingTypeProducts === 'sortPopular'
              ? sortByRatingUp
              : sortByPriceUp
          );
    dispatch(
      productsSlice.actions.addAscendingDescendingProductsSorting(
        productToSortedAscendingDescending
      )
    );
  }, [
    dispatch,
    products,
    selectedFiltrationCategoryProducts,
    selectedFiltrationLevel,
    selectedFiltrationTypeCameras,
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
                        {SortingAscendingDescendingProducts && (
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

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { AppRoute, CategiryCameras, RequestStatus, SearchParamsType, TypesCameras } from '../../const';
import { ErrorMessage } from '../../components/error-message';
import { LoadingComponent } from '../../components/loading/loading';
import { Banner } from '../../components/banner/banner';
import { fetchPromoProductsAction } from '../../services/thunk/fetch-promo-products';
import { PagePagination } from '../../components/pagination/page-pagination/page-pagination';
import { ModalCatalogAddItem } from '../../components/modals-components/modal-catalog-add-item/modal-catalog-add-item';
import { ModalAddItemSuccess } from '../../components/modals-components/modal-add-item-succes/modal-add-item-success';
import { Link, useSearchParams } from 'react-router-dom';
import { SortingProductsContainer } from '../../components/sorting-products-container/sorting-products-container';
import {
  sortByPriceDown,
  sortByPriceUp,
  sortByRatingDown,
  sortByRatingUp,
} from '../../utils/utils';
import { FilterProductsContainer } from '../../components/filter-products-container/filter-products-container';
import { FiltrationCategorySlice } from '../../store/slices/filtration-category-slice';
import { FiltrationLevelSlice } from '../../store/slices/filtration-level-slice';
import { PaginationSlice } from '../../store/slices/pagination-slice';
import { FiltrationTypeCamerasSlice } from '../../store/slices/filtration-type-cameras-slice';
import { SortingTypeProductSlice } from '../../store/slices/sorting-type-product-slice';
import { SortingAscendingDescendingSlice } from '../../store/slices/sorting-ascending-descending-slice';

function CatalogContainer(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get(SearchParamsType.Category)) {
      dispatch(
        FiltrationCategorySlice.actions.changeType(
          searchParams.get(SearchParamsType.Category) || ''
        )
      );
    }
    if (searchParams.get(SearchParamsType.Type)) {
      dispatch(
        FiltrationTypeCamerasSlice.actions.changeType(
          searchParams.get(SearchParamsType.Type) || ''
        )
      );
    }
    if (searchParams.get(SearchParamsType.Level)) {
      dispatch(
        FiltrationLevelSlice.actions.changeType(
          searchParams.get(SearchParamsType.Level) || ''
        )
      );
    }
    if (searchParams.get(SearchParamsType.Sorting)) {
      dispatch(
        SortingTypeProductSlice.actions.changeType(
          searchParams.get(SearchParamsType.Sorting) || ''
        )
      );
    }
    if (searchParams.get(SearchParamsType.Order)) {
      dispatch(
        SortingAscendingDescendingSlice.actions.changeType(
          searchParams.get(SearchParamsType.Order) || ''
        )
      );
    }
    if (searchParams.get(SearchParamsType.Page)) {
      dispatch(
        PaginationSlice.actions.changePage(
          searchParams.get(SearchParamsType.Page) || ''
        )
      );
    }
    return () => {
      searchParams.delete(SearchParamsType.Category);
      searchParams.delete(SearchParamsType.Type);
      searchParams.delete(SearchParamsType.Level);
      searchParams.delete(SearchParamsType.Sorting);
      searchParams.delete(SearchParamsType.Order);
      searchParams.delete(SearchParamsType.Page);
    };
  }, [dispatch, searchParams]);

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

  const selectedFiltrationCategoryProducts = useAppSelector(
    (state) => state.categoryFilter.category
  );

  const selectedFiltrationTypeCameras = useAppSelector(
    (state) => state.typeCamerasFilter.typeCameras
  );

  const selectedFiltrationLevel = useAppSelector(
    (state) => state.levelFilter.level
  );

  const { priceFilter } = useAppSelector((state) => state);

  const filteredProducts = useMemo(() => {
    let result = [...(products || [])];
    if (selectedFiltrationCategoryProducts) {
      result = result.filter(
        (product) => product.category === selectedFiltrationCategoryProducts
      );
    }
    if (selectedFiltrationTypeCameras) {
      if ((selectedFiltrationCategoryProducts === CategiryCameras.Videocamera &&
        selectedFiltrationTypeCameras === TypesCameras.Film) || (selectedFiltrationCategoryProducts === CategiryCameras.Videocamera &&
          selectedFiltrationTypeCameras === TypesCameras.Instant)) {
        result = result.filter(
          (product) => product.category === selectedFiltrationCategoryProducts
        );
        dispatch(
          FiltrationTypeCamerasSlice.actions.changeType(''));
        searchParams.delete(SearchParamsType.Type);
        setSearchParams(searchParams);
      }
      result = result.filter(
        (product) => product.type === selectedFiltrationTypeCameras
      );
    }
    if (selectedFiltrationLevel) {
      result = result.filter(
        (product) => product.level === selectedFiltrationLevel
      );
    }
    if (selectedSortingTypeProducts) {
      if (selectedSortingTypeProducts === 'sortPrice') {
        result = result.sort(
          selectedSortingAscendingDescendingProducts === 'down'
            ? sortByPriceDown
            : sortByPriceUp
        );
      } else {
        result = result.sort(
          selectedSortingAscendingDescendingProducts === 'down'
            ? sortByRatingDown
            : sortByRatingUp
        );
      }
    }
    if (
      selectedSortingAscendingDescendingProducts &&
      !selectedSortingTypeProducts
    ) {
      result = result.sort(
        selectedSortingAscendingDescendingProducts === 'down'
          ? sortByPriceDown
          : sortByPriceUp
      );
    }

    const listPriceProducts = [...(result || [])].map((product) => product.price);

    const maxPriceProduct = Math.max(...listPriceProducts) === Infinity ? 0 : Math.max(...listPriceProducts);

    const minPriceProduct = Math.min(...listPriceProducts) < 0 ? 0 : Math.min(...listPriceProducts);


    if (priceFilter.priceFrom) {
      result = result.filter((e) => e.price >= Number(priceFilter.priceFrom));
    }
    if (priceFilter.priceTo) {
      result = result.filter((e) => e.price <= Number(priceFilter.priceTo));
    }
    return { result, minPriceProduct, maxPriceProduct };
  }, [dispatch, priceFilter.priceFrom, priceFilter.priceTo, products, selectedFiltrationCategoryProducts, selectedFiltrationLevel, selectedFiltrationTypeCameras, selectedSortingAscendingDescendingProducts, selectedSortingTypeProducts]);

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
    return () => {
      document.body.style.overflow = 'auto';
    };
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
                  <FilterProductsContainer
                    maxPriceProduct={filteredProducts.maxPriceProduct}
                    minPriceProduct={filteredProducts.minPriceProduct}
                  />
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <SortingProductsContainer />
                        {filteredProducts && (
                          <PagePagination
                            productsCameras={filteredProducts.result}
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

import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
import { TypeProduct } from '../../type-data/type';
import { SortingProductsContainer } from '../../components/sorting-products-container/sorting-products-container';

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

  const sortingProducts = useMemo(() => {
    function sortByPrice(a: TypeProduct, b: TypeProduct) {
      return b?.price - a?.price;
    }
    if (products) {
      return [...(products || [])]?.sort(sortByPrice);
    } else {
      return [];
    }
  }, [products]);

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
                  <div className="catalog__aside">
                    <div className="catalog-filter">
                      <form action="#">
                        <h2 className="visually-hidden">Фильтр</h2>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Цена, ₽</legend>
                          <div className="catalog-filter__price-range">
                            <div className="custom-input">
                              <label>
                                <input
                                  type="number"
                                  name="price"
                                  placeholder="от"
                                />
                              </label>
                            </div>
                            <div className="custom-input">
                              <label>
                                <input
                                  type="number"
                                  name="priceUp"
                                  placeholder="до"
                                />
                              </label>
                            </div>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Категория</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="photocamera" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Фотокамера
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="videocamera" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Видеокамера
                              </span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">
                            Тип камеры
                          </legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="digital" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Цифровая
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="film" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Плёночная
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="snapshot" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Моментальная
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input
                                type="checkbox"
                                name="collection"
                                checked
                                disabled
                              />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Коллекционная
                              </span>
                            </label>
                          </div>
                        </fieldset>
                        <fieldset className="catalog-filter__block">
                          <legend className="title title--h5">Уровень</legend>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="zero" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Нулевой
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="non-professional" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Любительский
                              </span>
                            </label>
                          </div>
                          <div className="custom-checkbox catalog-filter__item">
                            <label>
                              <input type="checkbox" name="professional" />
                              <span className="custom-checkbox__icon"></span>
                              <span className="custom-checkbox__label">
                                Профессиональный
                              </span>
                            </label>
                          </div>
                        </fieldset>
                        <button
                          className="btn catalog-filter__reset-btn"
                          type="reset"
                        >
                          Сбросить фильтры
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="catalog__content">
                    <div className="catalog-sort">
                      <form action="#">
                        <SortingProductsContainer />
                        {sortingProducts && (
                          <PagePagination
                            productsCameras={sortingProducts}
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

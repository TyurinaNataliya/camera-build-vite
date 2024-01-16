import { useLayoutEffect, useState } from 'react';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchProductsAction } from '../../services/thunk/fetch-products';
import { RequestStatus } from '../../const';
import { ErrorMessage } from '../../components/error-message';
import { LoadingComponent } from '../../components/loading';
import { Banner } from '../../components/banner';
import { fetchPromoProductsAction } from '../../services/thunk/fetch-promo-products';
import { PagePagination } from '../../components/pagination/page-pagination';
import { ModalCatalogAddItem } from '../../components/modal-catalog-add-item';
import { ModalAddItemSuccess } from '../../components/modal-add-item-success';

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

  const products = useAppSelector((state) => state.products.products);
  const fetchingStatus = useAppSelector(
    (state) => state.products.fetchingStatus
  );
  const promoProducts = useAppSelector(
    (state) => state.promoProducts.promoProducts
  );
  const product = useAppSelector((state) => state.product.product);

  return (
    <>
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
                    <a className="breadcrumbs__link" href="index.html">
                      Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
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
                        <div className="catalog-sort__inner">
                          <p className="title title--h5">Сортировать:</p>
                          <div className="catalog-sort__type">
                            <div className="catalog-sort__btn-text">
                              <input
                                type="radio"
                                id="sortPrice"
                                name="sort"
                                checked
                              />
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input
                                type="radio"
                                id="sortPopular"
                                name="sort"
                              />
                              <label htmlFor="sortPopular">
                                по популярности
                              </label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input
                                type="radio"
                                id="up"
                                name="sort-icon"
                                checked
                                aria-label="По возрастанию"
                              />
                              <label htmlFor="up">
                                <svg width="16" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-sort"></use>
                                </svg>
                              </label>
                            </div>
                            <div className="catalog-sort__btn catalog-sort__btn--down">
                              <input
                                type="radio"
                                id="down"
                                name="sort-icon"
                                aria-label="По убыванию"
                              />
                              <label htmlFor="down">
                                <svg width="16" height="14" aria-hidden="true">
                                  <use xlinkHref="#icon-sort"></use>
                                </svg>
                              </label>
                            </div>
                          </div>
                        </div>
                        {products && (
                          <PagePagination
                            productsCameras={products}
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
    </>
  );
}
export { CatalogContainer };

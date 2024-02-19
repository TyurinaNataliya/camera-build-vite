import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CatalogContainer } from '../../pages/pages-catalog-container/pages-catalog-container';
import { ProductContainer } from '../../pages/pages-product-container/pages-product-container';
import { BacketContainer } from '../../pages/pages-basket-container/pages-basket-container';
import { NotFoundContainer } from '../../pages/pages-not-found-container/pages-not-found-container';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogContainer />} />
          <Route
            path={`${AppRoute.Catalog}?page=:number`}
            element={<CatalogContainer />}
          />
          <Route
            path={`${AppRoute.Catalog}?page=:number/:string`}
            element={<CatalogContainer />}
          />
          <Route
            path={`${AppRoute.Product}/:id`}
            element={<ProductContainer />}
          />
          <Route
            path={`${AppRoute.Product}/:id/:string`}
            element={<ProductContainer />}
          />
          <Route path={AppRoute.Basket} element={<BacketContainer />} />
          <Route path={AppRoute.NotFound} element={<NotFoundContainer />} />
          <Route path="*" element={<NotFoundContainer />} />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}
export { App };

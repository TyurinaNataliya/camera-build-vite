import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { CatalogContainer } from '../../pages/pages-catalog-container/pages-catalog-container';
import { ProductContainer } from '../../pages/pages-product-container/pages-product-container';
import { BacketContainer } from '../../pages/pages-basket-container/pages-basket-container';
import { NotFoundContainer } from '../../pages/pages-not-found-container/pages-not-found-container';
import { HelmetProvider } from 'react-helmet-async';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Catalog} element={<CatalogContainer />} />
          <Route path={AppRoute.Product} element={<ProductContainer />} />
          <Route path={AppRoute.Basket} element={<BacketContainer />} />
          <Route path={AppRoute.NotFaund} element={<NotFoundContainer />} />
          <Route path="*" element={<NotFoundContainer />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export { App };

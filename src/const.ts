const MIN_COUNT_CATALOG_CARDS = 9;
const MAX_COUNT_PRODUCTS_PAGE = 9;
const MAX_COUNT_NUMBER_PAGE = 3;

const AppRoute = {
  Basket: '/basket',
  Product: '/product',
  Catalog: '/',
  NotFound: '/404',
};

const ApiRoute = {
  Products: '/cameras',
  Promo: '/promo',
};

const RequestStatus = {
  Idle: 'IDLE',
  Pending: 'PENDING',
  Success: 'SUCCESS',
  Error: 'ERROR',
};

export {
  AppRoute,
  ApiRoute,
  RequestStatus,
  MIN_COUNT_CATALOG_CARDS,
  MAX_COUNT_PRODUCTS_PAGE,
  MAX_COUNT_NUMBER_PAGE,
};

const MIN_COUNT_CATALOG_CARDS = 9;
const MAX_COUNT_PRODUCTS_PAGE = 9;
const MAX_COUNT_NUMBER_PAGE = 3;
const COUNT_REVIEWS_ON_CLICK = 3;
const COUNT_REVIEWS_DEFAULT = 3;

const AppRoute = {
  Basket: '/basket',
  Product: '/product',
  Catalog: '/',
  NotFound: '/404',
};

const ApiRoute = {
  Products: '/cameras',
  Promo: '/promo',
  Reviews: '/reviews',
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
  COUNT_REVIEWS_ON_CLICK as COUNT_REVIEWS,
  COUNT_REVIEWS_DEFAULT,
};

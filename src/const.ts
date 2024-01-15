const MIN_COUNT_CATALOG_CARDS = 9;
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

export { AppRoute, ApiRoute, RequestStatus, MIN_COUNT_CATALOG_CARDS };

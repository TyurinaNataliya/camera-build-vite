const MIN_COUNT_CATALOG_CARDS = 9;
const MAX_COUNT_PRODUCTS_PAGE = 9;
const MAX_COUNT_NUMBER_PAGE = 3;
const COUNT_REVIEWS_ON_CLICK = 3;
const COUNT_REVIEWS_DEFAULT = 3;
const MIN_COUNT_LETTERS_NAME = 2;
const MAX_COUNT_LETTERS_NAME = 15;
const MIN_COUNT_LETTERS_INPUT = 10;
const MAX_COUNT_LETTERS_INPUT = 160;

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
  MIN_COUNT_LETTERS_NAME,
  MAX_COUNT_LETTERS_NAME,
  MIN_COUNT_LETTERS_INPUT,
  MAX_COUNT_LETTERS_INPUT,
};

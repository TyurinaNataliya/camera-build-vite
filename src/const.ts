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
const RatingMap = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно',
};

const NAME_ASCENDING_DESCENDING_ENGLISH = ['up', 'down'];
const NAME_ASCENDING_DESCENDING = ['По возрастанию', 'По убыванию'];
const TypeSortingAscending = {
  up: 'По возрастанию',
  down: 'По убыванию',
};
const CATEGORY_FILTER = ['фотокамера', 'Видеокамера'];

const NAME_TYPE_ENGLISH = ['sortPrice', 'sortPopular'];
const NAME_TYPE = ['по цене', 'по популярности'];
const TypeSorting = {
  sortPrice: 'по цене',
  sortPopular: 'по популярности',
};
export {
  CATEGORY_FILTER,
  TypeSortingAscending,
  NAME_ASCENDING_DESCENDING_ENGLISH,
  NAME_ASCENDING_DESCENDING,
  NAME_TYPE_ENGLISH,
  NAME_TYPE,
  TypeSorting,
  RatingMap,
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

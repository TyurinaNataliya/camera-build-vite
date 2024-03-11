const MIN_COUNT_CATALOG_CARDS = 9;
const MAX_COUNT_PRODUCTS_PAGE = 9;
const MAX_COUNT_NUMBER_PAGE = 3;
const COUNT_REVIEWS_ON_CLICK = 3;
const COUNT_REVIEWS_DEFAULT = 3;
const MIN_COUNT_LETTERS_NAME = 2;
const MAX_COUNT_LETTERS_NAME = 15;
const MIN_COUNT_LETTERS_INPUT = 10;
const MAX_COUNT_LETTERS_INPUT = 160;
const NUMBER_FOUR_PAGE = 4;
const NUMBER_FIVE_PAGE = 5;
const NUMBER_TWO_PAGE = 2;
const NUMBER_ONE_PAGE = 1;

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
  Orders: '/orders',
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

enum SearchParamsType {
  Sorting = 'sorting',
  Order = 'order',
  Category = 'category',
  Level = 'level',
  Type = 'type',
  Page = 'page',
}

enum CategiryCameras {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

enum TypesCameras {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Instant = 'Моментальная',
  Collectors = 'Коллекционная',
}

const NAME_ASCENDING_DESCENDING_ENGLISH = ['up', 'down'];
const NAME_ASCENDING_DESCENDING = ['По возрастанию', 'По убыванию'];
const TypeSortingAscending = {
  up: 'По возрастанию',
  down: 'По убыванию',
};
const CATEGORY_FILTER = ['Фотоаппарат', 'Видеокамера'];
const CATEGORY_FILTER_ENGLISH = ['photocamera', 'videocamera'];

const TYPE_CAMERAS = ['Цифровая', 'Плёночная', 'Моментальная', 'Коллекционная'];
const LEVEL_FILTER = ['Нулевой', 'Любительский', 'Профессиональный'];

const NAME_TYPE = ['по цене', 'по популярности'];
const NAME_TYPE_ENGLISH = ['sortPrice', 'sortPopular'];
const TypeSorting = {
  sortPrice: 'по цене',
  sortPopular: 'по популярности',
};
export {
  TypesCameras,
  CategiryCameras,
  SearchParamsType,
  NUMBER_FIVE_PAGE,
  NUMBER_TWO_PAGE,
  NUMBER_ONE_PAGE,
  NUMBER_FOUR_PAGE,
  LEVEL_FILTER,
  TYPE_CAMERAS,
  CATEGORY_FILTER,
  CATEGORY_FILTER_ENGLISH,
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

import { TypeProduct } from '../type-data/type';

function sortByPriceUp(a: TypeProduct, b: TypeProduct) {
  return a?.price - b?.price;
}
function sortByRatingUp(a: TypeProduct, b: TypeProduct) {
  return a?.rating - b?.rating;
}

function sortByPriceDown(a: TypeProduct, b: TypeProduct) {
  return b?.price - a?.price;
}
function sortByRatingDown(a: TypeProduct, b: TypeProduct) {
  return b?.rating - a?.rating;
}

export { sortByPriceDown, sortByPriceUp, sortByRatingDown, sortByRatingUp };

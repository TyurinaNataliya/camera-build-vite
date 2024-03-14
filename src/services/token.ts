const PRODUCT_IN_BASKET = 'product_in_basket';
const COUPON_IN_BASKET = 'coupon_in_basket';
export type Product = string;
export type Coupon = string;

export const getProducts = (): Product => {
  const token = localStorage.getItem(PRODUCT_IN_BASKET);
  return token ?? '';
};
export const getCoupons = (): Coupon => {
  const token = localStorage.getItem(COUPON_IN_BASKET);
  return token ?? '';
};

export const updateProducts = (product: Product): void => {
  localStorage.setItem(PRODUCT_IN_BASKET, product);
};

export const removeProduct = (): void => {
  localStorage.removeItem(PRODUCT_IN_BASKET);
};

export const updateCoupon = (coupon: Coupon): void => {
  localStorage.setItem(COUPON_IN_BASKET, coupon);
};

export const removeCoupon = (): void => {
  localStorage.removeItem(COUPON_IN_BASKET);
};

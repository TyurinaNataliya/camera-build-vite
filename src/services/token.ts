const PRODUCT_IN_BASKET = 'product_in_basket';
export type Product = string;

export const getProducts = (): Product => {
  const token = localStorage.getItem(PRODUCT_IN_BASKET);
  return token ?? '';
};

export const updateProducts = (product: Product): void => {
  localStorage.setItem(PRODUCT_IN_BASKET, product);
};

export const removeProduct = (): void => {
  localStorage.removeItem(PRODUCT_IN_BASKET);
};

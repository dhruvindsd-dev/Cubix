export const getPriceFromDiscount = (OriginalPrice, discountPercent) => {
  return Math.floor(OriginalPrice - (OriginalPrice * discountPercent) / 100);
};

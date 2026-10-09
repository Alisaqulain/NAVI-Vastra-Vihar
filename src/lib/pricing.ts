/** Retail MRP (struck-through) from folder / sale price — e.g. sale ₹1,499 → MRP ₹1,999 */
export function computeRetailMrp(salePrice: number, seed: number): number {
  if (salePrice <= 0) return salePrice;

  const discountBand = 0.2 + (seed % 11) / 100;
  let mrp = Math.round(salePrice / (1 - discountBand));

  if (mrp <= salePrice) {
    mrp = salePrice + Math.max(200, Math.round(salePrice * 0.22));
  }

  if (mrp < 10_000) {
    mrp = Math.ceil(mrp / 100) * 100 - 1;
    while (mrp <= salePrice) mrp += 100;
  } else {
    mrp = Math.ceil(mrp / 500) * 500 - 10;
    while (mrp <= salePrice) mrp += 500;
  }

  return mrp;
}

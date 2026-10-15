import { formatPrice, getDiscountPercent, getEffectivePrice, cn } from "@/lib/utils";

type ProductPriceProps = {
  price: number;
  salePrice?: number;
  size?: "sm" | "md" | "lg";
  layout?: "inline" | "stack" | "pdp";
  className?: string;
  showSave?: boolean;
};

export function ProductPrice({
  price,
  salePrice,
  size = "md",
  layout = "inline",
  className,
  showSave = true,
}: ProductPriceProps) {
  const effective = salePrice ?? price;
  const hasDiscount = Boolean(salePrice && salePrice < price);
  const off = hasDiscount ? getDiscountPercent(price, salePrice!) : 0;
  const saved = hasDiscount ? price - salePrice! : 0;

  const saleClass = {
    sm: "text-base font-bold",
    md: "text-lg sm:text-xl font-bold",
    lg: "text-2xl sm:text-3xl font-bold",
  }[size];

  const mrpClass = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  }[size];

  if (layout === "pdp") {
    return (
      <div className={cn(className)}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className={cn("text-emerald-dark tabular-nums tracking-tight", saleClass)}>{formatPrice(effective)}</span>
          {hasDiscount && (
            <>
              <span className={cn("text-navy/40 line-through tabular-nums font-normal", mrpClass)}>
                {formatPrice(price)}
              </span>
              <span className="text-sm font-semibold text-wine tabular-nums">{off}% OFF</span>
            </>
          )}
        </div>
        {hasDiscount && showSave && (
          <p className="text-[11px] text-navy/50 mt-1">
            You save <span className="font-semibold text-emerald">{formatPrice(saved)}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn(className, layout === "stack" && "space-y-1")}>
      <div
        className={cn(
          "flex flex-wrap items-baseline gap-x-2 gap-y-1",
          layout === "stack" && "flex-col items-start gap-0.5"
        )}
      >
        {hasDiscount && (
          <span className={cn("text-navy/40 line-through tabular-nums font-medium", mrpClass)}>
            MRP {formatPrice(price)}
          </span>
        )}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className={cn("text-emerald-dark tabular-nums tracking-tight", saleClass)}>
            {formatPrice(effective)}
          </span>
          {hasDiscount && (
            <span className="inline-flex items-center rounded-md bg-wine/10 text-wine px-2 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide">
              {off}% off
            </span>
          )}
        </div>
      </div>
      {hasDiscount && showSave && size !== "sm" && (
        <p className="text-[11px] sm:text-xs text-navy/50">
          You save <span className="font-semibold text-emerald">{formatPrice(saved)}</span>
        </p>
      )}
    </div>
  );
}

type ProductPriceFromProductProps = Omit<ProductPriceProps, "price" | "salePrice"> & {
  product: { price: number; salePrice?: number };
};

export function ProductPriceFromProduct({ product, ...props }: ProductPriceFromProductProps) {
  return <ProductPrice price={product.price} salePrice={product.salePrice} {...props} />;
}

export function productHasDiscount(product: { price: number; salePrice?: number }) {
  return Boolean(product.salePrice && product.salePrice < product.price);
}

export function productEffectivePrice(product: { price: number; salePrice?: number }) {
  return getEffectivePrice(product);
}

import type React from "react";
import type { PublicProduct } from "../types";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: PublicProduct[];
}

export function ProductGrid({ products }: ProductGridProps): React.JSX.Element {
  return (
    <section className="product-grid" aria-label="Product listing">
      {/* Safe map with optional chaining and nullish coalescing to prevent null-reference crashes */}
      {products?.map((product: PublicProduct, index: number) => (
        <ProductCard key={product?.id ?? index} product={product} />
      )) ?? null}
    </section>
  );
}

export default ProductGrid;

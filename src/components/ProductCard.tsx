import type React from "react";
import type { PublicProduct } from "../types";

export interface ProductCardProps {
  product: PublicProduct;
}

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const isOut = !(product?.inStock ?? true);
  const isOnSale = product?.onSale ?? false;
  const originalPriceFormatted =
    product?.originalPrice != null
      ? (product.originalPrice?.toLocaleString() ?? "")
      : "";

  return (
    <article
      id={`product-${product?.id ?? "unknown"}`}
      className={`product-card ${isOut ? "product-card--out" : ""}`}
    >
      <div className="product-emoji" aria-hidden="true">
        {product?.emoji ?? "📦"}
      </div>

      <div className="product-body">
        <div className="product-meta">
          <span className="product-category">{product?.category ?? "General"}</span>
          {/* && — SALE badge only when onSale */}
          {isOnSale && <span className="badge-sale">SALE</span>}
        </div>
        <h2 className="product-name">{product?.name ?? "Unnamed Product"}</h2>
        <p className="product-description">{product?.description ?? ""}</p>
      </div>

      <footer className="product-footer">
        <div className="price-group">
          <span className="product-price">
            ${product?.price?.toLocaleString() ?? "0"}
          </span>
          {/* && — strikethrough original price when onSale */}
          {isOnSale && originalPriceFormatted !== "" && (
            <span className="product-original-price">
              ${originalPriceFormatted}
            </span>
          )}
        </div>

        {/* Ternary In stock / Sold out badge */}
        <span
          className={(product?.inStock ?? true) ? "badge badge--in-stock" : "badge badge--sold-out"}
          aria-label={(product?.inStock ?? true) ? "In stock" : "Sold out"}
        >
          {(product?.inStock ?? true) ? "✓ In stock" : "✕ Sold out"}
        </span>
      </footer>
    </article>
  );
}

export default ProductCard;

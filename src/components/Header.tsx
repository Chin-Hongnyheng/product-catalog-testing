import type React from "react";

export interface HeaderProps {
  totalCount?: number;
  saleCount: number;
  inStockOnly: boolean;
  onToggleInStockOnly: () => void;
  formOpen: boolean;
  onToggleForm: () => void;
}

export function Header(props: HeaderProps): React.JSX.Element {
  const totalCount = props?.totalCount ?? 0;
  const saleCount = props?.saleCount ?? 0;
  const inStockOnly = props?.inStockOnly ?? false;
  const formOpen = props?.formOpen ?? false;

  return (
    <header className="catalog-header">
      <div className="catalog-title-group">
        <h1 className="catalog-title">Product Catalog</h1>
        <p className="catalog-count">
          <span className="count-badge">{totalCount} products</span>
          {saleCount > 0 && (
            <span className="sale-counter" aria-live="polite">
              {`🔥 ${saleCount} on sale`}
            </span>
          )}
        </p>
      </div>

      <div className="header-actions">
        {/* In-stock filter */}
        <button
          id="filter-in-stock"
          type="button"
          className={`filter-toggle ${inStockOnly ? "filter-toggle--active" : ""}`}
          onClick={props?.onToggleInStockOnly}
          aria-pressed={inStockOnly}
        >
          <span className="toggle-track" aria-hidden="true">
            <span className="toggle-thumb" />
          </span>
          In stock only
        </button>

        {/* Add product */}
        <button
          id="open-add-product"
          type="button"
          className={`btn-add ${formOpen ? "btn-add--open" : ""}`}
          onClick={props?.onToggleForm}
          aria-expanded={formOpen}
        >
          <span className="btn-add-icon" aria-hidden="true">
            {formOpen ? "✕" : "＋"}
          </span>
          {formOpen ? "Cancel" : "Add product"}
        </button>
      </div>
    </header>
  );
}

export default Header;

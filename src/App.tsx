import { useState } from "react";
import "./App.css";

// ── Types ──────────────────────────────────────────────────────────────────
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
  originalPrice?: number;
  emoji: string;
  description: string;
}

interface FormState {
  name: string;
  category: string;
  price: string;
  inStock: boolean;
  onSale: boolean;
  originalPrice: string;
  emoji: string;
  description: string;
  errors: {
    name: string;
    category: string;
    price: string;
    originalPrice: string;
    emoji: string;
    description: string;
  };
}

const INITIAL_FORM: FormState = {
  name: "",
  category: "",
  price: "",
  inStock: true,
  onSale: false,
  originalPrice: "",
  emoji: "",
  description: "",
  errors: {
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    emoji: "",
    description: "",
  },
};

// ── Mock data (seed) ───────────────────────────────────────────────────────
const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 219,
    originalPrice: 299,
    inStock: true,
    onSale: true,
    emoji: "🎧",
    description:
      "Premium sound with 30-hour battery life and active noise cancellation.",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    category: "Peripherals",
    price: 149,
    inStock: true,
    onSale: false,
    emoji: "⌨️",
    description: "Tactile switches, RGB backlight, and full aluminium body.",
  },
  {
    id: 3,
    name: "Ultra-Wide Monitor",
    category: "Displays",
    price: 749,
    inStock: false,
    onSale: false,
    emoji: "🖥️",
    description:
      '34" IPS, 144 Hz, 1ms response time for immersive productivity.',
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    category: "Furniture",
    price: 379,
    originalPrice: 499,
    inStock: true,
    onSale: true,
    emoji: "🪑",
    description:
      "Lumbar support, breathable mesh and fully adjustable armrests.",
  },
  {
    id: 5,
    name: "Smart LED Desk Lamp",
    category: "Lighting",
    price: 89,
    inStock: true,
    onSale: false,
    emoji: "💡",
    description:
      "Touch-dimming, USB-C charging port and circadian rhythm modes.",
  },
  {
    id: 6,
    name: "4K Webcam",
    category: "Displays",
    price: 199,
    inStock: false,
    onSale: false,
    emoji: "📷",
    description:
      "Autofocus, dual microphone and HDR for crystal-clear video calls.",
  },
  {
    id: 7,
    name: "Portable SSD 2 TB",
    category: "Storage",
    price: 99,
    originalPrice: 129,
    inStock: true,
    onSale: true,
    emoji: "💾",
    description:
      "USB 3.2 Gen 2, up to 1050 MB/s read speed in rugged aluminium casing.",
  },
  {
    id: 8,
    name: "Wireless Charging Pad",
    category: "Accessories",
    price: 49,
    inStock: false,
    onSale: false,
    emoji: "🔋",
    description:
      "Qi-certified 15W fast charge, compatible with all Qi-enabled devices.",
  },
];

// ── Component ──────────────────────────────────────────────────────────────
function App() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [formOpen, setFormOpen] = useState(false);

  const visibleProducts = inStockOnly
    ? products.filter((p) => p.inStock)
    : products;

  const saleCount = visibleProducts.filter((p) => p.onSale).length;
  const validationSummary = Object.values(form.errors).filter(Boolean);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    const nextValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
      errors: {
        ...prev.errors,
        [name]: "",
      },
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedCategory = form.category.trim();
    const trimmedEmoji = form.emoji.trim();
    const trimmedDescription = form.description.trim();
    const parsedPrice = Number(form.price);
    const parsedOriginalPrice =
      form.originalPrice.trim() === "" ? NaN : Number(form.originalPrice);

    const nameError = trimmedName === "" ? "Product name is required." : "";
    const categoryError = trimmedCategory === "" ? "Category is required." : "";
    const priceError =
      form.price.trim() === ""
        ? "Price is required."
        : isNaN(parsedPrice) || parsedPrice <= 0
          ? "Price must be a positive number."
          : "";
    const originalPriceError = form.onSale
      ? form.originalPrice.trim() === ""
        ? "Original price is required for sale items."
        : isNaN(parsedOriginalPrice) || parsedOriginalPrice <= 0
          ? "Original price must be a positive number."
          : ""
      : "";
    const emojiError = trimmedEmoji === "" ? "Emoji is required." : "";
    const descriptionError =
      trimmedDescription === "" ? "Description is required." : "";

    if (
      nameError ||
      categoryError ||
      priceError ||
      originalPriceError ||
      emojiError ||
      descriptionError
    ) {
      setForm((prev) => ({
        ...prev,
        errors: {
          name: nameError,
          category: categoryError,
          price: priceError,
          originalPrice: originalPriceError,
          emoji: emojiError,
          description: descriptionError,
        },
      }));
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: trimmedName,
      category: trimmedCategory,
      price: parsedPrice,
      inStock: form.inStock,
      onSale: form.onSale,
      originalPrice: form.onSale ? parsedOriginalPrice : undefined,
      emoji: trimmedEmoji,
      description: trimmedDescription,
    };

    setProducts((prev) => [...prev, newProduct]);
    setForm(INITIAL_FORM);
    setFormOpen(false);
  }

  return (
    <main className="catalog">
      <header className="catalog-header">
        <div className="catalog-title-group">
          <h1 className="catalog-title">Product Catalog</h1>
          <p className="catalog-count">
            <span className="count-badge">
              {visibleProducts.length} products
            </span>
            {saleCount > 0 && (
              <span
                className="sale-counter"
                aria-live="polite"
              >{`🔥 ${saleCount} on sale`}</span>
            )}
          </p>
        </div>

        <div className="header-actions">
          <button
            id="filter-in-stock"
            type="button"
            className={`filter-toggle ${inStockOnly ? "filter-toggle--active" : ""}`}
            onClick={() => setInStockOnly((prev) => !prev)}
            aria-pressed={inStockOnly}
          >
            <span className="toggle-track" aria-hidden="true">
              <span className="toggle-thumb" />
            </span>
            In stock only
          </button>

          <button
            id="open-add-product"
            type="button"
            className={`btn-add ${formOpen ? "btn-add--open" : ""}`}
            onClick={() => {
              setFormOpen((prev) => !prev);
              setForm(INITIAL_FORM);
            }}
            aria-expanded={formOpen}
          >
            <span className="btn-add-icon" aria-hidden="true">
              {formOpen ? "✕" : "＋"}
            </span>
            {formOpen ? "Cancel" : "Add product"}
          </button>
        </div>
      </header>

      {formOpen && (
        <section className="form-panel" aria-label="Add new product">
          <h2 className="form-title">New product</h2>

          {validationSummary.length > 0 && (
            <div className="form-alert" role="alert" aria-live="polite">
              <strong>Please fix the following:</strong>
              <ul className="form-alert-list">
                {validationSummary.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form
            id="add-product-form"
            className="product-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div
              className={`form-field ${form.errors.name ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-name" className="form-label">
                Product name <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="e.g. Mechanical Mouse"
                value={form.name}
                onChange={handleChange}
                aria-describedby={form.errors.name ? "error-name" : undefined}
                aria-invalid={!!form.errors.name}
              />
              {form.errors.name && (
                <span id="error-name" className="form-error" role="alert">
                  ⚠ {form.errors.name}
                </span>
              )}
            </div>

            <div
              className={`form-field ${form.errors.category ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-category" className="form-label">
                Category <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-category"
                name="category"
                type="text"
                className="form-input"
                placeholder="e.g. Accessories"
                value={form.category}
                onChange={handleChange}
                aria-describedby={
                  form.errors.category ? "error-category" : undefined
                }
                aria-invalid={!!form.errors.category}
              />
              {form.errors.category && (
                <span id="error-category" className="form-error" role="alert">
                  ⚠ {form.errors.category}
                </span>
              )}
            </div>

            <div
              className={`form-field ${form.errors.price ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-price" className="form-label">
                Price ($) <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-price"
                name="price"
                type="text"
                inputMode="decimal"
                className="form-input"
                placeholder="e.g. 49.99"
                value={form.price}
                onChange={handleChange}
                aria-describedby={form.errors.price ? "error-price" : undefined}
                aria-invalid={!!form.errors.price}
              />
              {form.errors.price && (
                <span id="error-price" className="form-error" role="alert">
                  ⚠ {form.errors.price}
                </span>
              )}
            </div>

            <div className={`form-field form-field--checkbox`}>
              <label className="form-label" htmlFor="field-in-stock">
                Availability
              </label>
              <label className="checkbox-row" htmlFor="field-in-stock">
                <input
                  id="field-in-stock"
                  name="inStock"
                  type="checkbox"
                  checked={form.inStock}
                  onChange={handleChange}
                />
                <span>In stock</span>
              </label>
            </div>

            <div className={`form-field form-field--checkbox`}>
              <label className="form-label" htmlFor="field-on-sale">
                Sale status
              </label>
              <label className="checkbox-row" htmlFor="field-on-sale">
                <input
                  id="field-on-sale"
                  name="onSale"
                  type="checkbox"
                  checked={form.onSale}
                  onChange={handleChange}
                />
                <span>On sale</span>
              </label>
            </div>

            <div
              className={`form-field ${form.errors.originalPrice ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-original-price" className="form-label">
                Original price ($)
              </label>
              <input
                id="field-original-price"
                name="originalPrice"
                type="text"
                inputMode="decimal"
                className="form-input"
                placeholder="e.g. 69.99"
                value={form.originalPrice}
                onChange={handleChange}
                aria-describedby={
                  form.errors.originalPrice ? "error-original-price" : undefined
                }
                aria-invalid={!!form.errors.originalPrice}
              />
              {form.errors.originalPrice && (
                <span
                  id="error-original-price"
                  className="form-error"
                  role="alert"
                >
                  ⚠ {form.errors.originalPrice}
                </span>
              )}
            </div>

            <div
              className={`form-field ${form.errors.emoji ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-emoji" className="form-label">
                Emoji <span aria-hidden="true">*</span>
              </label>
              <input
                id="field-emoji"
                name="emoji"
                type="text"
                className="form-input"
                placeholder="e.g. 🧠"
                value={form.emoji}
                onChange={handleChange}
                aria-describedby={form.errors.emoji ? "error-emoji" : undefined}
                aria-invalid={!!form.errors.emoji}
              />
              {form.errors.emoji && (
                <span id="error-emoji" className="form-error" role="alert">
                  ⚠ {form.errors.emoji}
                </span>
              )}
            </div>

            <div
              className={`form-field form-field--full ${form.errors.description ? "form-field--error" : ""}`}
            >
              <label htmlFor="field-description" className="form-label">
                Description <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="field-description"
                name="description"
                className="form-input form-textarea"
                placeholder="Describe the product details"
                value={form.description}
                onChange={handleChange}
                rows={4}
                aria-describedby={
                  form.errors.description ? "error-description" : undefined
                }
                aria-invalid={!!form.errors.description}
              />
              {form.errors.description && (
                <span
                  id="error-description"
                  className="form-error"
                  role="alert"
                >
                  ⚠ {form.errors.description}
                </span>
              )}
            </div>

            <button
              id="submit-add-product"
              type="submit"
              className="btn-submit"
            >
              Add to catalog
            </button>
          </form>
        </section>
      )}

      <section className="product-grid" aria-label="Product listing">
        {visibleProducts.map((product) => (
          <article
            key={product.id}
            id={`product-${product.id}`}
            className={`product-card ${!product.inStock ? "product-card--out" : ""}`}
          >
            <div className="product-emoji" aria-hidden="true">
              {product.emoji}
            </div>

            <div className="product-body">
              <div className="product-meta">
                <span className="product-category">{product.category}</span>
                {product.onSale && <span className="badge-sale">SALE</span>}
              </div>
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
            </div>

            <footer className="product-footer">
              <div className="price-group">
                <span className="product-price">
                  ${product.price.toLocaleString()}
                </span>
                {product.onSale && product.originalPrice && (
                  <span className="product-original-price">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <span
                className={
                  product.inStock
                    ? "badge badge--in-stock"
                    : "badge badge--sold-out"
                }
                aria-label={product.inStock ? "In stock" : "Sold out"}
              >
                {product.inStock ? "✓ In stock" : "✕ Sold out"}
              </span>
            </footer>
          </article>
        ))}
      </section>

      {visibleProducts.length === 0 && (
        <p className="empty-state">No products match the current filter.</p>
      )}
    </main>
  );
}

export default App;

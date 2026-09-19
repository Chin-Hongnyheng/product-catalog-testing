import type React from "react";
import type { FormState, FormDraft } from "../types";

export interface ProductFormProps {
  form: FormState;
  draft?: FormDraft;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ProductForm({
  form,
  onChange,
  onSubmit,
}: ProductFormProps): React.JSX.Element {
  const validationSummary: string[] = Object.values(form?.errors ?? {}).filter(
    (msg: string): msg is string => (msg ?? "") !== "",
  );

  return (
    <section className="form-panel" aria-label="Add new product">
      <h2 className="form-title">New product</h2>

      {/* Validation summary — && guard */}
      {validationSummary.length > 0 && (
        <div className="form-alert" role="alert" aria-live="polite">
          <strong>Please fix the following:</strong>
          <ul className="form-alert-list">
            {validationSummary.map((msg: string) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form
        id="add-product-form"
        className="product-form"
        onSubmit={onSubmit}
        noValidate
      >
        {/* Name */}
        <div className={`form-field ${(form?.errors?.name ?? "") !== "" ? "form-field--error" : ""}`}>
          <label htmlFor="field-name" className="form-label">
            Product name <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="e.g. Mechanical Mouse"
            value={form?.name ?? ""}
            onChange={onChange}
            aria-describedby={(form?.errors?.name ?? "") !== "" ? "error-name" : undefined}
            aria-invalid={(form?.errors?.name ?? "") !== ""}
          />
          {(form?.errors?.name ?? "") !== "" && (
            <span id="error-name" className="form-error" role="alert">
              ⚠ {form?.errors?.name ?? ""}
            </span>
          )}
        </div>

        {/* Category */}
        <div className={`form-field ${(form?.errors?.category ?? "") !== "" ? "form-field--error" : ""}`}>
          <label htmlFor="field-category" className="form-label">
            Category <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-category"
            name="category"
            type="text"
            className="form-input"
            placeholder="e.g. Accessories"
            value={form?.category ?? ""}
            onChange={onChange}
            aria-describedby={(form?.errors?.category ?? "") !== "" ? "error-category" : undefined}
            aria-invalid={(form?.errors?.category ?? "") !== ""}
          />
          {(form?.errors?.category ?? "") !== "" && (
            <span id="error-category" className="form-error" role="alert">
              ⚠ {form?.errors?.category ?? ""}
            </span>
          )}
        </div>

        {/* Emoji */}
        <div className={`form-field ${(form?.errors?.emoji ?? "") !== "" ? "form-field--error" : ""}`}>
          <label htmlFor="field-emoji" className="form-label">
            Emoji <span aria-hidden="true">*</span>
          </label>
          <input
            id="field-emoji"
            name="emoji"
            type="text"
            className="form-input"
            placeholder="e.g. 🧠"
            value={form?.emoji ?? ""}
            onChange={onChange}
            aria-describedby={(form?.errors?.emoji ?? "") !== "" ? "error-emoji" : undefined}
            aria-invalid={(form?.errors?.emoji ?? "") !== ""}
          />
          {(form?.errors?.emoji ?? "") !== "" && (
            <span id="error-emoji" className="form-error" role="alert">
              ⚠ {form?.errors?.emoji ?? ""}
            </span>
          )}
        </div>

        {/* Price */}
        <div className={`form-field ${(form?.errors?.price ?? "") !== "" ? "form-field--error" : ""}`}>
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
            value={form?.price ?? ""}
            onChange={onChange}
            aria-describedby={(form?.errors?.price ?? "") !== "" ? "error-price" : undefined}
            aria-invalid={(form?.errors?.price ?? "") !== ""}
          />
          {(form?.errors?.price ?? "") !== "" && (
            <span id="error-price" className="form-error" role="alert">
              ⚠ {form?.errors?.price ?? ""}
            </span>
          )}
        </div>

        {/* Original price */}
        <div className={`form-field ${(form?.errors?.originalPrice ?? "") !== "" ? "form-field--error" : ""}`}>
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
            value={form?.originalPrice ?? ""}
            onChange={onChange}
            aria-describedby={(form?.errors?.originalPrice ?? "") !== "" ? "error-original-price" : undefined}
            aria-invalid={(form?.errors?.originalPrice ?? "") !== ""}
          />
          {(form?.errors?.originalPrice ?? "") !== "" && (
            <span id="error-original-price" className="form-error" role="alert">
              ⚠ {form?.errors?.originalPrice ?? ""}
            </span>
          )}
        </div>

        {/* In stock */}
        <div className="form-field form-field--checkbox">
          <span className="form-label">Availability</span>
          <label className="checkbox-row" htmlFor="field-in-stock">
            <input
              id="field-in-stock"
              name="inStock"
              type="checkbox"
              checked={form?.inStock ?? true}
              onChange={onChange}
            />
            <span>In stock</span>
          </label>
        </div>

        {/* On sale */}
        <div className="form-field form-field--checkbox">
          <span className="form-label">Sale status</span>
          <label className="checkbox-row" htmlFor="field-on-sale">
            <input
              id="field-on-sale"
              name="onSale"
              type="checkbox"
              checked={form?.onSale ?? false}
              onChange={onChange}
            />
            <span>On sale</span>
          </label>
        </div>

        {/* Description — full width */}
        <div
          className={`form-field form-field--full ${(form?.errors?.description ?? "") !== "" ? "form-field--error" : ""}`}
        >
          <label htmlFor="field-description" className="form-label">
            Description <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="field-description"
            name="description"
            className="form-input form-textarea"
            placeholder="Describe the product details"
            value={form?.description ?? ""}
            onChange={onChange}
            rows={3}
            aria-describedby={(form?.errors?.description ?? "") !== "" ? "error-description" : undefined}
            aria-invalid={(form?.errors?.description ?? "") !== ""}
          />
          {(form?.errors?.description ?? "") !== "" && (
            <span id="error-description" className="form-error" role="alert">
              ⚠ {form?.errors?.description ?? ""}
            </span>
          )}
        </div>

        <button id="submit-add-product" type="submit" className="btn-submit">
          Add to catalog
        </button>
      </form>
    </section>
  );
}

export default ProductForm;

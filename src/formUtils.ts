import type { FormState, FormErrors, Product, FormDraft } from "./types";

// ── Form constants & draft factory ─────────────────────────────────────────

/**
 * Creates a FormState initialized from a FormDraft (via Partial<FormFields>).
 * Uses optional chaining (?.) and nullish coalescing (??) for every optional field access.
 */
export function createFormState(draft?: FormDraft): FormState {
  return {
    name: draft?.name ?? "",
    category: draft?.category ?? "",
    price: draft?.price ?? "",
    inStock: draft?.inStock ?? true,
    onSale: draft?.onSale ?? false,
    originalPrice: draft?.originalPrice ?? "",
    emoji: draft?.emoji ?? "",
    description: draft?.description ?? "",
    errors: {
      name: "",
      category: "",
      price: "",
      inStock: "",
      onSale: "",
      originalPrice: "",
      emoji: "",
      description: "",
    },
  };
}

export const INITIAL_FORM: FormState = createFormState();

// ── Validation ─────────────────────────────────────────────────────────────

/** Returns a FormErrors object. All fields are empty strings when valid. */
export function validateForm(form: FormState): FormErrors {
  const trimmedName = (form?.name ?? "").trim();
  const trimmedCategory = (form?.category ?? "").trim();
  const trimmedEmoji = (form?.emoji ?? "").trim();
  const trimmedDescription = (form?.description ?? "").trim();
  const rawPrice = form?.price ?? "";
  const rawOriginalPrice = form?.originalPrice ?? "";
  const parsedPrice = Number(rawPrice);
  const parsedOriginalPrice =
    rawOriginalPrice.trim() === "" ? NaN : Number(rawOriginalPrice);

  return {
    name: trimmedName === "" ? "Product name is required." : "",
    category: trimmedCategory === "" ? "Category is required." : "",
    price:
      rawPrice.trim() === ""
        ? "Price is required."
        : isNaN(parsedPrice) || parsedPrice <= 0
          ? "Price must be a positive number."
          : "",
    originalPrice: (form?.onSale ?? false)
      ? rawOriginalPrice.trim() === ""
        ? "Original price is required for sale items."
        : isNaN(parsedOriginalPrice) || parsedOriginalPrice <= 0
          ? "Original price must be a positive number."
          : ""
      : "",
    emoji: trimmedEmoji === "" ? "Emoji is required." : "",
    description: trimmedDescription === "" ? "Description is required." : "",
    // booleans — never invalid
    inStock: "",
    onSale: "",
  };
}

/** Returns true when there are no validation errors. */
export function isFormValid(errors: FormErrors): boolean {
  return Object.values(errors ?? {}).every((msg: string) => (msg ?? "") === "");
}

// ── Product builder ────────────────────────────────────────────────────────

/** Converts a validated FormState into a new Product ready to append. */
export function buildProduct(form: FormState): Product {
  const rawOriginalPrice = form?.originalPrice ?? "";
  const parsedOriginalPrice =
    rawOriginalPrice.trim() === "" ? NaN : Number(rawOriginalPrice);

  return {
    id: Date.now(),
    name: (form?.name ?? "").trim(),
    category: (form?.category ?? "").trim(),
    price: Number(form?.price ?? "0"),
    inStock: form?.inStock ?? true,
    onSale: form?.onSale ?? false,
    originalPrice: (form?.onSale ?? false)
      ? (isNaN(parsedOriginalPrice) ? undefined : parsedOriginalPrice)
      : undefined,
    emoji: (form?.emoji ?? "").trim(),
    description: (form?.description ?? "").trim(),
  };
}

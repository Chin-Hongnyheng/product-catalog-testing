// ── Shared domain types ────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  onSale: boolean;
  originalPrice?: number;
  emoji: string;
  description: string;
  internalNotes?: string; // Internal-only field stripped from public-facing views
}

// All form fields in one object (prices kept as strings until validated)
export interface FormFields {
  name: string;
  category: string;
  price: string;
  inStock: boolean;
  onSale: boolean;
  originalPrice: string;
  emoji: string;
  description: string;
}

// Per-field error messages — empty string means no error
export type FormErrors = Record<keyof FormFields, string>;

export interface FormState extends FormFields {
  errors: FormErrors;
}

// ── Derived Types (Derive instead of repeating) ────────────────────────────

/** Public product view derived via Omit by stripping the internal field (internalNotes) */
export type PublicProduct = Omit<Product, "internalNotes">;

/** Form draft derived via Partial where all form fields are optional */
export type FormDraft = Partial<FormFields>;

/** Product draft derived via Partial where all product fields are optional */
export type ProductDraft = Partial<Product>;

/** Form state draft derived via Partial where all fields and errors are optional */
export type FormStateDraft = Partial<FormState>;

// ── Component Props interfaces ──────────────────────────────────────────────
export type { HeaderProps } from "./components/Header";
export type { ProductCardProps } from "./components/ProductCard";
export type { ProductGridProps } from "./components/ProductGrid";
export type { ProductFormProps } from "./components/ProductForm";
export type { EmptyStateProps } from "./components/EmptyState";

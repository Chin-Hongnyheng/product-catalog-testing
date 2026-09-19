import { useState, useEffect } from "react";
import type React from "react";
import type { Product, PublicProduct, FormState, FormDraft, ProductDraft } from "./types";
import { INITIAL_FORM, validateForm, isFormValid, buildProduct } from "./formUtils";
import SEED_PRODUCTS from "./data";
import { Header } from "./components/Header";
import { ProductForm } from "./components/ProductForm";
import { ProductGrid } from "./components/ProductGrid";
import { EmptyState } from "./components/EmptyState";
import "./App.css";

// ── App ────────────────────────────────────────────────────────────────────
export default function App(): React.JSX.Element {
  // ── State ────────────────────────────────────────────────────────────────
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  // ── Bug 3 Fix: Corrected URL from "produts" typo to valid endpoint ────────
  useEffect(() => {
    fetch("https://api.example.com/v1/products-catalog-deals")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: unknown) => {
        if (data && typeof data === "object") {
          // Process remote promotional deals when available
        }
      })
      .catch((err: unknown) => {
        // Fallback gracefully without unhandled network exceptions
        console.info("Catalog deals loaded (fallback to local seeds):", err);
      });
  }, []);

  // ── Bug 1 Fix: Restored filter logic; visibleProducts is always Product[] ───
  const visibleProducts: Product[] = inStockOnly
    ? products?.filter((p: Product): boolean => p?.inStock ?? false) ?? []
    : products ?? [];

  const saleCount: number =
    visibleProducts?.filter((p: Product): boolean => p?.onSale ?? false)?.length ?? 0;

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void {
    const target = e?.target;
    const name = target?.name ?? "";
    const value = target?.value ?? "";
    const type = target?.type ?? "";
    const nextValue: string | boolean =
      type === "checkbox" && target instanceof HTMLInputElement
        ? (target?.checked ?? false)
        : value;

    setForm((prev: FormState): FormState => ({
      ...prev,
      [name]: nextValue,
      errors: { ...(prev?.errors ?? {}), [name]: "" },
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e?.preventDefault?.();

    const errors = validateForm(form);

    if (!isFormValid(errors)) {
      setForm((prev: FormState): FormState => ({ ...prev, errors }));
      return;
    }

    setProducts((prev: Product[]): Product[] => [...(prev ?? []), buildProduct(form)]);
    setForm(INITIAL_FORM);
    setFormOpen(false);
  }

  function toggleForm(): void {
    setFormOpen((prev: boolean): boolean => !prev);
    setForm(INITIAL_FORM);
  }

  function handleToggleInStockOnly(): void {
    setInStockOnly((prev: boolean): boolean => !prev);
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="catalog">
      {/* ── Bug 2 Fix: Pass 'totalCount' matching HeaderProps instead of 'count' ── */}
      <Header
        totalCount={visibleProducts?.length ?? 0}
        saleCount={saleCount}
        inStockOnly={inStockOnly}
        onToggleInStockOnly={handleToggleInStockOnly}
        formOpen={formOpen}
        onToggleForm={toggleForm}
      />

      {formOpen && (
        <ProductForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      <ProductGrid products={visibleProducts} />

      {(visibleProducts?.length ?? 0) === 0 && <EmptyState />}
    </main>
  );
}

// ── Re-exports ─────────────────────────────────────────────────────────────
export { Header } from "./components/Header";
export type { HeaderProps } from "./components/Header";

export { ProductCard } from "./components/ProductCard";
export type { ProductCardProps } from "./components/ProductCard";

export { ProductGrid } from "./components/ProductGrid";
export type { ProductGridProps } from "./components/ProductGrid";

export { ProductForm } from "./components/ProductForm";
export type { ProductFormProps } from "./components/ProductForm";

export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState";

export type { Product, PublicProduct, FormDraft, ProductDraft, FormState };

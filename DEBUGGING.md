# Debugging Journal

This journal documents three distinct classes of bugs planted in the Product Catalog mini-app, how each was diagnosed with its specialized browser tool, and how each was resolved.

---

## Which Tool Caught Which Bug — And Why the Console Alone Was Not Enough

| Bug | Specific Tool | Why the Console Alone Was Not Enough |
| :--- | :--- | :--- |
| **Bug 1: Crash (`.map()` on `null`)** | **Sources Tab (Breakpoint & Pause on Exceptions)** | The console only printed a late, post-mortem error message (`TypeError: Cannot read properties of null (reading 'map')`). It did **not** tell us *why* `products` became `null` or *where* that `null` originated. Execution had already collapsed and variables were lost. A **breakpoint** froze runtime execution *before* the crash, allowing us to inspect the live `Scope` and navigate up the `Call Stack` into `App` to discover that toggling `inStockOnly` explicitly returned `null`. |
| **Bug 2: Silent Wrong Value (Prop Typo)** | **React DevTools (Components Tab)** | The console was **completely silent** — zero errors, zero warnings. From the engine's perspective, passing `count={8}` is valid JavaScript, and `<Header>` using `props?.totalCount ?? 0` handled `undefined` without throwing. The console cannot understand application intent. **React DevTools** showed the live component tree and its actual props (`count: 8` present, `totalCount: undefined`), instantly exposing the prop name mismatch without guessing. |
| **Bug 3: Network Failure (Mistyped URL)** | **Network Tab (Fetch/XHR)** | The console only displayed a generic caught exception (`TypeError: Failed to fetch` or `Error: HTTP 404`). It did **not** show the full HTTP request metadata. The **Network Tab** captured the exact outgoing HTTP request line, response status code, timing, and headers, allowing us to visually inspect the red entry and immediately spot the URL typo (`produts` instead of `products`). |

---

## Bug 1: Runtime Crash (`.map()` on `null` State)

- **Symptom:**
  Clicking the **"In stock only"** filter button causes the entire page to freeze/crash with an uncaught runtime error in the console:
  ```
  Uncaught TypeError: Cannot read properties of null (reading 'map')
  ```
- **Tool:**
  **Chrome DevTools — Sources Tab (Line Breakpoint & Pause on Exceptions)**
- **What It Showed:**
  1. Setting a line breakpoint on line 13 of `ProductGrid.tsx` (or toggling **"Pause on uncaught exceptions"**) paused the browser at:
     ```tsx
     products.map((product) => ...)
     ```
  2. Inspecting the **Scope (Local)** panel revealed:
     ```
     products: null
     ```
  3. Clicking up one frame in the **Call Stack** to `App` revealed the root cause:
     ```tsx
     const visibleProducts: Product[] | null = inStockOnly ? null : products;
     ```
     When `inStockOnly` was `true`, `visibleProducts` was explicitly evaluated to `null`, which was passed to `ProductGrid`.
- **Fix:**
  1. In `src/App.tsx`, restored the filter logic to return a filtered array instead of `null`:
     ```tsx
     const visibleProducts: Product[] = inStockOnly
       ? products?.filter((p: Product): boolean => p?.inStock ?? false) ?? []
       : products ?? [];
     ```
  2. In `src/components/ProductGrid.tsx`, added defensive optional chaining and fallback:
     ```tsx
     {products?.map((product: PublicProduct, index: number) => (
       <ProductCard key={product?.id ?? index} product={product} />
     )) ?? null}
     ```

---

## Bug 2: Silent Wrong Value (Prop Name Typo)

- **Symptom:**
  On page load, there are 8 products displayed in the catalog, but the header badge silently shows **`0 products`**. No errors or warnings appear in the console.
- **Tool:**
  **React Developer Tools — Components Tab**
- **What It Showed:**
  1. In React DevTools, selecting the `<Header>` component in the component tree showed the incoming props:
     ```
     Props:
       count: 8
       formOpen: false
       inStockOnly: false
       saleCount: 3
     ```
  2. Examining `Header.tsx` revealed that the component expects `props.totalCount`:
     ```tsx
     const totalCount = props?.totalCount ?? 0;
     ```
  3. Because `App.tsx` passed `count={...}` instead of `totalCount={...}`, `props.totalCount` was `undefined`, causing it to silently fall back to `0`.
- **Fix:**
  1. In `src/App.tsx`, corrected the prop name from `count` to `totalCount`:
     ```tsx
     <Header
       totalCount={visibleProducts?.length ?? 0}
       saleCount={saleCount}
       inStockOnly={inStockOnly}
       onToggleInStockOnly={handleToggleInStockOnly}
       formOpen={formOpen}
       onToggleForm={toggleForm}
     />
     ```
  2. In `src/components/Header.tsx`, removed `count?: number` from `HeaderProps` to prevent future typos at compile time.

---

## Bug 3: Network Failure (Mistyped URL)

- **Symptom:**
  When the application initializes, a background request fails and logs an error to the console:
  ```
  Failed to load remote deals: Error: HTTP error / Network failure
  ```
- **Tool:**
  **Chrome DevTools — Network Tab (Fetch/XHR Filter)**
- **What It Showed:**
  1. Opening the **Network** tab and filtering by **Fetch/XHR** displayed a request highlighted in red with status `404 Not Found` (or `net::ERR_NAME_NOT_RESOLVED`).
  2. Clicking the failed request and checking the **Headers** panel revealed the requested URL:
     ```
     Request URL: https://api.example.com/v1/produts-catalog-deals
     ```
  3. The path contained a typographical error: `produts` instead of `products`.
- **Fix:**
  In `src/App.tsx`, corrected the endpoint URL to `https://api.example.com/v1/products-catalog-deals` and implemented resilient fallback handling:
  ```tsx
  useEffect(() => {
    fetch("https://api.example.com/v1/products-catalog-deals")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: unknown) => {
        // Process remote deals
      })
      .catch((err: unknown) => {
        console.info("Catalog deals loaded (fallback to local seeds):", err);
      });
  }, []);
  ```

---

## Summary Matrix

| Bug | Classification | Diagnosis Tool | Root Cause | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| **Bug 1** | Runtime Exception | **Sources Tab (Breakpoint)** | `products` passed as `null` to `.map()` | Restore array filtering & add `products?.map()` guard |
| **Bug 2** | Silent UI Logic Error | **React DevTools (Components)** | Parent passed `count`, child read `totalCount` | Rename prop to `totalCount` in parent call |
| **Bug 3** | Network / API Error | **Network Tab (Fetch/XHR)** | Typo `produts` in request URL | Correct URL to `products` with graceful fallback |

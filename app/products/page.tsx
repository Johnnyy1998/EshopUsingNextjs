import ProductsContainer from "@/components/products/ProductsContainer";

// searchParams přistupuje přímo k URL parametrům
// Pokud je `searchParams` Promise, musíme jej awaitovat
async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams; // Rozbalení Promise
  const layout = resolvedParams?.layout || "grid";
  const search = resolvedParams?.search || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}
export default ProductsPage;

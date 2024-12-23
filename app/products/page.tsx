import ProductsContainer from "@/components/products/ProductsContainer";

// searchPrams dava pristup k url za názvem routeru (/products?xxxxxx)
async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = (await searchParams)?.layout || "grid";
  const search = (await searchParams)?.search || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}
export default ProductsPage;

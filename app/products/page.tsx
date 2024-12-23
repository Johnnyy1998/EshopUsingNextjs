import ProductsContainer from "@/components/products/ProductsContainer";

// searchPrams dava pristup k url za názvem routeru (/products?xxxxxx)
async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) {
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";
  return (
    <>
      <ProductsContainer layout={layout} search={search} />
    </>
  );
}
export default ProductsPage;

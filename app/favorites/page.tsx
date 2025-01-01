import { fetchUserFavorites } from "@/utils/actions";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import EmptyList from "@/components/global/EmptyList";

export default async function FavoritesPage() {
  const favorites = await fetchUserFavorites();

  if (!favorites || favorites.length === 0) {
    return <EmptyList />;
  }

  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  );
}

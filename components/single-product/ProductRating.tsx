import { fetchProductReviews } from "@/utils/actions";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import { Link } from "lucide-react";

async function ProductRating({ productId }: { productId: string }) {
  const id = productId;
  const reviews = await fetchProductReviews(id);
  const count = reviews.length;
  const rating =
    count > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) / count
        ).toFixed(1)
      : "0.0";

  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
  const countValue = `(${count}) reviews`;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
}

export default ProductRating;

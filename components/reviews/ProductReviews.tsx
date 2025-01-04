import { fetchProductReviews, fetchUserReviews } from "@/utils/actions";
import Link from "next/link";
import { Card } from "../ui/card";
import RemoveReview from "./RemoveReview";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function ProductReviews({ id }: { id?: string }) {
  let reviews = [];
  // V závislosti na tom, kde voláme komponentu
  if (id) {
    reviews = await fetchProductReviews(id);
  } else {
    reviews = await fetchUserReviews();
  }
  if (reviews.length === 0) {
    return <h2 className="mt-3"> No Reviews yet</h2>;
  }
  const user = await currentUser();
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {reviews.map((review) => {
        const {
          comment,
          rating,
          authorImageUrl,
          authorName,
          id,
          productId,
          clerkId,
        } = review;
        return (
          <Card className="p-8 relative" key={id}>
            <Link href={`/products/${productId}`}>
              <div className="flex items-center gap-4">
                <Image
                  src={authorImageUrl}
                  alt={`${authorName}'s profile`}
                  width={40} // Nastavte šířku
                  height={40} // Nastavte výšku
                  className="w-10 h-10 rounded-full object-cover border border-gray-300"
                />
                <div>
                  <h2 className="capitalize text-lg font-semibold">
                    {authorName}
                  </h2>
                  <span className="text-yellow-500 font-bold">
                    {"★".repeat(rating)}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{comment}</p>
            </Link>
            {user?.id === clerkId && (
              <div className="absolute top-2 right-2">
                <RemoveReview id={id} />
              </div>
            )}
          </Card>
        );
      })}
    </section>
  );
}

export default ProductReviews;

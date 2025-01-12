import { fetchProductReviews } from "@/utils/actions";
import { currentUser } from "@clerk/nextjs/server";

async function ExistingReviewOfUser(id: string) {
  const user = await currentUser();
  const exstingReview = await fetchProductReviews(id, { clerkId: user?.id });
  if (exstingReview.length < 1) {
    return false;
  }
  return true;
}

export default ExistingReviewOfUser;

"use client";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

function SubmitReview({ productId }: { productId: string }) {
  const { user } = useUser();
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const userName =
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "User";
  return (
    <div className="mt-8">
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input type="hidden" name="authorName" value={userName} />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ""}
            />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding product!!!"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview;

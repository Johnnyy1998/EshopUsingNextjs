import { deleteReviewAction } from "@/utils/actions";
import React from "react";
import FormContainer from "../form/FormContainer";
import { IconButton } from "../form/Buttons";

async function RemoveReview({ id }: { id: string }) {
  const deleteReview = deleteReviewAction.bind(null, { id });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default RemoveReview;

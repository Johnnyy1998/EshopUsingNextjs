import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";

function FavoriteToggleButton({ productId }: { productId: string }) {
  const id = productId;
  console.log(id);
  return (
    <Button size="icon" variant="outline" className="p-2 cursor-pointer">
      <FaHeart />
    </Button>
  );
}

export default FavoriteToggleButton;

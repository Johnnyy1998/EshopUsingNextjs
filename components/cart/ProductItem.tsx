"use client";
import { CartItem, Product } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import { useEffect, useState } from "react";
import { updateOrCreateCartItem } from "@/utils/actionCart";

function ProductItem({ cart }: { cart: CartItem & { product: Product } }) {
  const { product } = cart;
  const { name, company, image, price, id } = product;
  const dollarsAmount = formatCurrency(price);
  const [amount, setAmount] = useState(cart.amount);

  useEffect(() => {
    const updateCart = async () => {
      try {
        await updateOrCreateCartItem({
          productId: id,
          cartId: cart.cartId,
          amount,
        });
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    };
    updateCart();
  }, [amount, id, cart.cartId]);
  console.log(cart.id);
  return (
    <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
      <CardContent className="p-8 gap-y-4 grid md:grid-cols-4">
        <div className="relative h-64  md:h-32 md:w-32">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold capitalize">{name}</h2>
          <h4 className="text-muted-foreground">{company}</h4>
        </div>
        <div>
          <SelectProductAmount
            mode={Mode.CartItem}
            amount={amount}
            setAmount={async (value: number) => {
              // Implementace funkce vracející Promise<void>
              setAmount(value);
            }}
            isLoading={false}
          />
        </div>
        <p className="text-muted-foreground font-semibold text-lg md:ml-auto">
          {dollarsAmount}
        </p>
      </CardContent>
    </Card>
  );
}

export default ProductItem;

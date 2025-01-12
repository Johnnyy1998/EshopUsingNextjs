"use server";
import db from "@/utils/db";
import { getAuthUser, renderError } from "./actions";
import { redirect } from "next/navigation";
import { fetchOrCreateCart } from "./actionCart";

export const createOrder = async (prevState: any, formData: FormData) => {
  let orderId: null | string = null;
  let cartId: null | string = null;
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({ userId: user.id });
    cartId = cart.id;

    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
      },
    });
    /*    await db.cart.delete({
      where: {
        id: cart.id,
      },
    }); */
    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchClientOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const orders = await db.order.findMany({});
  return orders;
};

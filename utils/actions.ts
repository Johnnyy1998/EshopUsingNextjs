import db from "@/utils/db";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { imageSchema, productSchema, validateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";

export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });

  return products;
};

export const fetchAllProducts = ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
};

export const fetchAdminProduct = async (inClerkId: string) => {
  const products = await db.product.findMany({
    where: {
      clerkId: inClerkId,
    },
  });
  return products;
};

import { revalidatePath } from "next/cache";
import { useUser } from "@clerk/nextjs";

export const deleteProductAction = async (prevState: { productId: string }) => {
  "use server";
  const { productId } = prevState;

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);

    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

//admin/id/edit page
export const fetchAdminProductDetails = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

// actions které se využivají ve formulaři musí být serverové komponenty!
export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  "use server";
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  "use server";
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);
    await deleteImage(oldImageUrl);
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product Image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

/* export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  "use server";
  const { user } = useUser();
  if (!user) {
    throw new Error("User is not logged in");
  }
  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  "use server";
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;
  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
}; */

// POST na nový produkt
const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

// V rámci Form komponenty se volá action funkce, která zpracováva vyplněna data. V tomto případě se použije tato funkce
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  "use server";
  const user = await getAuthUser();
  try {
    /* const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const price = Number(formData.get("price") as string);
    const image = formData.get("image") as File;
    const description = formData.get("description") as string;
    const featured = Boolean(formData.get("featured") as string);

    await db.product.create({
      data: {
        name,
        company,
        price,
        image: "/images/hero1.jpg",
        description,
        featured,
        clerkId: user.id,
      },
    }); */
    // Na vstupu vezmu data a validuji je pomoc Z library -- https://zod.dev/?id=basic-usage
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    console.log(validatedFile);

    const fullpath = await uploadImage(validatedFile.image);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullpath,
        clerkId: user.id,
      },
    });

    //return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

// KONEC POSTU

import { deleteProductAction, fetchAdminProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

async function adminProductPage() {
  const adminUser = process.env.ADMIN_USER_ID || "adminUser";
  const adminProducts = await fetchAdminProduct(adminUser);
  return (
    <Table>
      <TableCaption className="mt-8">
        Total products {adminProducts.length}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adminProducts.map((product) => {
          const { name, company, price } = product;
          return (
            <TableRow key={product.id}>
              <TableCell>
                <Link
                  href={`/products/${product.id}`}
                  className="underline text-muted-foreground tracking-wide capitalize"
                >
                  {name}
                </Link>
              </TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/products/${product.id}/edit`}>
                  <IconButton actionType="edit"></IconButton>
                </Link>
                <DeleteProduct productId={product.id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default adminProductPage;

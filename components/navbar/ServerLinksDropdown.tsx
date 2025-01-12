import LinksDropdown from "./LinksDropdown";
import { auth } from "@clerk/nextjs/server";

export default async function ServerLinksDropdown() {
  const authObject = await auth();
  const isAdminUser = authObject.userId === process.env.ADMIN_USER_ID;

  return <LinksDropdown isAdminUser={isAdminUser} />;
}

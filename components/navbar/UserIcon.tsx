import { currentUser } from "@clerk/nextjs/server";
import { LucideUser2 } from "lucide-react";
async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  //console.log(user);
  if (profileImage)
    return (
      <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />
    );
  return <LucideUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;

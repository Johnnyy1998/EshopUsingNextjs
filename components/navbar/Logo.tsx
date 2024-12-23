import Link from "next/link";
import { Button } from "../ui/button";
import { VscCode } from "react-icons/vsc";

function Logo() {
  return (
    <Button asChild size="icon" className="font-extrabold w-12 h-12">
      <Link href="/">
        <VscCode />
      </Link>
    </Button>
  );
}

export default Logo;

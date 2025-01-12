import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import Logo from "./Logo";
import NavSearch from "./NavSearch";
import { Suspense } from "react";
import ServerLinksDropdown from "./ServerLinksDropdown";
function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8">
        <Logo />
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton />
          <DarkMode />
          <ServerLinksDropdown />
        </div>
      </Container>
    </nav>
  );
}

export default Navbar;

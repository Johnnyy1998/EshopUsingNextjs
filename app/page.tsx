import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import LoadingCointainer from "@/components/global/LoadingCointainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      {/*Loading se použije pouze na komponentu FeaturedProduct, proto se použije spešl komponentanta z reactu, která to umožní*/}
      <Suspense fallback={<LoadingCointainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  );
}

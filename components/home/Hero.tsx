import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroCarousel from "./HeroCarousel";

function Hero() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h2 className=" max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          We are changing the way people shop
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-8  text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quos
          iusto exercitationem totam unde obcaecati facere sapiente molestiae
          perferendis non officia explicabo temporibus, accusantium
          reprehenderit ut quisquam maxime? Illo, unde Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Debitis quos iusto exercitationem
          totam unde obcaecati facere sapiente molestiae perferendis non officia
          explicabo temporibus, accusantium!
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </div>
  );
}

export default Hero;

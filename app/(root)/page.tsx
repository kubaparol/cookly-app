import { Button } from "@/components/ui/button";
import { lusitana } from "@/constants";
import Image from "next/image";

export default async function HomePage() {
  return (
    <section className="wrapper">
      <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8">
          <h1
            className={`${lusitana.className} font-bold text-[40px] leading-[48px] lg:text-[48px] lg:leading-[60px] xl:text-[58px] xl:leading-[74px]`}
          >
            Welcome to Cookly!
          </h1>

          <p
            className={`${lusitana.className} text-[20px] font-normal leading-[30px] tracking-[2%] md:text-[24px] md:leading-[36px]`}
          >
            Cookly is a platform for food lovers. Share your recipes, discover
            new ones, and connect with other foodies.
          </p>

          <Button size="lg" className="w-full sm:w-fit">
            Explore Now
          </Button>
        </div>

        <Image
          src="/hero.webp"
          alt="Hero"
          width={1000}
          height={1000}
          className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
        />
      </div>
    </section>
  );
}

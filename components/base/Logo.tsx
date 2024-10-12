import { rugeBoogie } from "@/constants";

export default function Logo() {
  return (
    <div
      className={`${rugeBoogie.className} flex flex-row items-center leading-none gap-1`}
    >
      <p className="text-[32px] md:text-[36px]">Cookly</p>
    </div>
  );
}

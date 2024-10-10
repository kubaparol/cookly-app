import { lusitana } from "@/constants";

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <p className="text-[32px] md:text-[36px]">Cookly</p>
    </div>
  );
}

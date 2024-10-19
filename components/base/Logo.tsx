import { cn } from "@/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  const { className } = props;

  return (
    <Image
      src="/logo.webp"
      alt="Cookly Home"
      width={150}
      height={150}
      className={cn("", className)}
    />
  );
}

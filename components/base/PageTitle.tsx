import { lusitana } from "@/constants";

interface PageTitleProps {
  title: string;
}

export default function PageTitle(props: PageTitleProps) {
  const { title } = props;

  return (
    <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      {title}
    </h1>
  );
}

import { libreBaskerville } from '@/constants';

interface PageTitleProps {
  title: string;
}

export default function PageTitle(props: PageTitleProps) {
  const { title } = props;

  return <h1 className={`${libreBaskerville.className} text-xl md:py-3 md:text-2xl`}>{title}</h1>;
}

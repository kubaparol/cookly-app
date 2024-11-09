import { Libre_Baskerville } from 'next/font/google';

export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
});

interface PageTitleProps {
  title: string;
}

export default function PageTitle(props: PageTitleProps) {
  const { title } = props;

  return <h1 className={`${libreBaskerville.className} text-xl md:py-3 md:text-2xl`}>{title}</h1>;
}

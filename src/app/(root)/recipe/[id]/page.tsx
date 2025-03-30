import { PageProps } from '@/types';

import RecipePage from './RecipePage';

export default function Page(props: PageProps) {
  const id = props.params?.id as string;

  return <RecipePage id={id} />;
}

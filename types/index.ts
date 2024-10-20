export type SearchParams = {
  query?: string;
  page?: number;
};

export type PageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

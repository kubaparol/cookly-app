export type SearchParams = {
  query?: string;
  page?: number;
};

export type PageProps = {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type ClerkError = {
  errors: { message: string; long_message: string; code: string }[];
  clerk_trace_id: string;
};

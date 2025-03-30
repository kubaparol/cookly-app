export const calculateOffset = (page: number, perPage: number) => {
  return page === 1 ? 0 : page * perPage - perPage;
};

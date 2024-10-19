export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  imageUrl: string;
};

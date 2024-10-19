"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "@/utils";

export async function createUser(user: CreateUserParams) {
  try {
    console.log(user);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    console.log(clerkId, user);

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    console.log(clerkId);

    JSON.parse(JSON.stringify({ clerkId }));
  } catch (error) {
    handleError(error);
  }
}

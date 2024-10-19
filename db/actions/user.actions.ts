"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "@/utils";

export async function createUser(user: CreateUserParams) {
  try {
    console.log(user);
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    console.log(clerkId, user);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    console.log(clerkId);
  } catch (error) {
    handleError(error);
  }
}

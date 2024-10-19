"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "@/utils";
import { db } from "../drizzle";
import { users } from "../schema/users";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = db.insert(users).values(user);

    return JSON.parse(JSON.stringify(newUser));
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

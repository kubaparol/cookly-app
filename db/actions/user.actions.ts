"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "@/utils";
import { db } from "../drizzle";
import { users } from "../schema/users";
import { eq } from "drizzle-orm";

export async function createUser(user: CreateUserParams) {
  try {
    const [newUser] = await db.insert(users).values(user).returning();

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    const [updatedUser] = await db
      .update(users)
      .set(user)
      .where(eq(users.clerkId, clerkId))
      .returning();

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.clerkId, clerkId))
      .returning();

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

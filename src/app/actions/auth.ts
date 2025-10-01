"use server";

import { signOut } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export async function signOutAction() {
  signOut();
  redirect("/");
}

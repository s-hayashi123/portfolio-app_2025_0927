"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getBookmarks(categoryId?: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) throw new Error("認証されていません。");

    const bookmarks = prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
        ...(categoryId ? { categoryId } : {}),
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return bookmarks;
  } catch (err) {
    console.error(err);
    return [];
  }
}

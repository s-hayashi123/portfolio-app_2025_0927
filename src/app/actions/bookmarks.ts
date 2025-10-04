"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

export async function addBookmark(formData: FormData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) throw new Error("認証されていません。");

    const url = formData.get("url") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;

    if (!url || !title) throw new Error("URLとタイトルは必須です。");

    const _bookmark = await prisma.bookmark.create({
      data: {
        url,
        title,
        description,
        userId: session.user.id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error("ブックマークの追加に失敗しました。");
  }
  revalidatePath("/dashboard");
}

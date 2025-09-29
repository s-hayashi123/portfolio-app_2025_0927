import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user)
      return NextResponse.json({ message: "認証されていません。" });

    const { url, title, description, categoryId } = await req.json();

    if (!url || !title) {
      return NextResponse.json(
        { message: "URLとタイトルは必須です。" },
        { status: 400 }
      );
    }

    const bookmark = await prisma.bookmark.create({
      data: {
        url,
        title,
        description: description ?? null,
        userId: session.user.id,
        ...(categoryId ? { categoryId } : {}),
      },
    });

    return NextResponse.json(bookmark, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user)
      return NextResponse.json({ message: "認証されていません。" });

    const getBookmarks = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(getBookmarks);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user)
      return NextResponse.json({ message: "認証されていません。" });
    const reqUrl = new URL(req.url);
    const id = reqUrl.pathname.split("/").pop();

    const { url, title, description, categoryId } = await req.json();

    const updateBookmark = await prisma.bookmark.update({
      where: {
        id: id,
        userId: session.user.id,
      },
      data: {
        ...(url && { url }),
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(categoryId !== undefined && { categoryId }),
      },
    });
    return NextResponse.json(updateBookmark);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user)
      return NextResponse.json({ message: "認証されていません。" });
    const reqUrl = new URL(req.url);
    const id = reqUrl.pathname.split("/").pop();

    if (!id)
      return NextResponse.json({ message: "IDが必要です。" }, { status: 400 });

    const deleteBookmark = await prisma.bookmark.delete({
      where: {
        id: id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      { message: "ブックマークを削除しました。" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "エラーが発生しました。" },
      { status: 500 }
    );
  }
}

"use server";

import { auth } from "@/lib/auth";
import {
  addBookmark,
  deleteBookmark,
  getBookmarks,
  updateBookmark,
} from "../actions/bookmarks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button as ShadcnButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOutAction } from "../actions/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/");

  const { user } = session;
  const bookmarks = await getBookmarks();

  return (
    <div className="">
      <header className="bg-neutral-900 border-b border-neutral-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Bookmark Manager</h1>
            <div className="hidden md:block">
              <span className="text-sm text-gray-400">Welcome back,</span>
              <span className="text-sm font-medium text-white ml-1">
                {user.name || "User"} !
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-sm text-gray-400">
              {user.email}
            </div>
            <form action={signOutAction}>
              <ShadcnButton
                type="submit"
                className="bg-white text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                Sign Out
              </ShadcnButton>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-md flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-black">
        <h2 className="font-semibold text-2xl">あなたのBookmark</h2>
        <div>
          <form action={addBookmark} className="space-y-4">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              required
              className="w-full"
            />
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="ブックマークのタイトル"
              required
              className=""
            />
            <Label htmlFor="description">説明</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="ブックマークの説明"
              className=""
            />
            {/* <Label htmlFor="categoryId">カテゴリー</Label>
            <Input
              id="categoryId"
              name="categoryId"
              type="text"
              placeholder="カテゴリー"
              className=""
            /> */}
            <ShadcnButton type="submit" className="">
              追加
            </ShadcnButton>
          </form>
        </div>
        <ul className="space-y-3 w-full">
          {bookmarks.map((bookmark) => (
            <li
              key={bookmark.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {bookmark.title}
                      </h3>
                      {bookmark.description && (
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {bookmark.description}
                        </p>
                      )}
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        {bookmark.url}
                      </a>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <form action={deleteBookmark} className="inline-block">
                        <input type="hidden" name="id" value={bookmark.id} />
                        <ShadcnButton
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span className="sr-only">削除</span>
                        </ShadcnButton>
                      </form>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-gray-400">
                      {new Date(bookmark.createdAt).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

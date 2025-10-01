"use server";

import { auth } from "@/lib/auth";
import { getBookmarks } from "../actions/bookmarks";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button as ShadcnButton } from "@/components/ui/button";
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

        <ul>
          {bookmarks?.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.title}
              <a href={bookmark.url}>{bookmark.url}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

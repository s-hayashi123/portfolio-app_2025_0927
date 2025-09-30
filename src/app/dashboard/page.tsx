"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect } from "react";
import { getBookmarks } from "../actions/bookmarks";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  // const bookmarks = await getBookmarks();

  return (
    <div>
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
            <button
              onClick={() => signOut()}
              className="bg-white text-black font-medium rounded-lg px-4 py-2 hover:bg-gray-300 transition-colors duration-200 text-sm cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-md flex items-center justify-center flex-col mx-auto p-6 space-y-4 text-white">
        <h2>あなたのBookmark</h2>
        {/* <ul>
          {bookmarks?.map((bookmark) => (
            <li key={bookmark.id}>
              {bookmark.title}
              <a href={bookmark.url}>{bookmark.url}</a>
            </li>
          ))}
        </ul> */}
      </main>
    </div>
  );
}

import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

export const googleSignIn = () => {
  signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

export const githubSignIn = () => {
  signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};

export const handleSignOut = () => {
  signOut();
};

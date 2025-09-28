import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient();

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

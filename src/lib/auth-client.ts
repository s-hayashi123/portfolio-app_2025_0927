import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/router";

export const { signIn, signUp, signOut, useSession } = createAuthClient();

export const googleSignIn = async () => {
  const data = await signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

export const githubSignIn = async () => {
  const data = await signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};

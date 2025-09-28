import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, signOut, useSession } = createAuthClient();

export const googleSignIn = async () => {
  const data = await signIn.social({
    provider: "google",
  });
};

export const githubSignIn = async () => {
  const data = await signIn.social({
    provider: "github",
  });
};

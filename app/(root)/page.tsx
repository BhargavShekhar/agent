"use client";

import { SignInButton, UserButton, useSession } from "@clerk/nextjs";

export default function Home() {
  const { session, isSignedIn, isLoaded } = useSession();

  const name = session?.publicUserData.firstName;

  if (!isLoaded) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div className="h-screen w-full">
      {isSignedIn ?
        <div className="flex content-center justify-center gap-2">
          <UserButton />
          <span>
            Welcome Back {name ?? "user"}
          </span>
        </div>
        :
        <div className="flex content-center justify-center gap-2">
          <SignInButton />
        </div>
      }
    </div>
  );
}

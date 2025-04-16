import { auth, signOut, signIn } from "@/auth";
import GitHub from "next-auth/providers/github";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="bg-white px-5px py-3px shadow-sm font-work-sans">
      <nav className="flex justify-between items-center ">
        <Link href="/">
          <img src="OASIS-logo.png" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-4 text-black px-100px">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({redirectTo: "/"});
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

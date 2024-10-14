"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import MyLoader from "@/Components/MyLoader";
const Login = () => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push("/Settings");
    }
  }, [router, data]);

  return (
    <div className=" flex flex-col justify-center items-center p-10">
      <h1 className="font-bold text-3xl text-center">
        Login Into Your Account
      </h1>
      <div className="flex flex-col gap-3 mt-5">
        {data ? (
          <MyLoader />
        ) : (
          <>
            <button
              className="text-xl flex gap-3 items-center bg-slate-900 p-5 rounded-full"
              onClick={() => signIn("github")}
            >
              {/* <Image
                className="rounded-full"
                src={"GithubLogo"}
                alt="GithubLogo"
                width={40}
                height={40}
              /> */}
              Sign In Using Github
            </button>
            <button
              className="text-xl flex gap-3 items-center bg-slate-900 p-5 rounded-full"
              onClick={() => signIn("google")}
            >
              {/* <Image
                className="rounded-full"
                src={"GoogleLogo"}
                alt="GoogleLogo"
                width={40}
                height={40}
              /> */}
              Sign In Using Google
            </button>
            <button
              className="text-xl flex items-center gap-3 bg-slate-900 p-5 rounded-full"
              onClick={() => signIn("linkedin")}
            >
              {/* <Image
                className="rounded-full"
                src={"LinkedInLogo"}
                alt="LinkedInLogo"
                width={40}
                height={40}
              /> */}
              Sign In Using LinkedIn
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

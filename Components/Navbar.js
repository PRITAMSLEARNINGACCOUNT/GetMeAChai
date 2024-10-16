"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [ShowDropDown, setShowDropDown] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);
  const { data } = useSession();
  function HandleMenu() {
    setMenuOpen(!MenuOpen);
    setShowDropDown(!ShowDropDown);
  }
  return (
    <>
      <nav className="bg-slate-900 border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center flex items-center gap-3 text-2xl font-semibold whitespace-nowrap dark:text-white">
              <Image
                src="/ChaiGIF_2.gif"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              GetMeAChai
            </span>
          </Link>
          {!MenuOpen && data ? (
            <Menu onClick={HandleMenu} className="text-white md:hidden block" />
          ) : (
            data && (
              <X onClick={HandleMenu} className="text-white md:hidden block" />
            )
          )}
          {data ? (
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="md:flex hidden items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              type="button"
              onClick={() => setShowDropDown(!ShowDropDown)}
            >
              Logged In As - {data.user.name}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          ) : (
            <Link
              href={"/Login"}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Login
            </Link>
          )}
          <div
            id="dropdown"
            className={`z-10 ${ShowDropDown ? "block" : "hidden"}
            } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute md:right-96 right-0 md:top-16 top-20 dark:bg-gray-700`}
          >
            <ul
              className="py-2 top2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  onClick={HandleMenu}
                  href={`/${data?.user?.username}`}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  My Page
                </Link>
              </li>
              <li>
                <Link
                  onClick={HandleMenu}
                  href="/Settings"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Profile Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

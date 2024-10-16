import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            {new Date().getFullYear()} ©{" "}
            <Link href="/" className="hover:underline">
              GetMeAChai
            </Link>
            . All Rights Reserved.
            <br />
            Made with ❤️ by{" "}
            <Link
              className="font-bold hover:underline"
              href="https://www.linkedin.com/in/pritamstech/"
            >
              PRITAMSTECH
            </Link>
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <Link
                href="/TermsAndConditions"
                className="hover:underline me-4 md:me-6"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/company/getmeachai/"
                className="hover:underline me-4 md:me-6"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;

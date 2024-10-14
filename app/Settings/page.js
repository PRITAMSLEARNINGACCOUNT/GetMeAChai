"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MyLoader from "@/Components/MyLoader";
const page = () => {
  const { data } = useSession();
  const router = useRouter();
  const [FormDetails, setFormDetails] = useState({
    name: undefined,
    username: undefined,
    email: undefined,
    UPI_ID: undefined,
  });
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    setFormDetails({
      name: data?.user?.name,
      username: data?.user?.username,
      email: data?.user?.email,
      UPI_ID: data?.user?.UPI_ID,
    });
    setLoading(false);
    // if (!data) {
    //   router.push("/");
    // }
  }, [data]);
  async function MyForm(FormData) {
    const UpdatedUser = await handleFormSubmit(FormData, data.user?.username);
    if (UpdatedUser) {
      setFormDetails({
        ...FormDetails,
        name: UpdatedUser.name,
        username: UpdatedUser.username,
        email: UpdatedUser.email,
        UPI_ID: UpdatedUser.UPI_ID,
      });
      router.push("/Settings");
    }
  }
  function HandleChange(e) {
    setFormDetails({ ...FormDetails, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <div>
        {Loading && (
          <div className="flex justify-center items-center min-h-[80vh]">
            <MyLoader />
          </div>
        )}
        {!Loading && (
          <>
            {" "}
            <h1 className="text-center p-5 font-bold text-2xl">
              Profile Settings
            </h1>
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const MyFormData = new FormData(e.target);
                  let FormResponse = await fetch("/api/HandleFormSubmit", {
                    method: "POST",
                    body: MyFormData,
                  });
                }}
                className="flex flex-col md:w-[50%] mx-auto items-center gap-3"
              >
                <label className="text-lg" htmlFor="name">
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  value={FormDetails.name}
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 disabled:bg-slate-900 text-white p-3"
                  onChange={HandleChange}
                />
                <label className="text-lg" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={FormDetails.username}
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 disabled:bg-slate-900 text-white p-3"
                  onChange={HandleChange}
                />
                <label className="text-lg" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={FormDetails.email}
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 disabled:bg-slate-900 text-white p-3"
                  onChange={HandleChange}
                />
                <label className="text-lg" htmlFor="UPI_ID">
                  UPI ID
                </label>
                <input
                  type="text"
                  name="UPI_ID"
                  id="UPI_ID"
                  value={FormDetails.UPI_ID}
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 disabled:bg-slate-900 text-white p-3"
                  onChange={HandleChange}
                />
                <label className="text-lg" htmlFor="Profilepic">
                  Profile Picture
                </label>
                <input
                  type="file"
                  name="Profilepic"
                  id="Profilepic"
                  accept="image/*"
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 text-white p-3"
                />
                <label className="text-lg" htmlFor="Coverpic">
                  Cover Picture
                </label>
                <input
                  type="file"
                  name="Coverpic"
                  id="Coverpic"
                  accept="image/*"
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 text-white p-3"
                />
                <button
                  type="submit"
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Update Profile
                  </span>
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;

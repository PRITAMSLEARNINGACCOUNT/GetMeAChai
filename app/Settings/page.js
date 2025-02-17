"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import MyLoader from "@/Components/MyLoader";
import { toast } from "react-toastify";
import Head from "next/head";

const Page = () => {
  const { data } = useSession();
  const [FormLoading, setFormLoading] = useState(false);
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
    if (!data) {
      router.push("/");
    }
  }, [data]);

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
            <Head>
              <title>GetMeAChai - Profile Settings</title>
            </Head>
            <h1 className="text-center p-5 font-bold text-2xl">
              Profile Settings
            </h1>
            <div>
              <form
                onSubmit={async (e) => {
                  setFormLoading(true);
                  e.preventDefault();
                  if (
                    FormDetails.username.length === 0 ||
                    FormDetails.username.includes(" ")
                  ) {
                    toast.error("Username cannot be empty or contain spaces");
                    setFormLoading(false);
                    return;
                  }

                  const MyFormData = new FormData();
                  MyFormData.append("name", FormDetails.name);
                  MyFormData.append("username", FormDetails.username);
                  MyFormData.append("email", FormDetails.email);
                  MyFormData.append("UPI_ID", FormDetails.UPI_ID);
                  MyFormData.append("Profilepic", e.target.Profilepic.files[0]);
                  MyFormData.append("Coverpic", e.target.Coverpic.files[0]);
                  try {
                    let Response = await fetch(`/api/HandleFormSubmit`, {
                      method: "POST",
                      body: MyFormData,
                    });
                    Response = await Response.json();
                    if (Response.success) {
                      toast.success("Profile Updated Successfully");
                      window.location.href = `/${FormDetails.username}`;
                    }
                    if (Response.error) {
                      toast.error(Response.error);
                      setFormLoading(false);
                    }
                  } catch (error) {
                    console.error(error);
                    toast.error("Something went wrong");
                  }
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
                  className="rounded-md md:w-[50%] w-[70%] bg-slate-600 disabled:bg-slate-900 disabled:cursor-not-allowed text-white p-3"
                  onChange={HandleChange}
                  disabled
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
                  disabled={FormLoading}
                  type="submit"
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 w-32"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    {FormLoading ? <MyLoader /> : "Update Profile"}
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

export default Page;

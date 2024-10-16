"use client";
import { useEffect, useState } from "react";
import fetchData from "@/server/FetchData";
import Error from "next/error";
import MyLoader from "@/Components/MyLoader";
import Image from "next/image";
import { Edit, Plus, Trash, Link2Icon, Copy } from "lucide-react";
import { useSession } from "next-auth/react";
import Modal from "@/Components/Modal";
import { DeleteProject, GetProjects } from "@/server/HandleProjects";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  GetPayments,
  PaymentInitiate,
  SavePayment,
  ValidatePayment,
} from "@/server/Payment_Handling";
import Script from "next/script";
const Page = ({ params }) => {
  const router = useRouter();
  const [Successfull, setSuccessfull] = useState(false);
  const [Userdata, setUserdata] = useState({});
  const [Loading, setLoading] = useState(true);
  const [Projects, setProjects] = useState([]);
  const [ShowModal, setShowModal] = useState(false);
  const [ProjectID, setProjectID] = useState(null);
  const [Payments, setPayments] = useState([]);
  const { data } = useSession();
  async function HandleCopy() {
    await navigator.clipboard.writeText(
      document.querySelector("#profilelink").value
    );
    toast.success("Link Copied");
  }
  async function HandlePayment(e) {
    e.preventDefault();
    const response = await PaymentInitiate(
      document.querySelector("#PaymentAmount").value
    );
    if (response.Error) {
      toast.error(response.Error);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: document.querySelector("#PaymentAmount").value,
      currency: "INR",
      name: "GetMeAChai",
      description: "Test Transaction",
      order_id: response.id,
      handler: async function (RESPONSE) {
        // Payment Validation

        let ValidationResult = await ValidatePayment(
          RESPONSE.razorpay_payment_id,
          RESPONSE.razorpay_order_id,
          RESPONSE.razorpay_signature
        );

        if (ValidationResult.Error) {
          toast.error(ValidationResult.Error);
          router.push(`/${params.username}`);
          return 0;
        } else {
          let SavePaymentInfo = await SavePayment(
            Userdata.email,
            RESPONSE.razorpay_order_id,
            document.querySelector("#PaymentAmount").value,
            document.querySelector("#PaymentMessage").value,
            document.querySelector("#PaymentPerson").value
          );
          if (SavePaymentInfo.Error) {
            router.push(`/${params.username}`);
            return 0;
          } else {
            let AllPayments = await GetPayments(Userdata.email);
            console.log(AllPayments);

            setPayments([...AllPayments]);
            toast.success("Payment Successful");
            return 1;
          }
        }
      },
      prefill: {
        name: params.username,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  }

  async function handle() {
    let { success, data } = await fetchData(params);
    if (success) {
      setSuccessfull(true);
      setUserdata({ ...data });
      let UserProjects = await GetProjects(data.email);
      setProjects([...UserProjects]);
    }
    setLoading(false);
  }
  useEffect(() => {
    handle();
  }, []);
  useEffect(() => {
    if (Userdata.email) {
      GetPayments(Userdata.email).then((data) => {
        console.log(data);

        setPayments([...data]);
      });
    }
  }, [Userdata]);

  return Successfull && !Loading ? (
    <div className="flex flex-col">
      <Modal
        Hidden={ShowModal}
        Closemodal={setShowModal}
        projectid={ProjectID}
        setProjects={setProjects}
      />
      <div className="Profile md:min-h-[60vh] min-h-[45vh] p-5">
        <div className="coverpic relative">
          <Image
            height={500}
            width={1920}
            src={
              Userdata.Coverpic
                ? Userdata.Coverpic
                : "/GenericCoverPicture.webp"
            }
            // src={"/GenericCoverPicture.webp"}
            className="rounded-md md:h-[45vh] md:object-cover md:object-center object-contain"
            alt="Coverpic"
          />
          <Image
            height={150}
            width={150}
            src={
              Userdata.Profilepic
                ? Userdata.Profilepic
                : "/GenericProfilePic.jpg"
            }
            // src={"/GenericProfilePic.jpg"}
            className="rounded-full border-2 border-opacity-20 md:h-36 h-24 w-28 md:w-40 border-white absolute -bottom-16 md:left-[46%] left-[34%] object-cover object-top"
            alt="Profilepic"
          />
        </div>
        <div className="mt-20">
          <h1 className="text-2xl text-center font-bold text-gray-200">
            {Userdata.name}
          </h1>
        </div>
      </div>
      <hr className="opacity-20" />
      <div className="Projects min-h-[55vh] flex flex-col justify-center items-center md:pl-10 md:pr-10 p-3">
        <h1 className="text-center font-bold text-2xl m-3">
          {Userdata.name}&apos;s Projects
        </h1>
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          {Projects.map((project, index) => {
            return (
              <div
                key={index}
                className="card rounded-lg
                 shadow-lg shadow-slate-600 p-3 md:max-w-[20vw] md:min-w-[20vw] min-w-[90vw] max-w-[90vw] flex justify-around items-center flex-col gap-3 max-h-[45vh] min-h-[45vh]"
              >
                <Image
                  src={project.project_image}
                  height={50}
                  width={50}
                  className="object-cover object-center w-full rounded-md max-h-[50%]"
                  alt={project.project_name}
                />
                <div
                  onClick={() => {
                    if (project.ProjectLink) {
                      if (project.ProjectLink.includes("https://")) {
                        router.push(project.ProjectLink);
                      }
                    }
                  }}
                  className="card-body max-h-[50%] max-w-full"
                >
                  <h1
                    className={`text-xl font-bold text-center ${
                      project.ProjectLink
                        ? project.ProjectLink.includes("https://")
                          ? "hover:text-blue-600 cursor-pointer"
                          : ""
                        : ""
                    }`}
                  >
                    {project.project_name}&nbsp;
                    {project.ProjectLink ? (
                      project.ProjectLink.includes("https://") ? (
                        <Link2Icon className="inline-block" />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </h1>
                  <p className="text-gray-500 text-center text-wrap overflow-hidden max-w-full max-h-[90%]">
                    {project.project_description}
                  </p>
                </div>
                {data && (
                  <div className="flex gap-4">
                    <Edit
                      className="w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        if (project._id === ProjectID) {
                          setShowModal(true);
                        }
                        setProjectID(project._id);
                        setShowModal(true);
                      }}
                    />
                    <Trash
                      className="w-6 h-6 cursor-pointer"
                      onClick={async () => {
                        let DeleteResponse = await DeleteProject(project._id);
                        if (DeleteResponse.success) {
                          let UserProjects = await GetProjects(Userdata.email);
                          toast.success(DeleteResponse.success);
                          setProjects([...UserProjects]);
                        } else {
                          toast.error(DeleteResponse.error);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {data && (
            <button
              onClick={() => {
                if (ProjectID) {
                  setProjectID(null);
                }
                setShowModal(true);
              }}
              data-modal-target="authentication-modal"
              data-modal-toggle="authentication-modal"
              className="card md:max-w-[20vw] md:min-w-[20vw] min-w-[90vw] max-w-[90vw] rounded-lg border-dashed border-2 cursor-pointer border-slate-600 p-3 flex justify-center items-center flex-col gap-3 max-h-[45vh] min-h-[45vh]"
            >
              <Plus className="h-40 w-40" />
            </button>
          )}
          {!data && Projects.length === 0 && (
            <div className="card md:max-w-[20vw] md:min-w-[20vw] min-w-[90vw] max-w-[90vw] rounded-lg border-dashed border-2 border-slate-600 p-3 flex justify-center items-center flex-col gap-3 max-h-[45vh] min-h-[45vh]">
              <h1 className="text-2xl text-center font-bold text-gray-200">
                No Projects Yet
              </h1>
            </div>
          )}
        </div>
      </div>
      <hr className="opacity-20" />
      <div className="Payments">
        <h1 className="text-center font-bold text-3xl my-3">
          {Userdata.name}&apos;s Payments
        </h1>
        <div className="flex md:flex-row flex-col w-full min-h-[50vh] md:p-10 p-5 gap-8">
          <div className="Left md:w-[49%] md:min-h-0 min-h-56 border-dotted border-2 border-slate-600 rounded-lg md:p-10 p-5 bg-gray-900 ">
            <h1 className="font-bold text-center text-2xl">Top Payments</h1>
            <div className="payments p-5 md:flex md:flex-col md:items-center md:gap-3">
              {Payments.length === 0 ? (
                <h1 className="text-2xl font-bold text-center">
                  No Payments Yet
                </h1>
              ) : (
                Payments.map((payment, index) => {
                  return (
                    <div
                      key={index}
                      className="md:min-w-[90%] md:flex md:flex-col md:items-center md:my-0 my-3"
                    >
                      <h2 className="text-xl">
                        {payment.PaymentPerson} Paid {payment.PaymentAmount}
                      </h2>
                      <p className="text-lg">
                        Message: {payment.PaymentMessage}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <div className="Right md:w-[49%] md:min-h-0 min-h-56 border-dotted border-2 border-slate-600 rounded-lg md:p-10 p-5 bg-gray-900 ">
            {data ? (
              data.user.UPI_ID.includes("@") ? (
                <>
                  <h1 className="font-bold text-3xl text-center">
                    Share Your Profile Link
                  </h1>
                  <div className="accept_payment">
                    <div className="flex flex-col gap-3 items-center">
                      <div className="bg-gray-800 w-full p-8 rounded-lg my-6 relative">
                        <h1 className="text-xl font-bold my-2">
                          Share your profile link to get raising funds
                        </h1>
                        <input
                          type="text"
                          id="profilelink"
                          className="w-full md:p-3 p-5 md:pr-0 pr-9 rounded-lg border-2 bg-slate-600 border-slate-600"
                          value={`https://get-me-a-chai-pritamstech.vercel.app/${data.user.username}`}
                          disabled
                        />
                        <Copy
                          className="absolute md:top-[90px] md:right-12  copy-button cursor-pointer"
                          onClick={HandleCopy}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full justify-center items-center">
                  <h1 className="text-3xl font-bold text-center">
                    Add Your UPI ID to start accepting payments
                  </h1>
                </div>
              )
            ) : Userdata.UPI_ID.includes("@") ? (
              <>
                <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                <h1 className="font-bold text-3xl text-center">
                  Raise Funds for {Userdata.name}
                </h1>
                <div className="accept_payment">
                  <div className="flex flex-col gap-3 items-center">
                    <form
                      onSubmit={HandlePayment}
                      className="bg-gray-800 w-full p-8 rounded-lg my-6 relative"
                    >
                      <label
                        className="text-lg font-medium"
                        htmlFor="PaymentPerson"
                      >
                        Enter your name
                      </label>
                      <input
                        type="text"
                        className="w-full md:p-3 p-5 md:pr-0 pr-9 rounded-lg border-2 bg-gray-500 text-white border-slate-600 my-2"
                        name="PaymentPerson"
                        id="PaymentPerson"
                        placeholder="Please enter your name here"
                        required
                      />
                      <label
                        className="text-lg font-medium"
                        htmlFor="PaymentMessage"
                      >
                        Enter your message
                      </label>
                      <input
                        type="text"
                        className="w-full md:p-3 p-5 md:pr-0 pr-9 rounded-lg border-2 bg-gray-500 text-white border-slate-600 my-2"
                        name="PaymentMessage"
                        id="PaymentMessage"
                        placeholder="Please enter your message here"
                        required
                      />
                      <label
                        className="text-lg font-medium"
                        htmlFor="PaymentAmount"
                      >
                        Enter payment amount
                      </label>
                      <input
                        type="number"
                        className="w-full md:p-3 p-5 md:pr-0 pr-9 rounded-lg border-2 bg-gray-500 text-white border-slate-600 my-2"
                        name="PaymentAmount"
                        id="PaymentAmount"
                        placeholder="Please enter payment amount here"
                        required
                      />
                      <button
                        type="submit"
                        className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                      >
                        <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Pay
                        </span>
                      </button>
                    </form>
                  </div>
                </div>{" "}
              </>
            ) : (
              <div className="flex h-full justify-center items-center">
                <h1 className="text-3xl font-bold text-center">
                  {params.username} is not accepting funds for now
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : Loading ? (
    <div className="min-h-[80vh] flex justify-center items-center">
      <MyLoader />
    </div>
  ) : (
    <Error statusCode={404} />
  );
};

export default Page;

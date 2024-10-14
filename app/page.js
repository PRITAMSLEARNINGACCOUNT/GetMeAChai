"use client";
import { Upload, DollarSign, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import Typed from "typed.js";

const Page = () => {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Logging in.",
        "Supporting innovative ideas.",
        "Empowering the next big tech.",
        "Fueling creativity and innovation.",
        "Joining a community of tech enthusiasts.",
        "Making a difference with your contribution.",
      ],
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div className=" min-h-[35vh] container mx-auto gap-5 flex flex-col justify-center items-center">
        <h1 className="text-5xl text-center font-bold md:mt-0 mt-5 flex gap-3 items-center justify-center">
          Get Me A Chai{" "}
          <span>
            {" "}
            <Image
              src="/ChaiGIF_2.gif"
              alt="Logo"
              width={45}
              height={45}
              className="rounded-full"
            />
          </span>
        </h1>{" "}
        <div className="text-center p-5 md:p-0 flex flex-col gap-3">
          <p className="text-lg">
            GetMeAChai is a crowdfunding platform for coders. We help coders to
            raise funds for their projects.{" "}
          </p>
          <p>
            We are a team of coders who understand the pain of not having enough
            funds to complete a project.{" "}
          </p>
          <p>
            Lets get started by{" "}
            <Link className="text-blue-700" href="/login" ref={el}></Link>
          </p>
        </div>
      </div>
      <hr className="opacity-20" />
      <div className="min-h-[35vh] flex justify-center items-center">
        <div className="flex md:flex-row flex-col gap-10 md:gap-5 items-center justify-between mx-auto w-[80%]">
          <div className="flex flex-col gap-3 justify-center items-center md:w-[27%]">
            <div className="rounded-full bg-slate-600 p-3 w-fit">
              <Upload size={48} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold my-3">Showcase Your Works</h2>
              <p>
                Upload your works and showcase them to the world.
                <br />
                Raise funds for your projects.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center md:w-[27%]">
            <div className="rounded-full bg-slate-600 p-3 w-fit">
              <DollarSign size={48} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold my-3">Raise Funds</h2>
              <p>
                Get the support you need to bring your ideas to real life
                implementation.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center md:w-[27%]">
            <div className="rounded-full bg-slate-600 p-3 w-fit">
              <Lightbulb size={48} />
            </div>
            <div className="text-center ">
              <h2 className="text-2xl font-bold my-3">Support Others</h2>
              <p>
                Support others for their innovative ideas.
                <br />
                Make a difference with your contribution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="opacity-20" />
      <div className="min-h-[25vh]">
        <div className="my-5">
          <h1 className="text-center font-bold text-xl">About This Platform</h1>
          <p className="md:w-[50%] mx-auto text-lg text-center md:my-3 md:p-0 p-10">
            GetMeAChai is a unique crowdfunding platform tailored specifically
            for developers and their innovative projects. Our mission is to
            empower coders by providing them with the financial support they
            need to bring their ideas to life. As a community of developers, we
            understand the challenges of securing funding for tech projects.
            Whether you&apos;re working on an open-source tool, a groundbreaking
            app, or a creative coding project, GetMeAChai is here to help you
            succeed. Join us today and turn your coding dreams into reality by
            logging in and starting your campaign.
          </p>
        </div>
      </div>
    </>
  );
};

export default Page;

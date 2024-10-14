"use client";
import { useEffect, useState } from "react";
import fetchData from "@/server/FetchData";
import Error from "next/error";

const Page = ({ params }) => {
  const [val, setsuccess] = useState(false);
  async function handle() {
    let { success } = await fetchData(params);
    if (success) {
      setsuccess(true);
    }
  }
  useEffect(() => {
    handle();
  }, []);

  return val ? (
    <div>
      <h1>Success</h1>
    </div>
  ) : (
    <Error statusCode={404} />
  );
};

export default Page;

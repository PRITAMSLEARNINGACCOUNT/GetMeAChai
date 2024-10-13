"use client";
import { useEffect } from "react";
import fetchData from "@/server/FetchData";
const page = ({ params }) => {
  fetchData(params);

  return <div>page</div>;
};

export default page;

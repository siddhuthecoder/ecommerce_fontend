import React from "react";
import Slidebar from "../components/sidebar";
import Products from "../components/Products/Products";
import { FaBoxOpen } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex w-full">
      <Slidebar />
      <div className="px-[10px] pt-5 w-full bg-[#f4f4f5] min-h-[100vh]">
        <h1 className="mt-3 text-2xl font-semibold text-[#13395e] flex gap-2 items-center">
          <FaBoxOpen />
          Products
        </h1>
        <Products />
      </div>
    </div>
  );
};

export default Home;

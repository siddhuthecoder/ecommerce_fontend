import React from "react";
import Slidebar from "../components/sidebar";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "../components/Cart/Cart";

const Card = () => {
  return (
    <div className="flex w-full">
      <Slidebar />
      <div className="px-[10px] w-full pt-5 bg-[#f4f4f5] min-h-[100vh]">
        <h1 className="mt-3 text-2xl font-semibold text-[#13395e] flex gap-2 items-center">
          <FaShoppingCart />
          My Cart
        </h1>
        <Cart />
      </div>
    </div>
  );
};

export default Card;

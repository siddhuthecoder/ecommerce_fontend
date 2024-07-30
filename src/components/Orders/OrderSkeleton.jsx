import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderSkeleton = () => {
  return (
    <div className="bg-slate-100 mb-5 p-4 rounded shadow-md">
      <h1 className="w-[50%]">
        <Skeleton />
      </h1>
      <h1 className="w-[40%]">
        <Skeleton />
      </h1>
      <h1 className="w-[40%]">
        <Skeleton />
      </h1>
      <h2 className="w-[20%]">
        <Skeleton />
      </h2>
      <ol>
        <Skeleton count={3} />
      </ol>
    </div>
  );
};

export default OrderSkeleton;

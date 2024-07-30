import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="bg-slate-100 mb-5 p-4 rounded shadow-md">
      <h1 className="text-xl font-semibold w-[50%]">
        <Skeleton />
      </h1>
      <p className="text-sm">
        <Skeleton count={2} />
      </p>
      <div className="w-[100px]">
        <Skeleton />
        <Skeleton />
      </div>
      <button className="py-1.5 px-2 w-[30%]">
        <Skeleton />
      </button>
    </div>
  );
};

export default ProductSkeleton;

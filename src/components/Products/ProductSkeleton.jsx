import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="bg-slate-100 mb-3 p-4 rounded shadow-md flex flex-col">
      <h2 className="text-[1.15rem] font-semibold w-[50%]">
        <Skeleton />
      </h2>
      <h2 className="text-lg font-semibold w-[20px]">
        <Skeleton />
      </h2>
      <p className="text-sm pb-2">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <div className="w-[50%]">
          <Skeleton />
        </div>
      </p>
      <div className="py-[0.4rem] rounded my-1">
        <Skeleton />
      </div>
      <div className="py-[0.4rem] rounded">
        <Skeleton />
      </div>
    </div>
  );
};

export default ProductSkeleton;

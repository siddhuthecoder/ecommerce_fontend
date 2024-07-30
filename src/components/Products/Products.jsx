import React, { useEffect } from "react";
import ProductCard from "./ProductCard";

import { toast } from "react-hot-toast";
import { fetchProducts } from "../../store/productSlice";
import { useSelector, useDispatch } from "react-redux";
import ProductSkeleton from "./ProductSkeleton";
import { useNavigate } from "react-router-dom/dist";

const Products = () => {
  const productError = useSelector((state) => state.products.error);
  const productData = useSelector((state) => state.products.data);
  const productState = useSelector((state) => state.products.status);

  const navigate = useNavigate();

  //   useEffect(() => {
  //     console.log(productData);
  //     console.log(productState);
  //     console.log(productError);
  //   }, [productData, productState, productError]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (productState === "idle") {
      dispatch(fetchProducts(token));
    }
  }, [dispatch, productState]);

  if (productError && productError !== "Invalid token") {
    return (
      <div className="py-10 w-full flex items-center justify-center flex-col">
        <h1 className="text-lg font-semibold mb-2 max-w-[450px] text-center">
          An Error Occured While Loading Cart Check your Internet Connection and
          try again
        </h1>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="text-white rounded py-1 px-2 text-sm bg-green-600 hover:bg-green-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {productState === "loaded" && productData ? (
        <>
          {productData.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </>
      ) : (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      )}
    </div>
  );
};

export default Products;

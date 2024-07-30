import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import OrderSkeleton from "./OrderSkeleton";

import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../store/orderSlice";
import { Link, useNavigate } from "react-router-dom/dist";
import { toast } from "react-hot-toast";

const Order = () => {
  const orderError = useSelector((state) => state.order.error);
  const userData = useSelector((state) => state.user.user);
  const orderData = useSelector((state) => state.order.data);
  const orderState = useSelector((state) => state.order.status);

  // useEffect(() => {
  //   console.log(orderData);
  //   console.log(orderState);
  //   console.log(orderError);
  // }, [orderData, orderState, orderError]);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && orderState === "idle") {
      dispatch(fetchOrders(token));
    }
  }, [dispatch, orderState]);

  const navigate = useNavigate();
  useEffect(() => {
    if (orderError && orderError === "Invalid token") {
      toast.error("Token Expired");
      navigate("/login");
    }
  }, [orderError, navigate]);

  if (!userData) {
    return (
      <div className="py-10 w-full flex items-center justify-center flex-col">
        <h1 className="text-lg font-semibold mb-2">
          Please Login to View Contents
        </h1>
        <Link to="/login">
          <button className="text-white rounded py-1 px-2 text-sm bg-green-600 hover:bg-green-700">
            Log In
          </button>
        </Link>
      </div>
    );
  }

  if (orderError && orderError !== "Invalid token") {
    return (
      <div className="py-10 w-full flex items-center justify-center flex-col">
        <h1 className="text-lg font-semibold mb-2 max-w-[150px]">
          And Error Occured While Loading Cart Check your Internet Connection
          and try again
        </h1>
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="text-white rounded py-1 px-2 text-sm bg-green-600 hover:bg-green-700"
        >
          Log In
        </button>
      </div>
    );
  }

  return (
    <div className="py-5">
      {orderState === "loaded" && orderData ? (
        <>
          {orderData.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </>
      ) : (
        <>
          <OrderSkeleton />
          <OrderSkeleton />
        </>
      )}
    </div>
  );
};

export default Order;

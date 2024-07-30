import React, { useEffect } from "react";
import CartCard from "./CartCard";
import CartSkeleton from "./CartSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom/dist";
import { toast } from "react-hot-toast";

const Cart = () => {
  const cartError = useSelector((state) => state.cart.error);
  const cartData = useSelector((state) => state.cart.data);
  const userData = useSelector((state) => state.user.user);
  const cartState = useSelector((state) => state.cart.status);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(cartError, cartData, cartState);
  }, [cartData, cartError, cartState]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && cartState === "idle") {
      dispatch(fetchCart(token));
    }
  }, [dispatch, cartState]);

  const navigate = useNavigate();
  useEffect(() => {
    if (cartError && cartError === "Invalid token") {
      toast.error("Token Expired");
      navigate("/login");
    }
  }, [cartError, navigate]);

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

  if (cartError && cartError !== "Invalid token") {
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
    <div className="py-5">
      {cartState === "loading" ? (
        <>
          <CartSkeleton />
          <CartSkeleton />
          <CartSkeleton />
          <CartSkeleton />
        </>
      ) : cartState === "loaded" && cartData && cartData.length > 0 ? (
        cartData.map((cart) => (
          <CartCard cart={cart} key={cart.productId._id} />
        ))
      ) : (
        <p className="py-5 text-xl font-semibold text-center w-full">
          No items in the cart.
        </p>
      )}
    </div>
  );
};

export default Cart;

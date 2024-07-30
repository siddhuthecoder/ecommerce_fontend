import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchCart } from "../../store/cartSlice";

const CartCard = ({ cart }) => {
  const [deletingProduct, setDeletingProduct] = useState(false);
  const dispatch = useDispatch();

  const removeProduct = async (product) => {
    if (
      window.confirm("Are you sure you want to delete this item to your cart?")
    ) {
      const token = localStorage.getItem("token");
      setDeletingProduct(true);

      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/cart/${product._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(res.data.message);
        dispatch(fetchCart(token));
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setDeletingProduct(false);
      }
    }
  };

  return (
    <div className="bg-slate-100 mb-5 p-4 rounded shadow-md">
      <h1 className="text-xl font-semibold">{cart.productId.name}</h1>
      <p className="text-sm">{cart.productId.description}</p>
      <div className="flex mt-2  flex-wrap gap-4">
        <p className="text-base font-semibold">Quantity :- {cart.quantity}</p>
        <p className="text-base font-semibold">
          Price :- {cart.productId.price}
        </p>
      </div>
      <button
        className="text-sm py-1.5 px-2 mt-1 bg-red-500 hover:bg-red-600 rounded text-white"
        onClick={() => removeProduct(cart.productId)}
        disabled={deletingProduct}
      >
        {deletingProduct ? "Deleting...." : "Remove from Cart"}
      </button>
    </div>
  );
};

export default CartCard;

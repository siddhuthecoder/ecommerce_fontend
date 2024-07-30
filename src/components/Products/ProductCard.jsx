import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { fetchCart } from "../../store/cartSlice";
import { fetchOrders } from "../../store/orderSlice";

const ProductCard = ({ product }) => {
  const [addingToCart, setAddingToCart] = useState(false);
  const dispatch = useDispatch();

  const addToCart = async (e) => {
    e.preventDefault();
    if (
      window.confirm("Are you sure you want to add this item to your cart?")
    ) {
      const token = localStorage.getItem("token");
      setAddingToCart(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/cart`,
          {
            productId: product._id,
            quantity: 1,
          },
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
        setAddingToCart(false);
      }
    }
  };

  const buyItem = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login to purchase products");
        return;
      }

      if (window.confirm("Are you sure you want to buy this item?")) {
        const {
          data: { order },
        } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/orders/payment`,
          { totalPrice: product.price },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          name: product.name,
          description: product.description,
          order_id: order.id,
          handler: async function (response) {
            try {
              const res = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/orders`,
                {
                  razorpay_payment_id: response.razorpay_payment_id,
                  order_id: order.id,
                  totalPrice: order.amount,
                  razorpay_signature: response.razorpay_signature,
                  products: [
                    {
                      productId: product._id,
                      quantity: 1,
                    },
                  ],
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.success(res.data.message || "Order Received!");
              dispatch(fetchOrders(token));
            } catch (error) {
              toast.error(
                error.response?.data?.message ||
                  error.message ||
                  "Payment verification failed. Please try again."
              );
            }
          },
          prefill: {
            name: product.name,
            email: "", // Fill if you have user email
            contact: "", // Fill if you have user contact
          },
          theme: {
            color: "#F529A3",
          },
        };

        console.log("Razorpay Options:", options);

        if (window.Razorpay) {
          const razor = new window.Razorpay(options);
          razor.on("payment.failed", function (response) {
            console.log("Payment failed response:", response);
            toast.error(`Payment failed: ${response.error.description}`);
          });

          razor.open();
        } else {
          console.error("Razorpay SDK not loaded.");
        }
      }
    } catch (error) {
      console.error("Error during buyItem execution:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to process payment. Please try again."
      );
    }
  };

  return (
    <>
      <div className="bg-slate-100 mb-3 p-4 rounded shadow-md flex flex-col h-[fit-content]">
        <h2 className="text-[1.15rem] font-semibold">{product.name}</h2>
        <h2 className="text-lg font-semibold">$ {product.price}</h2>
        <p className="text-sm pb-2">{product.description}</p>
        <button
          className="bg-yellow-300 py-[0.4rem] hover:bg-yellow-400 rounded my-1 text-sm flex gap-2 items-center justify-center"
          onClick={addToCart}
          disabled={addingToCart}
        >
          <FaCartShopping />
          {addingToCart ? "Adding..." : "Add to cart"}
        </button>
        <button
          onClick={buyItem}
          className="bg-green-400 py-[0.4rem] hover:bg-green-500 rounded text-sm flex gap-2 items-center justify-center"
        >
          <FaDollarSign />
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ProductCard;

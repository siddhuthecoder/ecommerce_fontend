import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "./store/userSlice";
import Preloader from "./components/Preloader";

import { Login, Register, Home, Cart, Orders } from "./pages";

function App() {
  const userError = useSelector((state) => state.user.error);
  const userState = useSelector((state) => state.user.status);

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (userState === "idle") {
      dispatch(fetchUser(token));
    }
  }, [dispatch, userState]);

  useEffect(() => {
    if (userError) {
      if (userError !== "Not Logged In") {
        toast.error(userError);
      }
      localStorage.removeItem("token");
    }
  }, [userError]);

  return (
    <>
      <Toaster />
      {userState === "loaded" ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;

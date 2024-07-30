import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../store/userSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchOrders, orderActions } from "../store/orderSlice";
import { cartActions, fetchCart } from "../store/cartSlice";

const Slidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async (e) => {
    const token = localStorage.getItem("token");
    setIsLoggingOut(true);

    try {
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      dispatch(UserActions.removeUser());
      dispatch(orderActions.removeOrder());
      dispatch(cartActions.removeCart());
      toast.success("User Logged out");
      navigate("/login");
    } catch (error) {
      if (error?.response?.data?.message === "Invalid token") {
        toast.success("Logged Out Successfully");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(error?.response?.data?.message || error.message);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <Sidebar style={{ position: "sticky" }} className="sidebar">
        <div className="sidebar-header bg-[#e2e8f0] flex items-center justify-center h-[80px] text-3xl max-md:text-lg max-md:font-semibold">
          Amora
        </div>
        <Menu>
          <MenuItem
            component={<Link to="/" />}
            active={currentPath === "/"}
            style={{
              backgroundColor: currentPath === "/" ? "#e2e8f0" : "transparent",
              color: currentPath === "/" ? "#000" : "inherit",
            }}
          >
            Home
          </MenuItem>
          <MenuItem
            component={<Link to="/cart" />}
            active={currentPath === "/cart"}
            style={{
              backgroundColor:
                currentPath === "/cart" ? "#e2e8f0" : "transparent",
              color: currentPath === "/cart" ? "#000" : "inherit",
            }}
          >
            Cart
          </MenuItem>
          <MenuItem
            component={<Link to="/orders" />}
            active={currentPath === "/orders"}
            style={{
              backgroundColor:
                currentPath === "/orders" ? "#e2e8f0" : "transparent",
              color: currentPath === "/orders" ? "#000" : "inherit",
            }}
          >
            Orders
          </MenuItem>
          {localStorage.getItem("token") ? (
            <MenuItem
              onClick={logout}
              style={{
                backgroundColor: "transparent",
                color: "inherit",
              }}
              className="hover:bg-[#e2e8f0]"
            >
              {isLoggingOut ? "Logging out..." : " Logout"}
            </MenuItem>
          ) : (
            <MenuItem
              component={<Link to="/login" />}
              style={{
                backgroundColor:
                  currentPath === "/orders" ? "#e2e8f0" : "transparent",
                color: currentPath === "/orders" ? "#000" : "inherit",
              }}
            >
              Log In
            </MenuItem>
          )}
        </Menu>
      </Sidebar>
    </>
  );
};

export default Slidebar;

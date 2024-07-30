import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserActions } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom/dist";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.user);
  useEffect(() => {
    if (userData) {
      console.log(userData);
      navigate("/");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (error) {
      setTimeout(() => setError(null), 2500);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email === "" || password === "") {
      setError("All Fields are required");
      setLoading(false);
      return;
    }

    // fetching User
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      dispatch(UserActions.setUser(res.data.user));
      toast.success(res.data.message);

      // go to home page
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
    } finally {
      setPassword("");
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[100vh] bg-[#eaeaea] flex justify-center items-center">
      <div className="w-[95%] max-w-[380px] px-4 flex justify-center items-center flex-col bg-white rounded-md">
        <h1 className="mt-3 text-[1.7rem] font-semibold">Amora</h1>
        <h1 className="text-xl font-semibold">Login</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-0 text-md font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block mb-2 text-md font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Enter Password"
            />
            {error && (
              <p className="text-red-600 mt-2 mb-0 pb-0 font-semibold text-md">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-full mt-1 font-medium rounded text-md px-5 py-1.5 text-center"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <p className="pt-2 pb-4 text-[14px]">
            Don't have an account ?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;

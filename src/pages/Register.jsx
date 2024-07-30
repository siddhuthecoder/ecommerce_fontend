import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userData = useSelector((state) => state.user.user);
  useEffect(() => {
    if (userData) {
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
    if (username === "" || email === "" || password === "") {
      setError("All Fields are required");
      setLoading(false);
      return;
    }

    if (password !== cpassword) {
      setError("Passwords are not matching");
      setLoading(false);
      return;
    }

    // fetching User
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          username,
          password,
          email,
        }
      );

      toast.success(res.data.message);
      // go to login page
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data.message || error.message);
    } finally {
      setUsername("");
      setEmail("");
      setLoading(false);
    }
  };

  return (
    <main className="w-full min-h-[100vh] bg-[#eaeaea] flex justify-center items-center">
      <div className="w-[95%] max-w-[400px] px-4 flex justify-center items-center flex-col bg-white rounded-md">
        <h1 className="mt-3 text-[1.7rem] font-semibold">Amora</h1>
        <h1 className="text-xl font-semibold">Register</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="id"
              className="block mb-0 capitalize text-md font-medium text-gray-900"
            >
              username
            </label>
            <input
              type="text"
              id="id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Choose a username"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-0 capitalize text-md font-medium text-gray-900"
            >
              email
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
          <div className="flex items-center justify-center max-md:flex-col gap-2">
            <div className="mb-3 max-md:mb-2 max-md:w-full">
              <label
                htmlFor="password"
                className="block mb-0 capitalize text-md font-medium text-gray-900"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Choose Password"
              />
            </div>
            <div className="mb-3 max-md:w-full">
              <label
                htmlFor="cpassword"
                className="block mb-0 capitalize text-md font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-600 mt-0 mb-2 font-semibold text-md">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 w-full font-medium rounded text-md px-5 py-1.5 text-center"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <p className="pt-2 pb-4 text-[14px]">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;

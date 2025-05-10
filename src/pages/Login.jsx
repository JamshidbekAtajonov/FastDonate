import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";
import axios from "axios";
import BASE_URL from "../config.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${BASE_URL}/auth/login`, {
        username,
        password,
      })
      .then((response) => {
        Cookies.set("token", response.data.token);
        location.href = "/";
      })
      .catch((err) => {
        toast.error("Parol va username ni tekshirib yana urinib ko'ring");
      });
  };

  return (
    <div className="my-[50px] flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6 gap-2">
          <img
            src={Logo}
            alt=""
            style={{ width: "50px", height: "auto", borderRadius: "10px" }}
          />
          <h1 className="text-2xl font-semibold text-white">FastDonate</h1>
        </div>
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Username
            </label>
            <input
              type="text"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

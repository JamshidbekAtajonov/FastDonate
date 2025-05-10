import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";
import axios from "axios";
import BASE_URL from "../config.js";
import Cookies from "js-cookie";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password };

    if (/^[a-zA-Z0-9]+$/.test(username) && password.length > 8) {
      await axios
        .post(`${BASE_URL}/auth/register`, userData)
        .then((response) => {
          setInputError("");
          Cookies.set("token", response.data.token);
          location.href = "/";
        })
        .catch((err) => {
          if (err.response.data) {
            if (
              err.response.data.detail === "email or username already exists"
            ) {
              setInputError("Username yoki email allaqachon mavjud");
            }
          }
        });

      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      setInputError(
        "Username faqatgina harf va raqamlardan iborat bo'lishi kerak. Parol esa 8 ta belgidan kam bo'lmasligi kerak."
      );
    }

    // navigate("/profile");
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
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
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
            Register
          </button>
          <p className="text-red-600 mt-[8px]">{inputError}</p>
        </form>
        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

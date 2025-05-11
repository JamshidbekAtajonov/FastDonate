import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config.js";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASE_URL}/auth/register`, {
        username,
        email,
        password,
      });
      toast.success(t("registration_success"));
      location.href = "/login";
    } catch (err) {
      toast.error(t("registration_error"));
    }
  };

  return (
    <div className="my-[50px] flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          {t("register")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">
              {t("username")}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={t("enter_your_username")}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={t("enter_your_email")}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              {t("password")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder={t("enter_your_password")}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
          >
            {t("register")}
          </button>
        </form>
        <p className="text-gray-400 text-center mt-4">
          {t("already_have_account")}{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Balance = () => {
  const userData = JSON.parse(localStorage.getItem("userData")) || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          
          <Link
            to="/"
            className="text-green-400 hover:text-green-500 transition-colors"
          >
            Home
          </Link>
        </div>
      </nav>

      <div className="flex-grow flex">
        <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                <span>👤</span>
              </div>
              <div className="ml-3">
                <p className="text-white font-semibold">
                  {userData.username || "Aspect07"}
                </p>
                <p className="text-gray-400 text-sm">
                  {userData.email || "habibullayevferuz2001@gmail.com"}
                </p>
                <p className="text-yellow-400 text-sm flex items-center">
                  {userData.balance || "12000"} <span className="ml-1">💰</span>
                </p>
              </div>
            </div>
            <nav>
              <ul>
                <li>
                  <Link
                    to="/profile"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    Shaxsiy ma'lumotlar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/balance"
                    className="block py-2 px-4 bg-blue-500 text-white rounded mb-2"
                  >
                    Balans
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                  >
                    Xarid tarixi
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400 transition-colors flex items-center"
          >
            <span className="mr-2">⏎</span> Chiqish
          </button>
        </div>

        <div className="flex-grow p-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Balans</h2>
<<<<<<< HEAD
            <p className="text-gray-400">
              Balance details will be displayed here.
            </p>
=======
            <p className="text-gray-400">Hozircha hech qanday ma'lumot yo'q!</p>
>>>>>>> 458d70a422f95fd6cded8435c8a4171f2505e080
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;

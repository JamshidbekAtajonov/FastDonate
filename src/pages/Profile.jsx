import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();

  const handleLogout = () => {
    Cookies.remove("token");
    location.href = "/login";
  };

  useEffect(() => {
    const token1 = Cookies.get("token");

    async function getData() {
      if (token1) {
        await axios
          .get("/auth/me", {
            headers: {
              Authorization: `${token1}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setUserData(res.data);
          })
          .catch((err) => {
            toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
          });
      }
    }

    getData();
  }, []);

  return (
    <>
      {userData ? (
        <div className="min-h-screen flex flex-col bg-gray-900">
          <div className="flex-grow flex">
            <div className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                    <span>👤</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">
                      {userData.username}
                    </p>
                    <p className="text-gray-400 text-sm">{userData.email}</p>
                    <p className="text-yellow-400 text-sm flex items-center">
                      {userData.balance} <span className="ml-1">💰</span>
                    </p>
                  </div>
                </div>
                <nav>
                  <ul>
                    <li>
                      <Link
                        to="/profile"
                        className="block py-2 px-4 bg-blue-500 text-white rounded mb-2"
                      >
                        {t("personal_info")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/balance"
                        className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                      >
                        {t("balance")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/history"
                        className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2"
                      >
                        {t("purchase_history")}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400 transition-colors flex items-center"
              >
                <span className="mr-2">⏎</span> {t("logout")}
              </button>
            </div>

            <div className="flex-grow px-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {t("personal_info")}
                </h2>
                <div className="text-gray-400 space-y-4">
                  <div>
                    <p className="text-sm">{t("username")}</p>
                    <p className="text-white">
                      {userData.username || t("default_username")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">{t("email")}</p>
                    <p className="text-white">
                      {userData.email || t("default_email")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">{t("balance")}</p>
                    <p className="text-yellow-400 flex items-center">
                      {userData.balance || "12000"}{" "}
                      <span className="ml-1">💰</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ClipLoader />
      )}
    </>
  );
};

export default Profile;

// packages
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const [token, setToken] = useState(null);
  const [language, setLanguage] = useState(Cookies.get("lang") || "uz");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token1 = Cookies.get("token");

    setToken(token1);

    async function getData() {
      if (token1) {
        await axios
          .get("/auth/me", {
            headers: {
              Authorization: `${token1}`,
            },
          })
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
            toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
          });
      }
    }

    getData();
  }, []);

  useEffect(() => {
    Cookies.set("lang", language);
  }, [language]);

  function handleChangeLanguage(lang) {
    setLanguage(lang);
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-sm py-5 z-50 ">
      <div className="main-container mx-auto flex justify-between items-center px-4 md:px-8">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => (location.href = "/")}
        >
          <img src="/logo.png" width={50} height={50} alt="FastDonate Logo" />
          <p className="font-bold text-xl md:text-2xl">FastDonate</p>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-3">
            {["en", "ru", "uz"].map((lang, idx) => (
              <p
                key={lang}
                className={`${
                  (lang === language || (language === "null" && idx === 2)) &&
                  "bg-blue-700 px-[15px] py-[10px] rounded-[8px]"
                } transition cursor-pointer`}
                onClick={() => handleChangeLanguage(lang)}
              >
                {lang.toUpperCase()}
              </p>
            ))}
          </div>

          {token ? (
            <div
              className="text-blue-700 font-medium cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user && user.username}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-500 transition px-6 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-500 transition px-6 py-2 rounded"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4">
          <div className="flex w-full gap-3">
            <div className="flex w-full items-center gap-[20px]">
              {["en", "ru", "uz"].map((lang, idx) => (
                <p
                  key={lang}
                  className={`${
                    (lang === language || (language === "null" && idx === 2)) &&
                    "bg-blue-700 px-[15px] py-[10px] rounded-[8px]"
                  } transition cursor-pointer`}
                  onClick={() => handleChangeLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </p>
              ))}
            </div>

            <div className="flex justify-between">
              {token ? (
                <div
                  className="text-blue-700 font-medium mt-2 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  {user && user.username}
                </div>
              ) : (
                <div className="flex gap-2 w-full mt-2">
                  <button className="w-full text-white bg-blue-700 hover:bg-blue-500 transition px-6 py-2 rounded">
                    Login
                  </button>
                  <button className="w-full text-white bg-blue-700 hover:bg-blue-500 transition px-6 py-2 rounded">
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

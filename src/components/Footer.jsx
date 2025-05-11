import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "/logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#1A1E2E] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2">
            <img
              src={Logo}
              alt=""
              style={{ width: "50px", height: "auto", borderRadius: "10px" }}
            />
            <span className="text-lg font-semibold">FastDonate</span>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            {t("footer.description")}
          </p>
        </div>

        {/* Games */}
        <div>
          <h3 className="text-sm font-semibold mb-2">{t("footer.games")}</h3>
          <ul className="text-sm text-gray-300">
            <li>{t("footer.mobile_legends")}</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-2">
            {t("footer.contact_us")}
          </h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>
              <a
                href="mailto:support@fastdonate.su"
                className="hover:text-green-400 transition-colors"
              >
                support@fastdonate.su
              </a>
            </li>
            <li>
              <a
                href="https://t.me/FastDonate_Admin"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400 transition-colors"
              >
                Telegram: @FastDonate_Admin
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        © 2025 FastDonate. {t("footer.rights_reserved")}
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1A1E2E] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2">
            <div className="bg-cyan-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
              F
            </div>
            <span className="text-lg font-semibold">FastDonate</span>
          </div>
          <p className="mt-2 text-sm text-gray-300">
            O'yin va dasturiy hisoblaringizni to‘ldirishning tez va xavfsiz usuli
          </p>
        </div>

        {/* Games */}
        <div>
          <h3 className="text-sm font-semibold mb-2">O'yinlar</h3>
          <ul className="text-sm text-gray-300">
            <li>Mobile Legends</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Biz bilan bog'laning</h3>
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
        © 2025 FastDonate. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
};

export default Footer;

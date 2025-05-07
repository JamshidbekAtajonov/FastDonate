"use client";

import { useState } from "react";
import {
  GamepadIcon as GameController,
  FileText,
  Download,
  Star,
} from "lucide-react";

// Sample data for games
const games = [
  {
    id: 1,
    title: "Mobile Legends: Bang Bang",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-legends.jpg-eQDkNCPNSOT1CUGKHm1Xf2TnYYWnUx.jpeg",
    badge: "",
    buttonText: "Diamonds",
  },
];

// Sample data for applications
const applications = [
  // {
  //   id: 1,
  //   title: "TikTok",
  //   image: "/placeholder.svg?height=400&width=400",
  //   downloads: "500M+",
  //   rating: 4.5,
  // },
  // {
  //   id: 2,
  //   title: "Instagram",
  //   image: "/placeholder.svg?height=400&width=400",
  //   downloads: "1B+",
  //   rating: 4.2,
  // },
  // {
  //   id: 3,
  //   title: "Telegram",
  //   image: "/placeholder.svg?height=400&width=400",
  //   downloads: "700M+",
  //   rating: 4.8,
  // },
];

export default function MobileLegends() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("games"); // "games" or "apps"

  return (
    <div className="flex flex-col text-white mt-[70px]">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          className={`flex items-center gap-2 px-4 py-3 ${
            activeTab === "games"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("games")}
        >
          <GameController className="w-5 h-5" />
          <span>O&apos;yinlar</span>
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-3 ${
            activeTab === "apps"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("apps")}
        >
          <FileText className="w-5 h-5" />
          <span>Dasturlar</span>
        </button>
      </div>

      {/* Content Container */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-auto">
        {/* Games Content */}
        {activeTab === "games" &&
          games.map((game) => (
            <div
              key={game.id}
              className="relative overflow-hidden rounded-lg h-64 group"
            >
              {/* Game Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Game Title */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-xl font-bold mb-2">{game.title}</h3>

                {/* Button */}
                <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full transition-colors">
                  <span className="text-blue-300">💎</span> {game.buttonText}
                </button>
              </div>

              {/* Badge */}
              <div className="absolute bottom-4 right-4">
                <span className="text-yellow-300 font-bold text-xl">
                  {game.badge}
                </span>
              </div>
            </div>
          ))}

        {/* Applications Content */}
        {activeTab === "apps" &&
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-gray-800 rounded-lg overflow-hidden group"
            >
              {/* App Image */}
              <div className="relative h-40 w-full">
                <Image
                  src={app.image || "/placeholder.svg"}
                  alt={app.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* App Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{app.title}</h3>

                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{app.downloads}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{app.rating}</span>
                  </div>
                </div>

                <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

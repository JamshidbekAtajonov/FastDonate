import React, { useState } from "react";

const standardPackages = [
  { total: "7740+1548", bonus: 1548, price: 42555 },
  { total: "4649+883", bonus: 883, price: 25625 },
  { total: "3099+589", bonus: 589, price: 16970 },
  { total: "1860+335", bonus: 335, price: 10175 },
  { total: "625+81", bonus: 81, price: 3360 },
  { total: "234+23", bonus: 23, price: 1245 },
  { total: "78+8", bonus: 8, price: 420 },
];

const additionalPackages = [
  { total: "500+65", bonus: 65, price: 2700 },
  { total: "250+25", bonus: 25, price: 1315 },
  { total: "150+15", bonus: 15, price: 820 },
  { total: "50+5", bonus: 5, price: 270 },
];
export default function DiamondPackages() {
  const [standardQuantities, setStandardQuantities] = useState(Array(standardPackages.length).fill(0));
  const [additionalQuantities, setAdditionalQuantities] = useState(Array(additionalPackages.length).fill(0));
  const [weeklyPassQuantityArray, setWeeklyPassQuantityArray] = useState([0]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column: Mobile Legends Information */}
        <div className="bg-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl shadow-xl md:sticky md:top-6 md:h-fit">
          <div className="flex items-center gap-4 mb-4">
            <img
              src='https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-legends.jpg-eQDkNCPNSOT1CUGKHm1Xf2TnYYWnUx.jpeg'
              alt="Mobile Legends Icon"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold">Mobile Legends: Bang Bang Diamonds</h1>
          </div>
          <p className="text-sm mb-4 text-gray-300">
            Mobile Legends: Bang Bang — bu mobil telefonlar uchun mo'ljallangan ko'p o'yinchili onlayn jang maydoni (MOBA) o'yini. O'yin bepul, monetizatsiya faqat o'yindagi xaridlar, masalan, skinlar va qahramonlar orqali amalga oshiriladi.
          </p>
          <p className="text-sm mb-4 text-gray-300">
            Mobile Legends olmoslarini xarid qiling va o'yin ichidagi noyob imkoniyatlardan foydalaning! Bizning xizmatimiz orqali olmoslarni xavfsiz va tez xarid qilishingiz mumkin.
          </p>
          <div className="bg-gray-700 p-3 rounded-lg mb-4">
            <p className="text-sm font-semibold text-green-400">Barcha mintaqalarda sotib olish</p>
            <p className="text-xs text-gray-400">Tezkor yetkazib berish.</p>
          </div>
          <ul className="text-sm space-y-2 mb-4">
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Mobile Legends uchun olmoslarni eng yaxshi narxlarda xarid qiling
            </li>
            <li className="flex items-center">
              <span className="text-green-400 mr-2">✓</span>
              Har qanday mintaqaga tez yetkazib berish
            </li>
          </ul>
        </div>

        {/* Right Column: All Packages */}
        <div className="space-y-8">
          {/* Standard Packages Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Standart paketlar</h3>
            <div className="space-y-4">
              {standardPackages.map((pkg, i) => {
                const base = parseInt(pkg.total.split("+")[0]);
                const total = base * standardQuantities[i];
                const bonus = pkg.bonus * standardQuantities[i];

                return (
                  <div
                    key={`standard-${i}`}
                    className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-bold">Diamond {pkg.total}</div>
                        <div className="text-sm text-blue-300">~{pkg.bonus} Bonus Diamonds</div>
                      </div>
                      {standardQuantities[i] > 0 && (
                        <div className="text-right text-xs text-blue-400">
                          Jami: {total}+{bonus}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-yellow-300 font-semibold">{pkg.price.toLocaleString()} 🪙</div>
                      {standardQuantities[i] === 0 ? (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                          onClick={() => {
                            const q = [...standardQuantities];
                            q[i] = 1;
                            setStandardQuantities(q);
                          }}
                        >
                          Tanlash
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                            onClick={() => {
                              const q = [...standardQuantities];
                              if (q[i] > 1) {
                                q[i]--;
                              } else {
                                q[i] = 0;
                              }
                              setStandardQuantities(q);
                            }}
                          >
                            −
                          </button>
                          <span className="px-2 min-w-[20px] text-center">{standardQuantities[i]}</span>
                          <button
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                            onClick={() => {
                              const q = [...standardQuantities];
                              q[i]++;
                              setStandardQuantities(q);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Packages Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Qo'shimcha paketlar</h3>
            <div className="bg-gray-800 p-5 rounded-xl mb-4">
              <div className="text-sm space-y-3">
                <p>
                  1. 01.01.2025 sanasidan boshlab (Server vaqti bo'yicha), Rejalashtirilgan To'ldirish (Recarga) menyusida ma'lum miqdordagi birinchi olmos xaridi (50, 150, 250 va 500 olmos) uchun olmos miqdori ikki baravar oshiriladi.
                </p>
                <p>2. Har bir darajadagi umumiy olingan olmos miqdori:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    50 olmosli birinchi xarid:<br />
                    50 asosiy olmos + 50 bonus olmos = 100 olmos umumiy
                  </li>
                  <li>
                    150 olmosli birinchi xarid:<br />
                    150 asosiy olmos + 150 bonus olmos = 300 olmos umumiy
                  </li>
                  <li>
                    150 olmosli birinchi xarid:<br />
                    250 asosiy olmos + 250 bonus olmos = 500 olmos umumiy
                  </li>
                  <li>
                    500 olmosli birinchi xarid:<br />
                    500 asosiy olmos + 500 bonus olmos = 1000 olmos umumiy
                  </li>
                </ul>
                <p>
                  3. Har bir daraja uchun, olmos bonuslari faqatgina ushbu darajadagi birinchi xaridga nisbatan amal qiladi!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {additionalPackages.map((pkg, i) => {
                const base = parseInt(pkg.total.split("+")[0]);
                const total = base * additionalQuantities[i];
                const bonus = pkg.bonus * additionalQuantities[i];

                return (
                  <div
                    key={`additional-${i}`}
                    className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-lg font-bold">Diamond {pkg.total}</div>
                        <div className="text-sm text-blue-300">+{pkg.bonus} Bonus Diamonds</div>
                      </div>
                      {additionalQuantities[i] > 0 && (
                        <div className="text-right text-xs text-blue-400">
                          Jami: {total}+{bonus}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="text-yellow-300 font-semibold">{pkg.price.toLocaleString()} 🪙</div>
                      {additionalQuantities[i] === 0 ? (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                          onClick={() => {
                            const q = [...additionalQuantities];
                            q[i] = 1;
                            setAdditionalQuantities(q);
                          }}
                        >
                          Select
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                            onClick={() => {
                              const q = [...additionalQuantities];
                              if (q[i] > 1) {
                                q[i]--;
                              } else {
                                q[i] = 0;
                              }
                              setAdditionalQuantities(q);
                            }}
                          >
                            −
                          </button>
                          <span className="px-2 min-w-[20px] text-center">{additionalQuantities[i]}</span>
                          <button
                            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                            onClick={() => {
                              const q = [...additionalQuantities];
                              q[i]++;
                              setAdditionalQuantities(q);
                            }}
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Packages Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Maxsus paketlar</h3>
            <div className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-bold">Haftalik Propusk</div>
                </div>
                {weeklyPassQuantityArray[0] > 0 && (
                  <div className="text-right text-xs text-blue-400">
                    Jami: {weeklyPassQuantityArray[0] * 535}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-yellow-300 font-semibold">535 🪙</div>
                {weeklyPassQuantityArray[0] === 0 ? (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                    onClick={() => {
                      const q = [...weeklyPassQuantityArray];
                      q[0] = 1;
                      setWeeklyPassQuantityArray(q);
                    }}
                  >
                    Select
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                      onClick={() => {
                        const q = [...weeklyPassQuantityArray];
                        if (q[0] > 1) {
                          q[0]--;
                        } else {
                          q[0] = 0;
                        }
                        setWeeklyPassQuantityArray(q);
                      }}
                    >
                      −
                    </button>
                    <span className="px-2 min-w-[20px] text-center">{weeklyPassQuantityArray[0]}</span>
                    <button
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                      onClick={() => {
                        const q = [...weeklyPassQuantityArray];
                        q[0]++;
                        setWeeklyPassQuantityArray(q);
                      }}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Payment Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">To'lov ma'lumotlari</h3>
            <div className="bg-gray-800 p-5 rounded-xl shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Oyinchi IDsi</label>
                  <input
                    type="text"
                    placeholder="123456789"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Server IDsi</label>
                  <input
                    type="text"
                    placeholder="1234"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                <label className="text-sm">
                  Oyinchi ID va Server ID ni o'zgartirish faqat topshiriq mumkin
                </label>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Men mintaqaviy cheklovlar bilan tanishdim va tushundim, Rossiya hisoblarida faqat "Rossiya" mintaqasi ishlaydi.
                Men kerakli mintaqani tanlaganimni va qaytarish faqat sayt balansiga mumkinligini tasdiqlayman (ru ❌).
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm">BALANS: </span>
                  <span className="text-yellow-300 font-semibold">12000 🪙</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">TOTAL: </span>
                  <span className="text-yellow-300 font-semibold">0 🪙</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition">
                    Sotib olish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import BASE_URL from "../config.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function DiamondPackages() {
  const [standardPackages, setStandardPackages] = useState([]);
  const [additionalPackages, setAdditionalPackages] = useState([]);
  const [weekly, setWeekly] = useState();
  const [username, setUsername] = useState(null);
  const [serverId, setServerId] = useState(null);
  const [account, setAccount] = useState(null);
  const [choosedProducts, setChoosedProducts] = useState({});
  const [total, setTotal] = useState(0);

  const [standardQuantities, setStandardQuantities] = useState(
    Array(standardPackages.length).fill(0)
  );
  const [additionalQuantities, setAdditionalQuantities] = useState(
    Array(additionalPackages.length).fill(0)
  );
  const [weeklyPassQuantityArray, setWeeklyPassQuantityArray] = useState([0]);
  const [userBalance, setUserBalance] = useState();

  useEffect(() => {
    async function getData() {
      await axios
        .get(`${BASE_URL}/merchant/price_list`)
        .then((res) => {
          const standard = [];
          const additional = [];

          res.data.prices.forEach((price) => {
            if (price.type === 0) {
              standard.push(price);
            } else if (price.type === 1) {
              additional.push(price);
            } else {
              setWeekly(price);
            }
          });

          setStandardPackages(standard);
          setAdditionalPackages(additional);

          setStandardQuantities(Array(standard.length).fill(0));
          setAdditionalQuantities(Array(additional.length).fill(0));
        })
        .catch((err) => {
          toast.error("Ma'lumotlarni olishda qandaydir xatolik yuz berdi.");
        });

      const token = Cookies.get("token");

      if (token) {
        await axios
          .get("/auth/me", {
            headers: {
              Authorization: `${token}`,
            },
          })
          .then((res) => {
            setUserBalance(res.data.balance);
          })
          .catch((err) => {
            toast.error("Foydalanuvchi ma'lumotlarini olishda xatolik");
          });
      }
    }

    getData();
  }, []);

  async function handleChange(username, serverId) {
    if (username && serverId) {
      axios
        .get(
          `${BASE_URL}/merchant/check_ml?user_id=${username}&server_id=${serverId}`
        )
        .then((res) => {
          if (res.data.name) {
            setAccount(res.data.name);
          } else {
            setAccount("Foydalanuvchi topilmadi");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function handleBuy() {
    const token = Cookies.get("token");

    if (token && account != "Foydalanuvchi topilmadi" && username && serverId) {
      const productsArray = Object.entries(choosedProducts).map(
        ([key, value]) => ({
          id: Number(key),
          count: value,
        })
      );

      await axios.post(
        `${BASE_URL}/merchant/buy`,
        {
          products: productsArray,
          user_id: Number(username),
          server_id: Number(serverId),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      toast.error("Oldin profilga kiring va to'liq to'ldiring.");
    }
  }

  function handleChoose(id, type) {
    const strId = String(id);

    setChoosedProducts((prev) => {
      const currentCount = prev[strId] || 0;
      let newCount = type === "minus" ? currentCount - 1 : currentCount + 1;

      if (newCount <= 0) {
        const updated = { ...prev };
        delete updated[strId];
        return updated;
      }

      return {
        ...prev,
        [strId]: newCount,
      };
    });
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 ">
      <div className="main-container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-gray-800 p-5 md:p-6 rounded-xl md:rounded-2xl shadow-xl md:sticky md:top-6 md:h-fit">
          <div className="flex items-center gap-4 mb-4 mt-16">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mobile-legends.jpg-eQDkNCPNSOT1CUGKHm1Xf2TnYYWnUx.jpeg"
              alt="Mobile Legends Icon"
              className="w-12 h-12"
            />
            <h1 className="text-2xl font-bold">
              Mobile Legends: Bang Bang Diamonds
            </h1>
          </div>
          <p className="text-sm mb-4 text-gray-300">
            Mobile Legends: Bang Bang — bu mobil telefonlar uchun mo'ljallangan
            ko'p o'yinchili onlayn jang maydoni (MOBA) o'yini. O'yin bepul,
            monetizatsiya faqat o'yindagi xaridlar, masalan, skinlar va
            qahramonlar orqali amalga oshiriladi.
          </p>
          <p className="text-sm mb-4 text-gray-300">
            Mobile Legends olmoslarini xarid qiling va o'yin ichidagi noyob
            imkoniyatlardan foydalaning! Bizning xizmatimiz orqali olmoslarni
            xavfsiz va tez xarid qilishingiz mumkin.
          </p>
          <div className="bg-gray-700 p-3 rounded-lg mb-4">
            <p className="text-sm font-semibold text-green-400">
              Barcha mintaqalarda sotib olish
            </p>
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
              {standardPackages.length > 0 &&
                standardPackages.map((pkg, i) => {
                  const total = pkg.diamonds * standardQuantities[i];
                  const bonus = pkg.bonus * standardQuantities[i];

                  return (
                    <div
                      key={`standard-${i}`}
                      className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-bold">{pkg.name}</div>
                          <div className="text-sm text-blue-300">
                            ~{pkg.bonus} Bonus Diamonds
                          </div>
                        </div>
                        {standardQuantities[i] > 0 && (
                          <div className="text-right text-xs text-blue-400">
                            Jami: {total}+{bonus}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-yellow-300 font-semibold">
                          {pkg.price.toLocaleString()} 🪙
                        </div>
                        {standardQuantities[i] === 0 ? (
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                            onClick={() => {
                              const q = [...standardQuantities];
                              q[i] = 1;

                              setStandardQuantities(q);
                              handleChoose(pkg.id, "plus");
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

                                handleChoose(pkg.id, "minus");
                                setTotal((prev) => prev - pkg.price);
                              }}
                            >
                              −
                            </button>
                            <span className="px-2 min-w-[20px] text-center">
                              {standardQuantities[i]}
                            </span>
                            <button
                              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                              onClick={() => {
                                const q = [...standardQuantities];
                                q[i]++;
                                setStandardQuantities(q);
                                handleChoose(pkg.id, "plus");
                                setTotal((prev) => prev + pkg.price);
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
                  1. 01.01.2025 sanasidan boshlab (Server vaqti bo'yicha),
                  Rejalashtirilgan To'ldirish (Recarga) menyusida ma'lum
                  miqdordagi birinchi olmos xaridi (50, 150, 250 va 500 olmos)
                  uchun olmos miqdori ikki baravar oshiriladi.
                </p>
                <p>2. Har bir darajadagi umumiy olingan olmos miqdori:</p>
                <ul className="list-disc ml-5 space-y-2">
                  <li>
                    50 olmosli birinchi xarid:
                    <br />
                    50 asosiy olmos + 50 bonus olmos = 100 olmos umumiy
                  </li>
                  <li>
                    150 olmosli birinchi xarid:
                    <br />
                    150 asosiy olmos + 150 bonus olmos = 300 olmos umumiy
                  </li>
                  <li>
                    150 olmosli birinchi xarid:
                    <br />
                    250 asosiy olmos + 250 bonus olmos = 500 olmos umumiy
                  </li>
                  <li>
                    500 olmosli birinchi xarid:
                    <br />
                    500 asosiy olmos + 500 bonus olmos = 1000 olmos umumiy
                  </li>
                </ul>
                <p>
                  3. Har bir daraja uchun, olmos bonuslari faqatgina ushbu
                  darajadagi birinchi xaridga nisbatan amal qiladi!
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {additionalPackages &&
                additionalPackages.map((pkg, i) => {
                  const total = pkg.diamonds * additionalQuantities[i];
                  const bonus = pkg.bonus * additionalQuantities[i];

                  return (
                    <div
                      key={`additional-${i}`}
                      className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-bold">{pkg.name}</div>
                          <div className="text-sm text-blue-300">
                            +{pkg.bonus} Bonus Diamonds
                          </div>
                        </div>
                        {additionalQuantities[i] > 0 && (
                          <div className="text-right text-xs text-blue-400">
                            Jami: {total}+{bonus}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="text-yellow-300 font-semibold">
                          {pkg.price.toLocaleString()} 🪙
                        </div>
                        {additionalQuantities[i] === 0 ? (
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                            onClick={() => {
                              const q = [...additionalQuantities];
                              q[i] = 1;
                              setAdditionalQuantities(q);
                              handleChoose(pkg.id, "plus");
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

                                handleChoose(pkg.id, "minus");
                                setTotal((prev) => prev - pkg.price);
                              }}
                            >
                              −
                            </button>
                            <span className="px-2 min-w-[20px] text-center">
                              {additionalQuantities[i]}
                            </span>
                            <button
                              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                              onClick={() => {
                                const q = [...additionalQuantities];
                                q[i]++;
                                setAdditionalQuantities(q);

                                handleChoose(pkg.id, "plus");
                                setTotal((prev) => prev + pkg.price);
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
          {weekly && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Maxsus paketlar</h3>
              <div className="bg-gray-800 p-4 rounded-xl shadow hover:bg-gray-700 transition border border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-bold">{weekly.name}</div>
                  </div>
                  {weeklyPassQuantityArray[0] > 0 && (
                    <div className="text-right text-xs text-blue-400">
                      Jami: {weeklyPassQuantityArray[0] * 535}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-yellow-300 font-semibold">
                    {weekly.price} 🪙
                  </div>
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
                          handleChoose(pkg.id, "minus");
                          setTotal((prev) => prev - pkg.price);
                        }}
                      >
                        −
                      </button>
                      <span className="px-2 min-w-[20px] text-center">
                        {weeklyPassQuantityArray[0]}
                      </span>
                      <button
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                        onClick={() => {
                          const q = [...weeklyPassQuantityArray];
                          q[0]++;
                          setWeeklyPassQuantityArray(q);
                          handleChoose(pkg.id, "plus");
                          setTotal((prev) => prev + pkg.price);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Payment Information Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">To'lov ma'lumotlari</h3>
            <div className="bg-gray-800 p-5 rounded-xl shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Oyinchi IDsi
                  </label>
                  <input
                    type="text"
                    placeholder="123456789"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    onChange={(e) => {
                      setUsername(e.target.value);
                      handleChange(e.target.value, serverId);
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Server IDsi
                  </label>
                  <input
                    type="text"
                    placeholder="1234"
                    className="w-full bg-gray-700 text-white p-2 rounded-lg border border-gray-600 focus:outline-none"
                    onChange={(e) => {
                      setServerId(e.target.value);
                      handleChange(username, e.target.value);
                    }}
                  />
                </div>

                <p>{account}</p>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Men mintaqaviy cheklovlar bilan tanishdim va tushundim, Rossiya
                hisoblarida faqat "Rossiya" mintaqasi ishlaydi. Men kerakli
                mintaqani tanlaganimni va qaytarish faqat sayt balansiga
                mumkinligini tasdiqlayman (ru ❌).
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-sm">BALANS: </span>
                  <span className="text-yellow-300 font-semibold">
                    {userBalance && userBalance} 🪙
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">TOTAL: </span>
                  <span className="text-yellow-300 font-semibold">
                    {total} 🪙
                  </span>
                  <a
                    onClick={() => handleBuy()}
                    href="https://t.me/FastDonate_Admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg transition"
                  >
                    Sotib Olish
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

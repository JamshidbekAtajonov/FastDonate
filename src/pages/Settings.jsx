import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
    const [theme, setTheme] = useState('dark');
    const [userData, setUserData] = useState(() => {
        return JSON.parse(localStorage.getItem('userData')) || {};
    });

    useEffect(() => {
        if (userData.settings?.theme) {
            setTheme(userData.settings.theme);
        }
    }, [userData]);

    const handleSave = () => {
        const updatedUserData = { ...userData, settings: { theme } };
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-green-400 text-2xl">ⓕ</span>
                        <h1 className="text-xl font-semibold text-white">FastDonate</h1>
                    </div>
                    <Link to="/home" className="text-green-400 hover:text-green-500 transition-colors">
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
                                <p className="text-white font-semibold">{userData.username}</p>
                                <p className="text-gray-400 text-sm">{userData.email}</p>
                                <p className="text-yellow-400 text-sm flex items-center">
                                    {userData.balance || '12000'} <span className="ml-1">💰</span>
                                </p>
                            </div>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/profile" className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2">
                                        Shaxsi ma'lumotlar
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/balance" className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2">
                                        Balans
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/history" className="block py-2 px-4 text-gray-400 hover:bg-gray-700 rounded mb-2">
                                        Xarid tarixi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings" className="block py-2 px-4 bg-blue-500 text-white rounded mb-2">
                                        Sozlamalar
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <button className="text-red-500 hover:text-red-400 transition-colors flex items-center">
                        <span className="mr-2">⏎</span> Chiqish
                    </button>
                </div>

                <div className="flex-grow p-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-white mb-4">Sozlamalar</h2>
                        <div className="text-gray-400 space-y-4">
                            <div>
                                <label className="block mb-2">Theme</label>
                                <select
                                    value={theme}
                                    onChange={(e) => setTheme(e.target.value)}
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                </select>
                            </div>
                            <button
                                onClick={handleSave}
                                className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

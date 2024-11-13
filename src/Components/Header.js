import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, HomeIcon, EnvelopeIcon, ArrowLeftIcon, UserIcon } from "@heroicons/react/24/outline";

const Header = ({ openSidebar, isSidebarOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isSidebarOpen || isLoginModalVisible ? "hidden" : "auto";
        document.documentElement.style.overflow = isSidebarOpen || isLoginModalVisible ? "hidden" : "auto";
    }, [isSidebarOpen, isLoginModalVisible]);

    const handleEmailClick = () => {
        setIsToastVisible(true);
        setTimeout(() => setIsToastVisible(false), 5000);
    };

    const handleHomeClick = () => {
        openSidebar(false); // 사이드바 닫기
        navigate("/"); // Home 페이지로 이동
    };

    const openLoginModal = () => {
        setIsLoginModalVisible(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalVisible(false);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/20 backdrop-blur-lg shadow-md h-16 px-4 border-b border-white/20">
                <div className="flex items-center">
                    {location.pathname !== "/" ? (
                        <>
                            <button onClick={() => navigate(-1)} className="text-gray-700 focus:outline-none">
                                <ArrowLeftIcon className="w-6 h-6" />
                            </button>
                            <button onClick={handleHomeClick} className="text-gray-700 focus:outline-none">
                                <HomeIcon className="w-6 h-6" />
                            </button>
                        </>
                    ) : (
                        <h1 className="relative z-50">
                            <Link
                                to="/"
                                onClick={() => openSidebar(false)}
                                className="text-gray-900 font-bold text-outline"
                            >
                                CODE DIARY
                            </Link>
                        </h1>
                    )}
                </div>

                <nav className="flex items-center">
                    <ul className="hidden md:flex items-center space-x-4 overflow-y-auto">
                        <li>
                            <button onClick={openLoginModal} className="text-gray-700 focus:outline-none text-outline">
                                Login
                            </button>
                        </li>
                        <li>
                            <button onClick={handleEmailClick} className="text-gray-700 focus:outline-none text-outline">
                                Contact
                            </button>
                        </li>
                        <li>
                            <button onClick={() => openSidebar(true)} className="text-gray-700 focus:outline-none text-outline">
                                Blog
                            </button>
                        </li>
                        <li>
                            <button onClick={() => openSidebar(false)} className="text-gray-700 focus:outline-none text-outline">
                                References
                            </button>
                        </li>
                    </ul>

                    {/* 모바일용 LOGIN 아이콘 */}
                    <button onClick={openLoginModal} className="md:hidden text-gray-700 p-2 rounded focus:outline-none text-outline">
                        <UserIcon className="w-6 h-6" />
                    </button>

                    <button onClick={handleEmailClick} className="md:hidden text-gray-700 p-2 rounded focus:outline-none text-outline">
                        <EnvelopeIcon className="w-6 h-6" />
                    </button>

                    <button onClick={() => openSidebar(true)} className="md:hidden text-gray-700 p-2 rounded focus:outline-none text-outline">
                        <Bars3Icon className="w-6 h-6" />
                    </button>
                </nav>
            </header>

            {/* Login Modal */}
            {isLoginModalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white/50 backdrop-blur-md rounded-lg p-6 shadow-lg w-80 border border-white/20">
                        <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">Hello</h2>
                        <form>
                            <label className="block text-gray-700 text-sm mb-2">Username</label>
                            <input
                                type="text"
                                className="w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
                                placeholder="Enter your username"
                            />
                            <label className="block text-gray-700 text-sm mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
                                placeholder="Enter your password"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={closeLoginModal}
                                    className="bg-white hover:bg-gray-300 text-outline rounded px-4 py-2 "
                                >
                                    Close
                                </button>
                                <button type="submit" className="bg-blue-500/80 hover:bg-blue-600 text-white rounded px-4 py-2 ">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {isToastVisible && (
                <div className="fixed bottom-4 w-full px-6 z-50">
                    <div className="max-w-3xl mx-auto shadow-lg rounded-lg p-4 animate-fade-in-out bg-white/30 backdrop-blur-md border border-white/20 flex justify-between items-center">
                        <p className="text-gray-800 text-sm sm:text-base text-outline">요청사항 건의하기</p>
                        <a
                            href="mailto:kmsdevwork@gmail.com"
                            className="text-outline flex items-center text-xs text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
                            onClick={() => setIsToastVisible(false)}
                        >
                            <EnvelopeIcon className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

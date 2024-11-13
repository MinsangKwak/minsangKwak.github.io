// Components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	Bars3Icon,
	HomeIcon,
	EnvelopeIcon,
	ArrowLeftIcon,
	UserIcon,
} from "@heroicons/react/24/outline";
import Toast from "./Toast";
import LoginModal from "./LoginModal";

const Header = ({ openSidebar, isSidebarOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isFadingOut, setIsFadingOut] = useState(false);

	useEffect(() => {
		document.body.style.overflow =
			isSidebarOpen || isLoginModalVisible ? "hidden" : "auto";
		document.documentElement.style.overflow =
			isSidebarOpen || isLoginModalVisible ? "hidden" : "auto";
	}, [isSidebarOpen, isLoginModalVisible]);

	const handleEmailClick = () => {
		setIsToastVisible(true);
		setTimeout(() => setIsToastVisible(false), 5000);
	};

	const handleHomeClick = () => {
		openSidebar(false);
		navigate("/");
	};

	const openLoginModal = () => {
		setIsFadingOut(false);
		setIsLoginModalVisible(true);
	};

	const closeLoginModal = () => {
		setIsFadingOut(true);
		setTimeout(() => setIsLoginModalVisible(false), 500);
	};

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/20 backdrop-blur-lg shadow-md h-16 px-4 border-b border-white/20">
				<div className="flex items-center">
					{location.pathname !== "/" ? (
						<>
							<button
								onClick={() => navigate(-1)}
								className="text-gray-700 focus:outline-none"
							>
								<ArrowLeftIcon className="w-6 h-6" />
							</button>
							<button
								onClick={handleHomeClick}
								className="text-gray-700 focus:outline-none"
							>
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
					<button
						onClick={openLoginModal}
						className="text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<UserIcon className="w-6 h-6" />
					</button>
					<button
						onClick={handleEmailClick}
						className="text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<EnvelopeIcon className="w-6 h-6" />
					</button>
					<button
						onClick={openSidebar}
						className="text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</nav>
			</header>

			{/* Toast Notification */}
			<Toast isVisible={isToastVisible} onClose={() => setIsToastVisible(false)} />

			{/* Login Modal */}
			<LoginModal isVisible={isLoginModalVisible} onClose={closeLoginModal} isFadingOut={isFadingOut} />
		</>
	);
};

export default Header;

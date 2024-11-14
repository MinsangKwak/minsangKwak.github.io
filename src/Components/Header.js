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

	// 공통 버튼 스타일
	const buttonStyles = "text-gray-700 p-2 rounded focus:outline-none text-outline";

	// 버튼 생성 함수
	const createButton = (onClick, IconComponent, ariaLabel) => (
		<button onClick={onClick} className={buttonStyles} aria-label={ariaLabel}>
			<IconComponent className="w-6 h-6" />
		</button>
	);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/20 backdrop-blur-lg shadow-md h-16 px-4 border-b border-white/20">
				<div className="flex items-center">
					{location.pathname !== "/" ? (
						<div className="flex items-center gap-4">
							{createButton(() => navigate(-1), ArrowLeftIcon, "Back")}
							{createButton(handleHomeClick, HomeIcon, "Home")}
						</div>
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
					{createButton(openLoginModal, UserIcon, "Login")}
					{createButton(handleEmailClick, EnvelopeIcon, "Email")}
					{createButton(openSidebar, Bars3Icon, "Menu")}
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

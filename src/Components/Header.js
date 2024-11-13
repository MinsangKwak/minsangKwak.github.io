import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	Bars3Icon,
	HomeIcon,
	EnvelopeIcon,
	ArrowLeftIcon,
	UserIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import ConvexGeometryComponent from "./ConvexGeometry";

const Header = ({ openSidebar, isSidebarOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
	const [isFadingOut, setIsFadingOut] = useState(false); // New state for fading animation

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
		setIsFadingOut(false); // Reset fade-out state when opening the modal
		setIsLoginModalVisible(true);
	};

	const closeLoginModal = () => {
		setIsFadingOut(true); // Start fade-out animation
		setTimeout(() => setIsLoginModalVisible(false), 500); // Hide modal after animation
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
						onClick={() => openSidebar(true)}
						className="text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</nav>
			</header>

			{/* Login Modal */}
			{isLoginModalVisible && (
				<div
					className={`fixed inset-0 flex items-center justify-center z-50 bg-gradient-rainbow ${
						isFadingOut
							? "animate-fade-out"
							: "animate-fade-in-background"
					} backdrop-blur-sm`}
				>
					<div
						className={`relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg w-80 border border-white/20 ${
							isFadingOut ? "" : "animate-slide-up"
						}`}
					>
						{/* Close Button */}
						<button
							onClick={closeLoginModal}
							className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
							aria-label="Close"
						>
							<XMarkIcon className="w-5 h-5" />
						</button>
						<div className="flex items-center justify-center mb-4">
							<ConvexGeometryComponent />
						</div>
						<form>
							<input
								type="text"
								placeholder="이름을 입력 해주세요"
								className="text-sm w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
							/>
							<input
								type="password"
								placeholder="비밀번호를 입력 해주세요"
								className="text-sm w-full p-2 mb-4 rounded bg-white/30 placeholder-gray-500 focus:outline-none border border-gray-300"
							/>
							<button
								type="submit"
								className="w-full bg-blue-500/80 hover:bg-blue-600 text-white rounded px-4 py-2"
							>
								로그인
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Toast Notification */}
			{isToastVisible && (
				<div className="fixed bottom-4 w-full px-6 z-50">
					<div className="bg-gradient-rainbow max-w-3xl mx-auto shadow-lg rounded-lg p-4 animate-fade-in-out backdrop-blur-md border flex justify-between items-center">
						<p className="text-white text-sm sm:text-base">
							요청사항 건의하기
						</p>
						<a
							href="mailto:kmsdevwork@gmail.com"
							className="text-white flex items-center text-xs backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
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

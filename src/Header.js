// src/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, HomeIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Header = ({ openSidebar, isSidebarOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isToastVisible, setIsToastVisible] = useState(false);

	useEffect(() => {
		document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
		document.documentElement.style.overflow = isSidebarOpen ? "hidden" : "auto";
	}, [isSidebarOpen]);

	const handleEmailClick = () => {
		setIsToastVisible(true);
		// 5초 후 자동으로 토스트 닫기
		setTimeout(() => setIsToastVisible(false), 5000);
	};

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white shadow-md h-16 px-4">
				<div className="flex items-center space-x-4">
					{location.pathname !== "/" ? (
						<>
							<button onClick={() => navigate(-1)} className="text-gray-700 focus:outline-none">
								<ArrowLeftIcon className="w-6 h-6" />
							</button>
							<button onClick={() => navigate("/")} className="text-gray-700 focus:outline-none">
								<HomeIcon className="w-6 h-6" />
							</button>
						</>
					) : (
						<h1>
							<Link to="/" className="text-gray-900 font-bold">
								CODE DIARY
							</Link>
						</h1>
					)}
				</div>

				<nav className="flex items-center">
					<ul className="hidden md:flex items-center space-x-4 overflow-y-auto">
						<li>
							<button onClick={() => openSidebar(false)} className="text-gray-700 focus:outline-none">
								References
							</button>
						</li>
						<li>
							<button onClick={() => openSidebar(true)} className="text-gray-700 focus:outline-none">
								Blog
							</button>
						</li>
					</ul>

					<button onClick={handleEmailClick} className="text-gray-700 p-2 rounded focus:outline-none">
						<EnvelopeIcon className="w-6 h-6" />
					</button>

					<button
						onClick={() => openSidebar()}
						className="md:hidden text-gray-700 p-2 rounded focus:outline-none"
					>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</nav>
			</header>

			{/* Toast Notification */}
			{isToastVisible && (
				<div className="fixed bottom-4 left-0 w-full bg-white shadow-lg rounded-lg p-4 z-40 animate-fade-in-out">
					<div className="flex justify-between items-center max-w-3xl mx-auto">
						<p className="text-gray-800 text-sm sm:text-base">문의사항이 있으시다면 편하게 연락주세요~!</p>
						<a
							href="mailto:kmsdevwork@gmail.com"
							className="ml-4 px-3 py-2 bg-gray-800 text-white text-xs sm:text-sm rounded hover:bg-gray-700"
							onClick={() => setIsToastVisible(false)}
						>
							메일 발송하기
						</a>
					</div>
				</div>
			
			)}
		</>
	);
};

export default Header;

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
		document.documentElement.style.overflow = isSidebarOpen
			? "hidden"
			: "auto";
	}, [isSidebarOpen]);

	const handleEmailClick = () => {
		setIsToastVisible(true);
		setTimeout(() => setIsToastVisible(false), 5000);
	};

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/20 backdrop-blur-lg shadow-md h-16 px-4 border-b border-white/20">
				<div className="flex items-center space-x-4">
					{location.pathname !== "/" ? (
						<>
							<button
								onClick={() => navigate(-1)}
								className="text-gray-700 focus:outline-none"
							>
								<ArrowLeftIcon className="w-6 h-6" />
							</button>
							<button
								onClick={() => navigate("/")}
								className="text-gray-700 focus:outline-none"
							>
								<HomeIcon className="w-6 h-6" />
							</button>
						</>
					) : (
						<h1>
							<Link
								to="/"
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
							<button
								onClick={() => openSidebar(false)}
								className="text-gray-700 focus:outline-none text-outline"
							>
								References
							</button>
						</li>
						<li>
							<button
								onClick={() => openSidebar(true)}
								className="text-gray-700 focus:outline-none text-outline"
							>
								Blog
							</button>
						</li>
						<li>
							<button
								onClick={handleEmailClick}
								className="text-gray-700 focus:outline-none text-outline"
							>
								Contact
							</button>
						</li>
					</ul>

					<button
						onClick={handleEmailClick}
						className="md:hidden text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<EnvelopeIcon className="w-6 h-6" />
					</button>

					<button
						onClick={() => openSidebar()}
						className="md:hidden text-gray-700 p-2 rounded focus:outline-none text-outline"
					>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</nav>
			</header>

			{/* Toast Notification */}
			{isToastVisible && (
				<div className="fixed bottom-4 w-full px-6 z-50">
					<div className="max-w-3xl mx-auto shadow-lg rounded-lg p-4 animate-fade-in-out bg-white/30 backdrop-blur-md border border-white/20 flex justify-between items-center">
						<p className="text-gray-800 text-sm sm:text-base text-outline">
							문의사항이 있으시다면 편하게 연락주세요~!
						</p>
						<a
							href="mailto:kmsdevwork@gmail.com"
							className="ml-4 px-3 py-2 bg-gray-800/80 text-white text-xs sm:text-sm rounded hover:bg-gray-700/80 text-outline"
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

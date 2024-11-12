// src/Header.js
import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const Header = ({ openSidebar, isSidebarOpen }) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
		document.documentElement.style.overflow = isSidebarOpen ? "hidden" : "auto";
	}, [isSidebarOpen]);

	return (
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

				<button
					onClick={() => openSidebar()}
					className="md:hidden text-gray-700 p-2 rounded focus:outline-none"
				>
					<Bars3Icon className="w-6 h-6" />
				</button>
			</nav>
		</header>
	);
};

export default Header;

// src/Header.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline"; // 화살표 아이콘 추가

const Header = ({ openSidebar }) => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white shadow-md h-16 px-4">
			<div className="flex items-center space-x-4">
				{/* Back 버튼: 루트("/")가 아닐 때만 표시 */}
				{location.pathname !== "/" ? (
					<>
						<button
							onClick={() => navigate(-1)}
							className="text-gray-700 focus:outline-none"
						>
							<ArrowLeftIcon className="w-6 h-6 text-gray-700" />{" "}
							{/* 화살표 아이콘 */}
						</button>
						<button
							onClick={() => navigate("/")}
							className="text-gray-700 focus:outline-none"
						>
							<HomeIcon className="w-6 h-6 text-gray-700" />{" "}
							{/* 화살표 아이콘 */}
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

			{/* 네비게이션 메뉴 */}
			<ul className="flex items-center space-x-4">
				<li className="hidden md:block">
					<button
						onClick={() => openSidebar(false)}
						className="text-gray-700 focus:outline-none"
					>
						References
					</button>
				</li>
				<li className="hidden md:block">
					<button
						onClick={() => openSidebar(true)}
						className="text-gray-700 focus:outline-none"
					>
						Blog
					</button>
				</li>

				{/* 모바일 화면에서만 보이는 햄버거 메뉴 */}
				<li className="md:hidden">
					<button
						onClick={() => openSidebar()}
						className="text-gray-700 p-2 rounded focus:outline-none"
					>
						<Bars3Icon className="w-6 h-6" />
					</button>
				</li>
			</ul>
		</header>
	);
};

export default Header;

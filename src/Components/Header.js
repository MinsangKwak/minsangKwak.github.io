import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	Bars3Icon,
	HomeIcon,
	EnvelopeIcon,
	ArrowLeftIcon,
	PencilIcon ,
} from "@heroicons/react/24/outline";
import Category from "./Category";

const Header = ({
	openSidebar,
	isSidebarOpen,
	closeSidebar, // closeSidebar를 받아옴
	openToast,
	openLoginModal,
	categorizedBlogPosts,
	categorizedReferencePosts,
	activeCategory,
	toggleCategory,
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
		document.documentElement.style.overflow = isSidebarOpen ? "hidden" : "auto";
	}, [isSidebarOpen]);

	const handleHomeClick = () => {
		closeSidebar(); // 사이드바를 닫음
		navigate("/");
	};

	const buttonStyles = "text-gray-700 p-2 rounded focus:outline-none text-outline";

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
						<div className="flex items-center">
							{createButton(() => navigate(-1), ArrowLeftIcon, "Back")}
							{createButton(handleHomeClick, HomeIcon, "Home")}
						</div>
					) : (
						<h1>
							<Link
								to="/"
								onClick={() => closeSidebar()} // 홈 버튼 클릭 시 사이드바 닫기
								className="text-gray-900 font-bold text-outline"
							>
								CODE DIARY
							</Link>
						</h1>
					)}
				</div>

				<nav className="flex items-center">
					{createButton(openLoginModal, PencilIcon , "Login")}
					{createButton(openToast, EnvelopeIcon, "Email")}
					{createButton(openSidebar, Bars3Icon, "Menu")}
				</nav>
			</header>

			{/* Sidebar */}
			<aside
				className={`fixed top-0 right-0 h-full bg-white/20 backdrop-blur-md text-black transition-transform duration-300 z-20 shadow-lg border border-white/10 rounded-l-lg ${
					isSidebarOpen ? "translate-x-0 w-[80%] md:w-[240px]" : "translate-x-full"
				}`}
			>
				<nav className="p-4 mt-16 overflow-y-auto">
					<h2 className="text-lg font-bold">Blog</h2>
					{Object.keys(categorizedBlogPosts).map((category) => (
						<Category
							key={category}
							category={category}
							posts={categorizedBlogPosts[category]}
							basePath="blog"
							isActive={activeCategory === category}
							onClick={toggleCategory}
							onPostClick={() => closeSidebar()}
						/>
					))}

					<h2 className="text-lg font-bold mt-6">References</h2>
					{Object.keys(categorizedReferencePosts).map((category) => (
						<Category
							key={category}
							category={category}
							posts={categorizedReferencePosts[category]}
							basePath="reference"
							isActive={activeCategory === category}
							onClick={toggleCategory}
							onPostClick={() => closeSidebar()}
						/>
					))}
				</nav>
			</aside>
		</>
	);
};

export default Header;

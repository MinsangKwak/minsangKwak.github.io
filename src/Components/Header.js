import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
	Bars3Icon,
	HomeIcon,
	EnvelopeIcon,
	ArrowLeftIcon,
	PencilSquareIcon,
	UserIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Category from "./Category";

const Header = ({
	openSidebar,
	isSidebarOpen,
	closeSidebar,
	openToast,
	openLoginModal,
	categorizedBlogPosts,
	categorizedReferencePosts,
	activeCategory,
	toggleCategory,
	user, // 로그인한 사용자 정보
}) => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
		document.documentElement.style.overflow = isSidebarOpen
			? "hidden"
			: "auto";
	}, [isSidebarOpen]);

	const handleHomeClick = () => {
		closeSidebar();
		navigate("/");
	};

	const handleLogout = async () => {
		try {
			await signOut(auth);
			alert("로그아웃 되었습니다.");
		} catch (error) {
			console.error("로그아웃 중 오류가 발생했습니다.", error);
		}
	};

	const buttonStyles =
		"text-gray-700 p-2 rounded focus:outline-none text-outline";

	const createButton = (onClick, IconComponent, ariaLabel) => (
		<button
			onClick={onClick}
			className={buttonStyles}
			aria-label={ariaLabel}
		>
			<IconComponent className="w-6 h-6" />
		</button>
	);

	return (
		<>
			<header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/20 backdrop-blur-lg shadow-md h-16 px-4 border-b border-white/20">
				<div className="flex items-center">
					{/* 뒤로 가기와 홈 버튼 */}
					{location.pathname !== "/" ? (
						<div className="flex items-center">
							{createButton(
								() => navigate(-1),
								ArrowLeftIcon,
								"Back"
							)}
							{createButton(handleHomeClick, HomeIcon, "Home")}
						</div>
					) : (
						<h1>
							<Link
								to="/"
								onClick={() => closeSidebar()}
								className="text-gray-900 font-bold text-outline"
							>
								CODE DIARY
							</Link>
						</h1>
					)}
				</div>

				<nav className="flex items-center">
					{/* 로그인 후 연필 아이콘 추가 */}
					{user && (
						<button
							onClick={() => navigate("/create")} // 글 작성 페이지로 이동
							className="ml-4 text-gray-700 p-2 rounded focus:outline-none text-outline"
							aria-label="Add Post"
						>
							<PencilSquareIcon className="w-6 h-6" />
						</button>
					)}
					{/* 로그인 아이콘 */}
					{!user
						? createButton(openLoginModal, UserIcon, "Login")
						: createButton(
								handleLogout,
								ArrowRightOnRectangleIcon,
								"Logout"
						  )}
					{createButton(openToast, EnvelopeIcon, "Email")}
					{createButton(openSidebar, Bars3Icon, "Menu")}
				</nav>
			</header>

			{/* {isSidebarOpen && (
				<div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-30" />
			)} */}

			{/* Sidebar */}
			<aside
				className={`overflow-y-auto fixed top-0 right-0 h-full bg-white/20 backdrop-blur-md text-black transition-transform duration-300 z-40 border border-white/10 rounded-l-lg ${
					isSidebarOpen
						? "translate-x-0 w-[80%] md:w-[240px]"
						: "translate-x-full"
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

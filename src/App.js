// src/App.js
import React, { useState, useEffect } from "react";
import CodePost from "./CodePost";
import Home from "./Home";
import postsData from "./data/posts.json";
import { Bars3Icon, HomeIcon } from "@heroicons/react/24/solid";

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [posts, setPosts] = useState([]);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 추가

	useEffect(() => {
		setPosts(postsData);
	}, []);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-end bg-white shadow-md h-16 px-4">
				{/* 햄버거 버튼 */}
				<button
					className="p-2 text-gray-700 rounded focus:outline-none"
					onClick={toggleSidebar}
				>
					<Bars3Icon className="w-6 h-6" />
				</button>
			</header>

			{/* 사이드바 오버레이 */}
			<aside
				className={`fixed top-0 right-0 h-full bg-black text-white w-64 transform transition-transform duration-300 z-20 ${
					isSidebarOpen ? "translate-x-0" : "translate-x-full"
				} flex flex-col justify-between`}
			>
				{/* 메뉴 목록 */}
				<nav className="p-4 space-y-4 mt-16 flex-grow">
					{" "}
					{/* 상단 여백 추가 */}
					<ul className="flex flex-col gap-1">
						{posts.map((post) => (
							<li key={post.id}>
								<button
									onClick={() => {
										setSelectedPost(post);
										setIsSidebarOpen(false); // 메뉴 클릭 시 닫기
									}}
									className={`block w-full text-left py-2 px-4 rounded ${
										selectedPost &&
										selectedPost.id === post.id
											? "bg-gray-700"
											: "hover:bg-gray-700"
									}`}
								>
									{post.title}
								</button>
							</li>
						))}
					</ul>
				</nav>

				{/* 홈 버튼 */}
				<button
					onClick={() => {
						setSelectedPost(null);
						setIsSidebarOpen(false);
					}}
					className="w-full text-left py-4 px-4 bg-gray-800 hover:bg-gray-700 flex items-center space-x-2"
				>
					<span>Home</span>
				</button>
			</aside>

			{/* 오버레이 백그라운드 */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-10"
					onClick={toggleSidebar} // 클릭 시 사이드바 닫기
				></div>
			)}

			{/* 메인 콘텐츠 */}
			<div className="flex-1 mt-16 p-6">
				{" "}
				{/* 헤더 높이만큼 마진 추가 */}
				{selectedPost ? <CodePost post={selectedPost} /> : <Home />}
			</div>
		</div>
	);
};

export default App;

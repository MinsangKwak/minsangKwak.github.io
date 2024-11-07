// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CodePost from "./CodePost";
import Home from "./Home";
import Blog from "./Blog";
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";
import { Bars3Icon } from "@heroicons/react/24/solid";

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isBlogView, setIsBlogView] = useState(false);

	const openSidebar = (isBlog) => {
		setIsBlogView(isBlog);
		setIsSidebarOpen(true);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// 텍스트 말줄임 처리 함수
	const truncateText = (text, maxLength) => {
		return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
	};

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gray-100">
				<header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white shadow-md h-16 px-4">
					<h1>
						<Link to="/" className="text-gray-900 font-bold">
							CODE DIARY
						</Link>
					</h1>
					<ul className="flex items-center space-x-4">
						<li>
							<button
								onClick={() => openSidebar(false)}
								className="text-gray-700 focus:outline-none"
							>
								References
							</button>
						</li>
						<li>
							<button
								onClick={() => openSidebar(true)}
								className="text-gray-700 focus:outline-none"
							>
								Blog
							</button>
						</li>
						<li>
							<button
								onClick={toggleSidebar}
								className="text-gray-700 p-2 rounded focus:outline-none"
							>
								<Bars3Icon className="w-6 h-6" />
							</button>
						</li>
					</ul>
				</header>

				{/* Sidebar */}
				<aside
					className={`fixed top-0 right-0 h-full bg-black text-white w-64 transform transition-transform duration-300 z-20 ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					} flex flex-col justify-between`}
				>
					<nav className="p-4 space-y-4 mt-16 flex-grow">
						<h2 className="text-lg font-bold">
							{isBlogView ? "Blog Posts" : "References"}
						</h2>
						<ul className="flex flex-col gap-1">
							<li>
								<Link
									to="/"
									onClick={() => setIsSidebarOpen(false)}
									className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
								>
									Home
								</Link>
							</li>
							{(isBlogView ? blogPostsData : codePostsData).map(
								(post) => (
									<li key={post.id}>
										<Link
											to={`/post/${post.id}`}
											onClick={() =>
												setIsSidebarOpen(false)
											}
											className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
										>
											<div className="font-bold">
												{post.title}
											</div>
											<div className="text-sm text-gray-300">
												{truncateText(
													isBlogView
														? post.excerpt
														: post.memo,
													30 // 원하는 최대 글자 수 설정
												)}
											</div>
										</Link>
									</li>
								)
							)}
						</ul>
					</nav>
				</aside>

				{/* Overlay Background */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-10"
						onClick={toggleSidebar} // 클릭 시 사이드바 닫기
					></div>
				)}

				{/* Main Content Area */}
				<div className="flex-1 mt-16 p-6 max-w-full md:px-24">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/blog"
							element={<Blog posts={blogPostsData} />}
						/>
						<Route
							path="/post/:postId"
							element={
								<CodePost
									posts={
										isBlogView
											? blogPostsData
											: codePostsData
									}
									isBlogView={isBlogView}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;

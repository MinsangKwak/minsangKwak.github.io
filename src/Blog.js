// src/Blog.js
import React, { useState, useEffect } from "react";

const Blog = ({ posts = [] }) => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		if (posts.length > 0) {
			setSelectedPost(posts[0]);
		}
	}, [posts]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white shadow-md h-16 px-4">
				<h1 className="text-gray-900 font-bold">Blog</h1>
				<button
					onClick={toggleSidebar}
					className="text-gray-700 focus:outline-none"
				>
					Posts
				</button>
			</header>

			{/* Sidebar with Post Titles */}
			<aside
				className={`fixed top-0 right-0 h-full bg-black text-white w-64 transform transition-transform duration-300 z-20 ${
					isSidebarOpen ? "translate-x-0" : "translate-x-full"
				} flex flex-col justify-between`}
			>
				<nav className="p-4 space-y-4 mt-16 flex-grow">
					<h2 className="text-lg font-bold">Blog Posts</h2>
					{posts.length > 0 ? (
						<ul className="flex flex-col gap-1">
							{posts.map((post) => (
								<li key={post.id}>
									<button
										onClick={() => {
											setSelectedPost(post);
											setIsSidebarOpen(false);
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
					) : (
						<p className="text-gray-400">포스트가 없습니다.</p>
					)}
				</nav>
			</aside>

			{/* Overlay Background */}
			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-10"
					onClick={toggleSidebar}
				></div>
			)}

			{/* Main Content Area */}
			<div className="flex-1 mt-16 p-6">
				{selectedPost ? (
					<div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-4xl font-bold text-gray-900 mb-2">
							{selectedPost.title}
						</h2>
						<h3 className="text-2xl text-gray-600 mb-4">
							{selectedPost.subtitle}
						</h3>
						<p className="text-gray-700 leading-relaxed mb-8">
							{selectedPost.content}
						</p>

						{/* Additional Sections for a Learning Path Style */}
						<h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
							더 알아보기
						</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
							<li>React의 Virtual DOM 개념</li>
							<li>React의 상태 관리와 Context API</li>
							<li>Hooks의 발전: useEffect와 useReducer</li>
						</ul>

						<h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
							관련 학습 항목
						</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>JavaScript 기본 개념</li>
							<li>ES6 및 최신 JavaScript 기능</li>
							<li>React 컴포넌트와 JSX의 이해</li>
						</ul>
					</div>
				) : (
					<p className="text-gray-700">포스트가 없습니다.</p>
				)}
			</div>
		</div>
	);
};

export default Blog;

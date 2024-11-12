// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CodePost from "./CodePost";
import Home from "./Home";
import Blog from "./Blog";
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";
import Header from "./Header";

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

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gray-100">
				<Header openSidebar={openSidebar} isSidebarOpen={isSidebarOpen} />

				<aside
					className={`fixed top-0 right-0 h-full bg-white text-black w-64 transform transition-transform duration-300 z-20 ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					} flex flex-col justify-between`}
				>
					<nav className="p-4 space-y-4 mt-16 flex-grow overflow-y-auto">
						<h2 className="text-lg font-bold">References</h2>
						<ul className="flex flex-col gap-1">
							{codePostsData.map((post) => (
								<li key={post.id}>
									<Link
										to={`/post/${post.id}`}
										onClick={() => {
											setIsSidebarOpen(false);
											setIsBlogView(false);
										}}
										className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100"
									>
										{post.title}
									</Link>
								</li>
							))}
						</ul>

						<h2 className="text-lg font-bold mt-6">Blog</h2>
						<ul className="flex flex-col gap-1">
							{blogPostsData.map((post) => (
								<li key={post.id}>
									<Link
										to={`/post/${post.id}`}
										onClick={() => {
											setIsSidebarOpen(false);
											setIsBlogView(true);
										}}
										className="block w-full text-left py-2 px-4 rounded hover:bg-gray-100"
									>
										{post.title}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black opacity-50 z-10"
						onClick={toggleSidebar}
					></div>
				)}

				<div className="flex-1 mt-16 p-6 max-w-full md:px-24">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/blog" element={<Blog posts={blogPostsData} />} />
						<Route
							path="/post/:postId"
							element={
								<CodePost
									posts={isBlogView ? blogPostsData : codePostsData}
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

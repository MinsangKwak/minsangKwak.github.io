import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CodePost from "./Pages/CodePost";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";
import Header from "./Components/Header";

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
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header
					openSidebar={openSidebar}
					isSidebarOpen={isSidebarOpen}
				/>

				<aside
					className={`fixed top-0 right-0 h-full bg-white/20 backdrop-blur-md text-gray-200 w-64 transform transition-transform duration-300 z-20 shadow-lg border border-white/10 ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					} flex flex-col justify-between rounded-l-lg`}
				>
					<nav className="p-4 space-y-4 mt-16 flex-grow overflow-y-auto">
						<h2 className="text-lg font-bold text-white/90">
							Blog
						</h2>
						<ul className="flex flex-col gap-1">
							{blogPostsData.map((post) => (
								<li key={post.id}>
									<Link
										to={`/blog/${post.id}`}
										onClick={() => {
											setIsSidebarOpen(false);
											setIsBlogView(true);
										}}
										className="block w-full text-left py-2 px-4 rounded hover:bg-white/10 text-white/80 hover:text-white"
									>
										{post.title}
									</Link>
								</li>
							))}
						</ul>

						<h2 className="text-lg font-bold mt-6 text-white/90">
							References
						</h2>
						<ul className="flex flex-col gap-1">
							{codePostsData.map((post) => (
								<li key={post.id}>
									<Link
										to={`/reference/${post.id}`}
										onClick={() => {
											setIsSidebarOpen(false);
											setIsBlogView(false);
										}}
										className="block w-full text-left py-2 px-4 rounded hover:bg-white/10 text-white/80 hover:text-white"
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
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
						onClick={toggleSidebar}
					></div>
				)}

				<div className="flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 backdrop-blur-lg border border-white/10 shadow-md rounded-lg text-gray-200">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route
							path="/blog"
							element={<Blog posts={blogPostsData} />}
						/>
						<Route
							path="/blog/:postId"
							element={
								<CodePost
									posts={blogPostsData}
									isBlogView={true}
								/>
							}
						/>
						<Route
							path="/reference/:postId"
							element={
								<CodePost
									posts={codePostsData}
									isBlogView={false}
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
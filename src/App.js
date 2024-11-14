import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// fake data
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";

// component
import PageCodePost from "./Pages/PageCodePost";
import PageHome from "./Pages/PageHome";
import PageBlog from "./Pages/PageBlog";
import Category from "./Components/Category";
import Header from "./Components/Header";
import Wave from "./Components/Wave";

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isExiting, setIsExiting] = useState(false);
	const [isBlogView, setIsBlogView] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null);

	const toggleSidebar = (isBlog) => {
		setIsBlogView(isBlog);
		setIsExiting(isSidebarOpen);
		setIsSidebarOpen((prev) => !prev);
		setTimeout(() => setIsExiting(false), 300);
	};

	const categorizePosts = (posts) =>
		posts.reduce((categories, post) => {
			const category = post.slug.split("-")[0];
			(categories[category] = categories[category] || []).push(post);
			return categories;
		}, {});

	const categorizedBlogPosts = categorizePosts(blogPostsData);
	const categorizedReferencePosts = categorizePosts(codePostsData);

	const toggleCategory = (category) => {
		setActiveCategory((prev) => (prev === category ? null : category));
	};

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header openSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

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
								isActive={activeCategory === category}
								onClick={toggleCategory}
								onPostClick={() => setIsSidebarOpen(false)}
							/>
						))}

						<h2 className="text-lg font-bold mt-6">References</h2>
						{Object.keys(categorizedReferencePosts).map((category) => (
							<Category
								key={category}
								category={category}
								posts={categorizedReferencePosts[category]}
								isActive={activeCategory === category}
								onClick={toggleCategory}
								onPostClick={() => setIsSidebarOpen(false)}
							/>
						))}
					</nav>
				</aside>

				{/* Sidebar Overlay */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 backdrop-blur-sm z-10"
						onClick={() => toggleSidebar(false)}
					></div>
				)}

				<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
					<Routes>
						<Route path="/" element={<PageHome />} />
						<Route path="/blog" element={<PageBlog posts={blogPostsData} />} />
						<Route
							path="/blog/:postId"
							element={<PageCodePost posts={blogPostsData} isBlogView={true} />}
						/>
						<Route
							path="/reference/:postId"
							element={<PageCodePost posts={codePostsData} isBlogView={false} />}
						/>
					</Routes>
				</div>

				<Wave />
			</div>
		</Router>
	);
};

export default App;

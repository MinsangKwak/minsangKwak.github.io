import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import CodePost from "./Pages/CodePost";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Wave from "./Components/Wave";
import codePostsData from "./data/codePosts.json";
import blogPostsData from "./data/blogPosts.json";
import Header from "./Components/Header";

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isBlogView, setIsBlogView] = useState(false);
	const [activeCategory, setActiveCategory] = useState(null); // 활성화된 카테고리

	const openSidebar = (isBlog) => {
		setIsBlogView(isBlog);
		setIsSidebarOpen(true);
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	// 블로그 및 코드 포스트 데이터를 slug의 첫 번째 단어를 기준으로 분류합니다.
	const categorizePosts = (posts) => {
		return posts.reduce((categories, post) => {
			const category = post.slug.split("-")[0]; // slug의 첫 번째 단어 사용
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(post);
			return categories;
		}, {});
	};

	const categorizedBlogPosts = categorizePosts(blogPostsData);
	const categorizedReferencePosts = categorizePosts(codePostsData);

	// 아코디언 토글 함수
	const toggleCategory = (category) => {
		setActiveCategory((prev) => (prev === category ? null : category));
	};

	return (
		<Router>
			<div className="flex flex-col min-h-screen bg-gradient-rainbow">
				<Header
					openSidebar={openSidebar}
					isSidebarOpen={isSidebarOpen}
				/>

				<aside
					className={`fixed top-0 right-0 h-full bg-white/20 backdrop-blur-md text-black ${
						isSidebarOpen ? "translate-x-0" : "translate-x-full"
					} transform transition-transform duration-300 z-20 shadow-lg border border-white/10 ${
						isSidebarOpen ? "w-[80%] md:w-[30%]" : "w-0"
					} flex flex-col justify-between rounded-l-lg`}
				>
					<nav className="p-4 space-y-4 mt-16 flex-grow overflow-y-auto">
						<h2 className="text-lg font-bold text-black">Blog</h2>
						{/* 분류된 블로그 포스트 */}
						{Object.keys(categorizedBlogPosts).map((category) => (
							<div key={category} className="mb-2">
								<div
									className="flex items-center justify-between text-md font-semibold text-black mt-2 cursor-pointer bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
									onClick={() => toggleCategory(category)}
								>
									<span>{category}</span>
									<ChevronDownIcon
										className={`w-5 h-5 transition-transform duration-200 ${
											activeCategory === category
												? "transform rotate-180"
												: ""
										}`}
									/>
								</div>
								{activeCategory === category && (
									<ul className="flex flex-col gap-1 mt-1 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
										{categorizedBlogPosts[category].map((post) => (
											<li key={post.id}>
												<Link
													to={`/blog/${post.id}`}
													onClick={() => {
														setIsSidebarOpen(false);
														setIsBlogView(true);
													}}
													className="block w-full text-left py-2 px-4 rounded hover:bg-white/30 text-black"
												>
													{post.title}
												</Link>
											</li>
										))}
									</ul>
								)}
							</div>
						))}

						<h2 className="text-lg font-bold mt-6 text-black">
							References
						</h2>
						{/* 분류된 참조 포스트 */}
						{Object.keys(categorizedReferencePosts).map((category) => (
							<div key={category} className="mb-2">
								<div
									className="flex items-center justify-between text-md font-semibold text-black mt-2 cursor-pointer bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
									onClick={() => toggleCategory(category)}
								>
									<span>{category}</span>
									<ChevronDownIcon
										className={`w-5 h-5 transition-transform duration-200 ${
											activeCategory === category
												? "transform rotate-180"
												: ""
										}`}
									/>
								</div>
								{activeCategory === category && (
									<ul className="flex flex-col gap-1 mt-1 bg-white/20 backdrop-blur-sm p-2 rounded-lg">
										{categorizedReferencePosts[category].map((post) => (
											<li key={post.id}>
												<Link
													to={`/reference/${post.id}`}
													onClick={() => {
														setIsSidebarOpen(false);
														setIsBlogView(false);
													}}
													className="block w-full text-left py-2 px-4 rounded hover:bg-white/30 text-black"
												>
													{post.title}
												</Link>
											</li>
										))}
									</ul>
								)}
							</div>
						))}
					</nav>
				</aside>

				{isSidebarOpen && (
					<div
						className="fixed inset-0 backdrop-blur-sm z-10"
						onClick={toggleSidebar}
					></div>
				)}

				<div className="relative z-[2] flex-1 mt-16 p-6 max-w-full md:px-24 bg-white/20 border border-white/10 shadow-md rounded-lg text-gray-200">
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

				<Wave />
			</div>
		</Router>
	);
};

export default App;

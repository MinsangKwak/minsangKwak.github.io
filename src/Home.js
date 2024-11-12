// src/Home.js
import React, { useState } from "react";
import blogPostsData from "./data/blogPosts.json";
import codePostsData from "./data/codePosts.json";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
	const [visibleBlogPosts, setVisibleBlogPosts] = useState(3);
	const [visibleReferencePosts, setVisibleReferencePosts] = useState(3);

	const loadMoreBlogPosts = () => setVisibleBlogPosts((prev) => prev + 3);
	const loadMoreReferencePosts = () => setVisibleReferencePosts((prev) => prev + 3);

	const truncateText = (text, maxLength) => text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

	// id 기준 최신순 정렬
	const sortedBlogPosts = [...blogPostsData].sort((a, b) => b.id - a.id);
	const sortedReferencePosts = [...codePostsData].sort((a, b) => b.id - a.id);

	return (
		<main className="flex flex-col items-center min-h-screen bg-gray-100">
			<div className="flex flex-col md:flex-row items-center mt-4 md:mt-16 mb-16 text-gray-700 font-light">
				<div className="flex-1">
					<p className="text-3xl lg:text-5xl mt-2 lg:mt-4">Welcome!</p>
					<p className="text-3xl lg:text-5xl mt-2 lg:mt-4">
						This blog is a personal project created after work hours to share insights and resources related to development.
					</p>
					<p className="text-3xl lg:text-5xl mt-2 lg:mt-4">
						<span>Feel free to reach out with any suggestions.</span>
						<br />
						<a href="mailto:kmsdevwork@gmail.com" className="text-blue-500 hover:underline text-lg lg:text-xl">
							Contact via G-mail
						</a>
					</p>
				</div>
			</div>

			<div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-8">
				{/* Blog Section */}
				<section className="w-full md:w-1/2">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold">Blog</h2>
						{visibleBlogPosts < sortedBlogPosts.length && (
							<button
								onClick={loadMoreBlogPosts}
								className="flex items-center text-xs text-gray-700 bg-white px-2 py-1 rounded hover:bg-gray-300"
							>
								더보기
								<PlusIcon className="w-3 h-3 ml-1" />
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{sortedBlogPosts.slice(0, visibleBlogPosts).map((post, index) => (
							<li key={post.id} className="bg-white p-4 rounded shadow-sm relative">
								<Link to={`/blog/${post.id}`} className="block pr-[50px] text-gray-900 font-medium hover:underline">
									{post.title}
								</Link>
								<p className="text-gray-500 text-sm mt-1">{truncateText(post.excerpt, 30)}</p>
								{index === 0 && (
									<span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-light px-2 py-1 rounded">
										NEW
									</span>
								)}
							</li>
						))}
					</ul>
				</section>

				{/* References Section */}
				<section className="w-full md:w-1/2 mt-8 md:mt-0">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold">References</h2>
						{visibleReferencePosts < sortedReferencePosts.length && (
							<button
								onClick={loadMoreReferencePosts}
								className="flex items-center text-xs text-gray-700 bg-white px-2 py-1 rounded hover:bg-gray-300"
							>
								더보기
								<PlusIcon className="w-3 h-3 ml-1" />
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{sortedReferencePosts.slice(0, visibleReferencePosts).map((post, index) => (
							<li key={post.id} className="bg-white p-4 rounded shadow-sm relative">
								<Link to={`/reference/${post.id}`} className="block pr-[50px] text-gray-900 font-medium hover:underline">
									{post.title}
								</Link>
								<p className="text-gray-500 text-sm mt-1">{truncateText(post.memo, 30)}</p>
								{index === 0 && (
									<span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-light px-2 py-1 rounded">
										NEW
									</span>
								)}
							</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	);
};

export default Home;

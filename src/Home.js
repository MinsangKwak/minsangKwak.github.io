import React, { useState } from "react";
import blogPostsData from "./data/blogPosts.json";
import codePostsData from "./data/codePosts.json";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
	const [visibleBlogPosts, setVisibleBlogPosts] = useState(3);
	const [visibleReferencePosts, setVisibleReferencePosts] = useState(3);

	const loadMoreBlogPosts = () => setVisibleBlogPosts((prev) => prev + 3);
	const loadMoreReferencePosts = () =>
		setVisibleReferencePosts((prev) => prev + 3);

	const truncateText = (text, maxLength) =>
		text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

	const sortedBlogPosts = [...blogPostsData].sort((a, b) => b.id - a.id);
	const sortedReferencePosts = [...codePostsData].sort((a, b) => b.id - a.id);

	return (
		<main className="flex flex-col items-center min-h-screen">
			<div className="w-full max-w-5xl mb-16 font-light">
				<p className="text-3xl lg:text-5xl mt-2 lg:mt-4 text-outline">
					Welcome!
				</p>
				<p className="text-3xl lg:text-5xl mt-2 lg:mt-4 text-outline">
					This blog is a personal project created after work hours to
					share insights and resources related to development.
				</p>
			</div>

			<div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-8">
				{/* Blog Section */}
				<section className="w-full md:w-1/2">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-outline">
							Blog
						</h2>
						{visibleBlogPosts < sortedBlogPosts.length && (
							<button
								onClick={loadMoreBlogPosts}
								className="text-outline flex items-center text-xs text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
							>
								더보기
								<PlusIcon className="w-3 h-3 ml-1 text-black font-bold" />
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{sortedBlogPosts
							.slice(0, visibleBlogPosts)
							.map((post, index) => (
								<li
									key={post.id}
									className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/30 relative"
								>
									<Link
										to={`/blog/${post.id}`}
										className="block pr-[50px] text-gray-900 font-medium hover:underline text-outline"
									>
										{post.title}
									</Link>
									<p className="text-gray-500 text-sm mt-1">
										{truncateText(post.excerpt, 30)}
									</p>
									{index === 0 && (
										<span className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs font-light px-2 py-1 rounded backdrop-blur-md shadow-md border border-white/20">
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
						<h2 className="text-xl font-semibold text-outline">
							References
						</h2>
						{visibleReferencePosts <
							sortedReferencePosts.length && (
							<button
								onClick={loadMoreReferencePosts}
								className="flex items-center text-xs text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
							>
								더보기
								<PlusIcon className="w-3 h-3 ml-1" />
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{sortedReferencePosts
							.slice(0, visibleReferencePosts)
							.map((post, index) => (
								<li
									key={post.id}
									className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/30 relative"
								>
									<Link
										to={`/reference/${post.id}`}
										className="block pr-[50px] text-gray-900 font-medium hover:underline text-outline"
									>
										{post.title}
									</Link>
									<p className="text-gray-500 text-sm mt-1">
										{truncateText(post.memo, 30)}
									</p>
									{index === 0 && (
										<span className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs font-light px-2 py-1 rounded backdrop-blur-md shadow-md border border-white/20">
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

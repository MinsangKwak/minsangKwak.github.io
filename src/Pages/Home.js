import React, { useState } from "react";
import blogPostsData from "../data/blogPosts.json";
import codePostsData from "../data/codePosts.json";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
	const [visibleBlogPosts, setVisibleBlogPosts] = useState(3);
	const [visibleReferencePosts, setVisibleReferencePosts] = useState(3);

	const loadMoreBlogPosts = () => setVisibleBlogPosts((prev) => prev + 3);
	const loadMoreReferencePosts = () =>
		setVisibleReferencePosts((prev) => prev + 3);

	const sortedBlogPosts = [...blogPostsData].sort((a, b) => b.id - a.id);
	const sortedReferencePosts = [...codePostsData].sort((a, b) => b.id - a.id);

	return (
		<main className="flex flex-col items-center min-h-screen">
			<div className="w-full max-w-5xl mb-16 font-light mt-6 lg:mt-12">
				<p className="text-3xl lg:text-5xl text-outline">Welcome!</p>
				<p className="text-3xl lg:text-5xl mt-2 lg:mt-4 text-outline">
					This blog is a personal side project
				</p>
				<p className="text-3xl lg:text-5xl mt-2 lg:mt-4 text-outline">
					where I share development insights and resources.
				</p>
			</div>

			<div className="w-full max-w-5xl flex flex-col md:flex-row gap-y-8 md:gap-x-8">
				{/* Blog Section */}
				<section className="w-full md:w-1/3">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-outline">
							Blog
						</h2>
						{visibleBlogPosts < sortedBlogPosts.length && (
							<button
								onClick={loadMoreBlogPosts}
								className="text-outline flex items-center text-xs text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/20 hover:bg-white/30 shadow-md"
							>
								View
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
									<p className="text-gray-500 text-sm mt-1 line-clamp">
										{post.excerpt}
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
				<section className="w-full md:w-1/3 mt-8 md:mt-0">
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
								View
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
									<p className="text-gray-500 text-sm mt-1 line-clamp">
										{post.memo}
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

				{/* Update Section */}
				<section className="w-full md:w-1/3 mt-8 md:mt-0">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-outline">
							Update soon...
						</h2>
					</div>
					<ul className="space-y-3">
						<li
							className="bg-white/20 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/30 relative"
						>
							<span className="block pr-[50px] text-gray-900 font-medium hover:underline text-outline">
								패치노트 게시판
							</span>
							<p className="text-gray-500 text-sm mt-1 line-clamp">
								업데이트 내역을 기록하는 패치노트 게시판이 생성될 예정입니다.
							</p>
							<span className="absolute top-2 right-2 bg-blue-500/80 text-white text-xs font-light px-2 py-1 rounded backdrop-blur-md shadow-md border border-white/20">
								2024.12
							</span>
						</li>
					</ul>
				</section>
			</div>
		</main>
	);
};

export default Home;

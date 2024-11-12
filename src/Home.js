// src/Home.js
import React, { useState } from "react";
import blogPostsData from "./data/blogPosts.json";
import codePostsData from "./data/codePosts.json";
import { Link } from "react-router-dom";
import ConvexGeometryComponent from "./ConvexGeometry";

const Home = () => {
	const [visibleBlogPosts, setVisibleBlogPosts] = useState(3);
	const [visibleReferencePosts, setVisibleReferencePosts] = useState(3);

	const loadMoreBlogPosts = () => {
		setVisibleBlogPosts((prev) => prev + 3);
	};

	const loadMoreReferencePosts = () => {
		setVisibleReferencePosts((prev) => prev + 3);
	};

	const truncateText = (text, maxLength) => {
		return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
	};

	return (
		<main className="flex flex-col items-center min-h-screen bg-gray-100">
			<div className="flex flex-col md:flex-row items-center mt-4 md:mt-16 mb-16">
				{/* Intro Text */}
				<div className="flex-1">
					<p className="text-gray-700 text-3xl lg:text-5xl font-light mt-2 lg:mt-4">
						Welcome!
					</p>
					<p className="text-gray-700 text-3xl lg:text-5xl font-light mt-2 lg:mt-4">
						This blog is a personal project created after work hours to share insights and resources related to development.
					</p>
					<p className="text-gray-700 text-3xl lg:text-5xl font-light mt-2 lg:mt-4">
						<span>Feel free to reach out with any suggestions.</span>
						<br />
						<a
							href="mailto:kmsdevwork@gmail.com"
							className="text-blue-500 hover:underline text-lg lg:text-xl font-light"
						>
							Contact via G-mail
						</a>
					</p>
				</div>



				{/* Geometric Shape Component */}
				{/* <div className="w-full md:w-1/2 flex justify-center md:justify-end">
					<ConvexGeometryComponent width={300} height={300} />
				</div> */}
			</div>

			<div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-8">
				{/* References Section */}
				<section className="w-full md:w-1/2">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold mb-4">References</h2>
						{visibleReferencePosts < codePostsData.length && (
							<button
								onClick={loadMoreReferencePosts}
								className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
							>
								Load more
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{codePostsData.slice(0, visibleReferencePosts).map((post) => (
							<li
								key={post.id}
								className="bg-white p-4 rounded shadow-sm"
							>
								<Link
									to={`/post/${post.id}`}
									className="block text-gray-900 font-medium hover:underline"
								>
									{post.title}
								</Link>
								<p className="text-gray-500 text-sm mt-1">
									{truncateText(post.memo, 30)}
								</p>
							</li>
						))}
					</ul>
				</section>

				{/* Blog Section */}
				<section className="w-full mt-8 md:mt-0 md:w-1/2">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold mb-4">Blog</h2>
						{visibleBlogPosts < blogPostsData.length && (
							<button
								onClick={loadMoreBlogPosts}
								className="text-gray-600 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
							>
								Load more
							</button>
						)}
					</div>
					<ul className="space-y-3">
						{blogPostsData.slice(0, visibleBlogPosts).map((post) => (
							<li
								key={post.id}
								className="bg-white p-4 rounded shadow-sm"
							>
								<Link
									to={`/post/${post.id}`}
									className="block text-gray-900 font-medium hover:underline"
								>
									{post.title}
								</Link>
								<p className="text-gray-500 text-sm mt-1">
									{truncateText(post.excerpt, 30)}
								</p>
							</li>
						))}
					</ul>
				</section>
			</div>
		</main>
	);
};

export default Home;

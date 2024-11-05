// src/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<main>
			<header className="bg-white shadow-md py-4 px-6 mb-6">
				<h2 className="text-2xl font-bold text-gray-800">
					Welcome to My Blog
				</h2>
			</header>
			<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<article className="bg-white p-4 rounded-lg shadow">
					<h3 className="text-xl font-semibold mb-2">Blog Post 1</h3>
					<p className="text-gray-600">
						This is a sample blog post description. It gives a brief
						overview of the content.
					</p>
					<Link
						to="/post/1"
						className="text-blue-500 hover:underline"
					>
						Read More
					</Link>
				</article>
				{/* More blog posts can be added here */}
			</section>
		</main>
	);
};

export default Home;

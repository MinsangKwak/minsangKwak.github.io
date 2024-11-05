// src/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<main className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-3xl font-bold text-gray-800 mb-4">
				Welcome to the Minsang's Posting Page
			</h2>
			<p className="text-gray-600 mb-4">
				This is a sample documentation site structured like MDN. You can
				find various tutorials, guides, and API references.
			</p>
			{/* <Link to="/post/1" className="text-blue-500 hover:underline">
				Getting Started
			</Link>
			<br />
			<Link to="/post/2" className="text-blue-500 hover:underline">
				Tutorials
			</Link>
			<br />
			<Link to="/post/3" className="text-blue-500 hover:underline">
				API Reference
			</Link>
			<br />
			<Link to="/post/4" className="text-blue-500 hover:underline">
				Guides
			</Link> */}
		</main>
	);
};

export default Home;

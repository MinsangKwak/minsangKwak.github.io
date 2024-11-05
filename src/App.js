// src/App.js
import React, { useState } from "react";

const posts = [
	{
		id: 1,
		title: "Getting Started",
		content: "This is the content for Getting Started.",
	},
	{
		id: 2,
		title: "Tutorials",
		content: "This is the content for Tutorials.",
	},
	{
		id: 3,
		title: "API Reference",
		content: "This is the content for API Reference.",
	},
	{ id: 4, title: "Guides", content: "This is the content for Guides." },
];

const App = () => {
	const [selectedPost, setSelectedPost] = useState(posts[0]);

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Left Sidebar */}
			<aside className="w-64 bg-gray-900 text-white h-screen p-4 fixed">
				<h1 className="text-2xl font-bold text-white mb-6">
					Documentation
				</h1>
				<nav>
					<ul className="space-y-4">
						{posts.map((post) => (
							<li key={post.id}>
								<button
									onClick={() => setSelectedPost(post)}
									className={`block w-full text-left py-2 px-4 rounded ${
										selectedPost.id === post.id
											? "bg-gray-700"
											: "hover:bg-gray-700"
									}`}
								>
									{post.title}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			{/* Main Content */}
			<div className="ml-64 flex-1 p-6">
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						{selectedPost.title}
					</h2>
					<p className="text-gray-600">{selectedPost.content}</p>
				</div>
			</div>
		</div>
	);
};

export default App;

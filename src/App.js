// src/App.js
import React, { useState, useEffect } from "react";
import CodePost from "./CodePost";
import Home from "./Home";
import postsData from "./data/posts.json";

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		setPosts(postsData);
	}, []);

	return (
		<div className="flex min-h-screen bg-gray-100">
			{/* Left Sidebar */}
			<aside className="w-64 bg-gray-900 text-white h-screen p-4 fixed">
				<h1 className="text-2xl font-bold text-white mb-6">
					Documentation
				</h1>
				<nav>
					<ul className="space-y-4">
						<li>
							<button
								onClick={() => setSelectedPost(null)}
								className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
							>
								Home
							</button>
						</li>
						{posts.map((post) => (
							<li key={post.id}>
								<button
									onClick={() => setSelectedPost(post)}
									className={`block w-full text-left py-2 px-4 rounded ${
										selectedPost &&
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
				{selectedPost ? <CodePost post={selectedPost} /> : <Home />}
			</div>
		</div>
	);
};

export default App;

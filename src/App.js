// src/App.js
import React, { useState, useEffect } from "react";
import CodePost from "./CodePost";
import postsData from "./data/posts.json"; // JSON 파일에서 데이터를 가져옵니다.

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// JSON 데이터를 상태로 설정합니다.
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
				{selectedPost ? (
					<CodePost post={selectedPost} />
				) : (
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							Welcome to the Documentation
						</h2>
						<p className="text-gray-600">
							Please select a topic from the sidebar to view the
							content.
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default App;

// src/PostDetail.js
import React from "react";
import { useParams, Link } from "react-router-dom";

const PostDetail = () => {
	const { id } = useParams();

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				Blog Post {id}
			</h2>
			<p className="text-gray-600 mb-4">
				This is the detail page for blog post {id}. Here you can display
				the full content of the post.
			</p>
			<Link to="/" className="text-blue-500 hover:underline">
				Back to Home
			</Link>
		</div>
	);
};

export default PostDetail;

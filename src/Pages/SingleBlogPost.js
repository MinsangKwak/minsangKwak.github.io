import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleBlogPost = ({ posts = [] }) => {
	const { postId } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		const selectedPost = posts.find((p) => p.id === parseInt(postId));
		setPost(selectedPost || null);
	}, [postId, posts]);

	return (
		<div className="flex-1 mt-16 p-6">
			{post ? (
				<div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10 text-gray-800">
					<h2 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h2>
					<h3 className="text-2xl text-gray-700 mb-4">{post.subtitle}</h3>
					<p className="leading-relaxed mb-8">{post.content}</p>
				</div>
			) : (
				<p className="text-gray-700">포스트를 찾을 수 없습니다.</p>
			)}
		</div>
	);
};

export default SingleBlogPost;

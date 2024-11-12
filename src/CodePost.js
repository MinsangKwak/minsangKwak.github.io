// src/CodePost.js
import React from "react";
import { useParams } from "react-router-dom";

const CodePost = ({ posts, isBlogView }) => {
	const { postId } = useParams();
	const post = posts.find((p) => p.id === parseInt(postId));

	if (!post) {
		return <div>해당 게시물을 찾을 수 없습니다.</div>;
	}

	// 텍스트의 줄바꿈을 <br />로 변환
	const formattedContent = post.content.split("\n\n").map((text, index) => (
		<p key={index} className="mb-4 sm:mb-6">
			{text}
		</p>
	));

	// Blog View 스타일 적용 (MDN 스타일)
	if (isBlogView) {
		return (
			<div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
				<h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
					{post.title}
				</h1>
				<h2 className="text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4">
					{post.subtitle}
				</h2>
				<div className="text-sm sm:text-base text-gray-700 leading-relaxed">
					{formattedContent}
				</div>
			</div>
		);
	}

	// References View 스타일 유지
	return (
		<div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
			<h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
				{post.title}
			</h1>
			<div className="mb-4 sm:mb-6 relative">
				<pre className="text-sm sm:text-base text-gray-700 bg-gray-100 p-3 sm:p-4 rounded-lg overflow-auto">
					{formattedContent}
				</pre>
			</div>
		</div>
	);
};

export default CodePost;

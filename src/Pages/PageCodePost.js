import React from "react";
import { useParams } from "react-router-dom";

const PageCodePost = ({ posts, isBlogView }) => {
	const { postId } = useParams();
	const post = posts.find((p) => p.id === parseInt(postId));

	if (!post) {
		return (
			<div className="text-outline">해당 게시물을 찾을 수 없습니다.</div>
		);
	}

	// 텍스트의 줄바꿈을 <br />로 변환
	const formattedContent = post.content.split("\n\n").map((text, index) => (
		<p key={index} className="mb-4 sm:mb-6">
			{text}
		</p>
	));

	return (
		<div className="max-w-3xl mx-auto sm:p-6">
			<h1 className="text-2xl sm:text-4xl font-bold text-outline mb-1 sm:mb-2">
				{post.title}
			</h1>
			{isBlogView && (
				<h2 className="text-lg sm:text-xl text-outline mb-3 sm:mb-4">
					{post.subtitle}
				</h2>
			)}
			<div
				className={`text-sm sm:text-base leading-relaxed text-outline ${
					isBlogView
						? "bg-transparent"
						: "bg-white/60 backdrop-blur-lg p-3 sm:p-4 rounded-lg overflow-y-auto border border-white/10"
				}`}
			>
				{formattedContent}
			</div>
		</div>
	);
};

export default PageCodePost;

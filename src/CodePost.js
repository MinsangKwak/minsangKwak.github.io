// src/CodePost.js
import React from "react";
import { useParams } from "react-router-dom";

const CodePost = ({ posts, isBlogView }) => {
	const { postId } = useParams();
	const post = posts.find((p) => p.id === parseInt(postId));

	if (!post) {
		return <div>해당 게시물을 찾을 수 없습니다.</div>;
	}

	// Blog View 스타일 적용 (MDN 스타일)
	if (isBlogView) {
		return (
			<div className="max-w-3xl mx-auto p-6 bg-white mt-20 shadow-md rounded-lg">
				<h1 className="text-4xl font-bold text-gray-900 mb-2">
					{post.title}
				</h1>
				<h2 className="text-2xl text-gray-600 mb-4">{post.subtitle}</h2>
				<p className="text-gray-700 leading-relaxed mb-8">
					{post.content}
				</p>

				<h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
					더 알아보기
				</h3>
				<ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
					<li>React의 Virtual DOM 개념</li>
					<li>React의 상태 관리와 Context API</li>
					<li>Hooks의 발전: useEffect와 useReducer</li>
				</ul>

				<h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
					관련 학습 항목
				</h3>
				<ul className="list-disc list-inside text-gray-700 space-y-2">
					<li>JavaScript 기본 개념</li>
					<li>ES6 및 최신 JavaScript 기능</li>
					<li>React 컴포넌트와 JSX의 이해</li>
				</ul>
			</div>
		);
	}

	// References View 스타일 유지 (메모 및 Live Preview 포함)
	return (
		<div className="max-w-3xl mx-auto p-6 bg-white mt-20 shadow-md rounded-lg">
			<h1 className="text-4xl font-bold text-gray-900 mb-6">
				{post.title}
			</h1>

			{/* 메모 섹션 */}
			<div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow-inner text-gray-800">
				<p className="text-lg font-medium mb-2">메모:</p>
				<p className="leading-relaxed">{post.memo}</p>
			</div>

			{/* 본문 내용 */}
			<div className="mb-6 relative">
				<pre className="text-gray-700 bg-gray-100 p-4 rounded-lg overflow-auto">
					{post.content}
				</pre>
			</div>

			{/* Live Preview 섹션 */}
			<div className="mb-4 border-t pt-4">
				<h3 className="text-xl font-semibold mb-2">Live Preview</h3>
				<iframe
					title="Live Preview"
					srcDoc={post.content}
					className="w-full h-96 border rounded"
				></iframe>
			</div>
		</div>
	);
};

export default CodePost;

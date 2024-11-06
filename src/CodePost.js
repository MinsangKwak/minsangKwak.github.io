// src/CodePost.js
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodePost = ({ post }) => {
	// 코드 복사 함수
	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(post.content)
			.then(() => alert("코드가 복사되었습니다!"))
			.catch((error) => alert("복사에 실패했습니다."));
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			{/* Component Title */}
			<h1 className="text-3xl font-bold text-gray-900 mb-6">
				{post.title}
			</h1>

			{/* Component Explanation */}
			<div
				className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded shadow-inner text-gray-800"
				style={{ maxHeight: "200px", overflow: "hidden" }}
			>
				<p className="text-lg font-medium mb-2">메모:</p>
				<p className="leading-relaxed">{post.memo}</p>
			</div>

			{/* Code Example Section */}
			<div className="mb-6 relative">
				<SyntaxHighlighter language="html" style={github}>
					{post.content}
				</SyntaxHighlighter>
				{/* Copy Button */}
				<button
					onClick={copyToClipboard}
					className="absolute top-2 right-2 px-3 py-1 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-500 focus:outline-none"
				>
					코드 복사
				</button>
			</div>

			{/* Code Preview */}
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

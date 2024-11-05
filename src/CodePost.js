// src/CodePost.js
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodePost = ({ post }) => {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-gray-800 mb-4">
				{post.title}
			</h2>

			{/* Code Editor */}
			<div className="mb-6">
				<SyntaxHighlighter language="html" style={github}>
					{post.content}
				</SyntaxHighlighter>
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

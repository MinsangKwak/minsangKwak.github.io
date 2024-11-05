// src/App.js
import React, { useState } from "react";
import CodePost from "./CodePost";

const posts = [
	{
		id: 1,
		title: "Semantic HTML & CSS Guide",
		content: `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* 시맨틱 태그 스타일 */
        /* 스타일 정의 */
    </style>
</head>
<body>
    <header><h1>사이트 헤더</h1></header>
    <nav>여기는 내비게이션입니다.</nav>
    <main>
        <section>메인 섹션</section>
        <article>기사 내용</article>
        <aside>사이드바</aside>
        <figure><img src="https://placehold.co/600x400" alt="예시 이미지"></figure>
    </main>
    <footer>저작권 &copy; 2024.</footer>
</body>
</html>`,
	},
	{
		id: 2,
		title: "Accordion with Right Arrow",
		content: `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>오른쪽 화살표 아코디언 예제</title>
    <style>
        details { margin: 10px 0; }
        summary { font-weight: bold; cursor: pointer; padding-right: 20px; position: relative; }
        summary::after { content: "▶"; position: absolute; right: 0; transition: transform 0.3s ease; }
        details[open] summary::after { transform: rotate(90deg); }
        .content { padding: 10px; background-color: #f9f9f9; }
    </style>
</head>
<body>
    <h2>오른쪽 화살표 아코디언 예제</h2>
    <details>
        <summary>섹션 1</summary>
        <div class="content"><p>이것은 섹션 1의 내용입니다.</p></div>
    </details>
    <details>
        <summary>섹션 2</summary>
        <div class="content"><p>이것은 섹션 2의 내용입니다.</p></div>
    </details>
    <details>
        <summary>섹션 3</summary>
        <div class="content"><p>이것은 섹션 3의 내용입니다.</p></div>
    </details>
</body>
</html>`,
	},
];

const App = () => {
	const [selectedPost, setSelectedPost] = useState(null);

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

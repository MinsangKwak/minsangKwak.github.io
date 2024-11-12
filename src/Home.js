// src/Home.js
import React from "react";
import blogPostsData from "./data/blogPosts.json";
import codePostsData from "./data/codePosts.json";
import { Link } from "react-router-dom";
import ConvexGeometryComponent from "./ConvexGeometry";

const Home = () => {
	const recentBlogPosts = blogPostsData.slice(0, 3);
	const recentReferencePosts = codePostsData.slice(0, 3);

	const truncateText = (text, maxLength) => {
		return text.length > maxLength
			? `${text.slice(0, maxLength)}...`
			: text;
	};

	return (
		<main className="flex flex-col items-center min-h-screen bg-gray-100">
			<ConvexGeometryComponent />

			<p className="text-gray-700 mt-4 text-center max-w-md">
				안녕하세요! <br />
				퇴근 후 틈틈이 만들어 보고 있는 블로그 사이트입니다. <br />
				현재 게시된 포스트는 Reference와 Blog로, 이외에도 개발 관련
				정보를 써 볼 예정입니다. <br />
				<br />
				아직 많은 기능이 있지는 않지만 추가 되었으면 하는 기능이 있다면
				아래 메일로 편하게 연락주세요 :) <br />
				<br />
				<a
					href="mailto:kmsdevwork@gmail.com"
					className="text-blue-500 hover:underline"
				>
					[G-mail]
				</a>
			</p>

			<section className="mt-8 w-full max-w-lg">
				<h2 className="text-xl font-semibold mb-4">References</h2>
				<ul className="space-y-3">
					{recentReferencePosts.map((post) => (
						<li
							key={post.id}
							className="bg-white p-4 rounded shadow-sm"
						>
							<Link
								to={`/post/${post.id}`}
								className="block text-gray-900 font-medium hover:underline"
							>
								{post.title}
							</Link>
							<p className="text-gray-500 text-sm mt-1">
								{truncateText(post.memo, 30)}
							</p>
						</li>
					))}
				</ul>
			</section>

			<section className="mt-8 w-full max-w-lg">
				<h2 className="text-xl font-semibold mb-4">Blog</h2>
				<ul className="space-y-3">
					{recentBlogPosts.map((post) => (
						<li
							key={post.id}
							className="bg-white p-4 rounded shadow-sm"
						>
							<Link
								to={`/post/${post.id}`}
								className="block text-gray-900 font-medium hover:underline"
							>
								{post.title}
							</Link>
							<p className="text-gray-500 text-sm mt-1">
								{truncateText(post.excerpt, 30)}
							</p>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
};

export default Home;
